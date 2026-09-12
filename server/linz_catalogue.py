"""Discover the national LINZ 1 m DEM mosaic from its published STAC collection."""
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests

COLLECTION_URL = 'https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/collection.json'


def trusted_url(base, href):
    url = urljoin(base, href)
    parsed = urlparse(url)
    if parsed.scheme != 'https' or parsed.netloc not in (
        'nz-elevation.s3-ap-southeast-2.amazonaws.com',
        'nz-elevation.s3.ap-southeast-2.amazonaws.com',
    ) or not parsed.path.startswith('/new-zealand/new-zealand/dem_1m/2193/'):
        raise ValueError('Unexpected LINZ catalogue location')
    return url


def get_json(url):
    for attempt in range(3):
        try:
            response = requests.get(url, timeout=(10, 30))
            response.raise_for_status()
            return response.json()
        except requests.RequestException:
            if attempt == 2:
                raise
            time.sleep(0.5 * (attempt+1))


def load_catalogue(cache, progress=lambda message: None):
    # Recheck collection on restart; unchanged item metadata is reusable by checksum.
    progress('Checking the LINZ national elevation catalogue…')
    collection = get_json(COLLECTION_URL)
    links = [link for link in collection['links'] if link['rel'] == 'item']
    if not links:
        raise ValueError('LINZ elevation catalogue has no DEM items')
    folder = Path(cache)/'catalogue'
    folder.mkdir(exist_ok=True)
    seed_path = Path(__file__).with_name('linz-dem-index.json')
    seed = json.loads(seed_path.read_text()) if seed_path.exists() else []
    indexed = {(entry['itemUrl'], entry['itemChecksum']): entry for entry in seed}

    def item(link):
        url = trusted_url(COLLECTION_URL, link['href'])
        checksum = link.get('file:checksum')
        if checksum and (url, checksum) in indexed:
            source = dict(indexed[url, checksum])
            source['url'] = trusted_url(url, source['url'])
            return source
        key = hashlib.sha256((url + str(checksum)).encode()).hexdigest()
        path = folder/f'{key}.json'
        if checksum and path.exists():
            data = json.loads(path.read_text())
        else:
            data = get_json(url)
            temporary = path.with_suffix('.tmp')
            temporary.write_text(json.dumps(data))
            temporary.replace(path)
        asset = data['assets']['visual']
        return dict(id=data['id'], bounds=data['bbox'], itemUrl=url, itemChecksum=checksum,
                    url=trusted_url(url, asset['href']), checksum=asset['file:checksum'])

    # Metadata only: no elevation pixels are read until tile selection below.
    sources = []
    with ThreadPoolExecutor(max_workers=8) as executor:
        for source in executor.map(item, links):
            sources.append(source)
            progress(f'Indexing LINZ elevation sources: {len(sources)} / {len(links)}…')
    return sorted(sources, key=lambda source: source['id'])
