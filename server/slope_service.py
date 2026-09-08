"""Desktop-only on-demand slope trial. Reads public LINZ COG windows at native 1 m."""
import base64
import gzip
import hashlib
import json
import math
import os
from pathlib import Path
import tempfile
import threading
import time
from urllib.parse import urljoin

import pyproj
os.environ['PROJ_DATA'] = pyproj.datadir.get_data_dir()
os.environ['PROJ_LIB'] = pyproj.datadir.get_data_dir()
import numpy as np
import rasterio
from rasterio.features import shapes, rasterize
from shapely.geometry import box, LineString, mapping
from shapely.ops import transform, unary_union
from rasterio.transform import from_origin
from rasterio.windows import from_bounds
import requests

ITEM_URL = 'https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ28.json'
SOURCE_URL = urljoin(ITEM_URL, 'BQ28.tiff')
TILE_SIZE = 512
GRID_TOP = 10000000
MAX_TILES = 24
ALGORITHM = 'horn-1m-strict35-halo1-v1'
TEST_BOUNDS = [173.82226724941518, -41.41296319860633, 173.84229746701732, -41.387016612079236]
WGS_TO_NZ = pyproj.Transformer.from_crs(4326, 2193, always_xy=True)
NZ_TO_WGS = pyproj.Transformer.from_crs(2193, 4326, always_xy=True)


def classify_horn(dem):
    """Input includes a one-cell halo. NoData in any 3x3 neighbour stays unknown."""
    z = np.asarray(dem, dtype=np.float64)
    if z.ndim != 2 or min(z.shape) < 3:
        raise ValueError('A DEM with a one-cell halo is required')
    gx = (z[:-2, 2:] + 2*z[1:-1, 2:] + z[2:, 2:] - z[:-2, :-2] - 2*z[1:-1, :-2] - z[2:, :-2])/8
    gy = (z[2:, :-2] + 2*z[2:, 1:-1] + z[2:, 2:] - z[:-2, :-2] - 2*z[:-2, 1:-1] - z[:-2, 2:])/8
    slope = np.degrees(np.arctan(np.hypot(gx, gy)))
    valid = np.ones(slope.shape, dtype=bool)
    for row in range(3):
        for col in range(3):
            valid &= np.isfinite(z[row:row+slope.shape[0], col:col+slope.shape[1]])
    return np.where(valid, np.where(slope > 35, 2, 1), 0).astype('uint8'), np.where(valid, slope, np.nan)


def pack(classes):
    flat = classes.ravel()
    padded = np.pad(flat, (0, (-len(flat)) % 4)).reshape(-1, 4)
    return np.sum(padded.astype('uint16') << np.array([0, 2, 4, 6]), axis=1).astype('uint8').tobytes()


def polygons_for(classes, left, top):
    features = []
    for geometry, _ in shapes(classes, mask=classes == 2, transform=from_origin(left, top, 1, 1)):
        rings = []
        for ring in geometry['coordinates']:
            x, y = zip(*ring)
            lng, lat = NZ_TO_WGS.transform(x, y)
            rings.append([[round(a, 9), round(b, 9)] for a, b in zip(lng, lat)])
        points = [p for ring in rings for p in ring]
        features.append(dict(type='Feature', properties={},
            bbox=[min(p[0] for p in points), min(p[1] for p in points), max(p[0] for p in points), max(p[1] for p in points)],
            geometry=dict(type='Polygon', coordinates=rings)))
    return dict(type='FeatureCollection', features=features)


def validate_bounds(bounds):
    try:
        west, south, east, north = [float(bounds[k]) for k in ('west', 'south', 'east', 'north')]
    except (KeyError, TypeError, ValueError):
        raise ValueError('A valid map bounding box is required')
    if not all(math.isfinite(v) for v in (west, south, east, north)) or not (166 <= west < east <= 180 and -48 <= south < north <= -33):
        raise ValueError('This trial accepts New Zealand map bounds only')
    return west, south, east, north


def analysis_geometry(areas):
    if not isinstance(areas, list) or not 1 <= len(areas) <= 20:
        raise ValueError('Load a GeoPDF or select an analysis area first')
    return unary_union([transform(WGS_TO_NZ.transform, box(*validate_bounds(area))) for area in areas])


def request_tiles(bounds, roads, areas=None):
    # The viewport never defines permission to expand an explicitly selected area.
    west, south, east, north = validate_bounds(bounds)
    scope = analysis_geometry(areas if areas is not None else [bounds])
    view = transform(WGS_TO_NZ.transform, box(west, south, east, north))
    keys = set()

    def add_geometry(geometry):
        if geometry.is_empty: return
        if hasattr(geometry, 'geoms'):
            for part in geometry.geoms: add_geometry(part)
            return
        left, bottom, right, top = geometry.bounds
        c0, c1 = math.floor(left/TILE_SIZE), math.floor(right/TILE_SIZE)
        r0, r1 = math.floor((GRID_TOP-top)/TILE_SIZE), math.floor((GRID_TOP-bottom)/TILE_SIZE)
        if (c1-c0+1)*(r1-r0+1) > 10000:
            raise ValueError('Zoom in: analysis request is too large')
        for c in range(c0, c1+1):
            for r in range(r0, r1+1):
                x, y = c*TILE_SIZE, GRID_TOP-r*TILE_SIZE
                if geometry.intersects(box(x, y-TILE_SIZE, x+TILE_SIZE, y)):
                    keys.add((c, r))
                    if len(keys) > MAX_TILES:
                        raise ValueError('Zoom in or use fewer roads: maximum 24 native 1 m tiles per request')

    add_geometry(view.intersection(scope))
    if not isinstance(roads, list) or len(roads) > 100:
        raise ValueError('Too many roads in this trial')
    total_length = 0
    for road in roads:
        if not isinstance(road, dict) or not isinstance(road.get('geometry'), dict):
            raise ValueError('Invalid road geometry')
        coords = road.get('geometry', {}).get('coordinates', [])
        if not isinstance(coords, list):
            raise ValueError('Invalid road coordinates')
        if len(coords) > 10000:
            raise ValueError('Road has too many vertices')
        projected = []
        for point in coords:
            if not isinstance(point, list) or len(point) < 2 or not all(isinstance(v, (float, int)) and math.isfinite(v) for v in point[:2]) or not (166 <= point[0] <= 180 and -48 <= point[1] <= -33):
                raise ValueError('Invalid road coordinates')
            projected.append(WGS_TO_NZ.transform(*point[:2]))
        for a, b in zip(projected, projected[1:]):
            length = math.dist(a, b)
            total_length += length
            if total_length > 100000:
                raise ValueError('Trial road length limit is 100 km')
            if length:
                add_geometry(LineString([a, b]).intersection(scope))
    return sorted(keys)


class SlopeService:
    def __init__(self, cache=None):
        self.cache = Path(cache or Path(tempfile.gettempdir())/'design-portal-slope-cache')
        self.cache.mkdir(parents=True, exist_ok=True)
        self.source = None
        self.lock = threading.Lock()

    def initialise(self):
        if self.source is not None:
            return
        response = requests.get(ITEM_URL, timeout=25)
        response.raise_for_status()
        item = response.json()
        asset = item['assets']['visual']
        if urljoin(ITEM_URL, asset['href']) != SOURCE_URL:
            raise ValueError('Unexpected LINZ source asset; update the reviewed trial configuration')
        fingerprint = hashlib.sha256((asset['file:checksum']+ALGORITHM).encode()).hexdigest()[:20]
        self.source = dict(id='BQ28', name='LINZ BQ28 LiDAR slope (on demand)', fingerprint=fingerprint,
            bounds=item['bbox'], itemUrl=ITEM_URL, sourceUrl=SOURCE_URL,
            sourceChecksum=asset['file:checksum'], updated=asset.get('updated'),
            attribution='Source: Toitu Te Whenua LINZ, New Zealand LiDAR 1m DEM, CC BY 4.0. Slope derived locally using Horn 3x3.')

    def tile_path(self, column, row):
        return self.cache / f'{self.source["fingerprint"]}-{column}-{row}.json.gz'

    def tile(self, column, row):
        path = self.tile_path(column, row)
        if path.exists():
            return dict(column=column, row=row, url=f'/api/slope/tiles/{path.name}', cached=True, bytes=path.stat().st_size)
        start = time.perf_counter()
        left, top = column*TILE_SIZE, GRID_TOP-row*TILE_SIZE
        # Require native aligned 1 m cells. A halo avoids seams at our cache-tile edges.
        with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN='EMPTY_DIR', CPL_VSIL_CURL_ALLOWED_EXTENSIONS='.tiff',
                GDAL_HTTP_TIMEOUT=20, GDAL_HTTP_CONNECTTIMEOUT=5, GDAL_HTTP_MAX_RETRY=1, GDAL_HTTP_RETRY_DELAY=1):
            with rasterio.open(SOURCE_URL) as ds:
                if ds.crs.to_epsg() != 2193 or ds.res != (1, 1) or abs(ds.transform.c-round(ds.transform.c)) > 1e-6 or abs(ds.transform.f-round(ds.transform.f)) > 1e-6:
                    raise ValueError('LINZ source is not an aligned NZTM 1 m DEM')
                window = from_bounds(left-1, top-TILE_SIZE-1, left+TILE_SIZE+1, top+1, ds.transform).round_offsets().round_lengths()
                dem = ds.read(1, window=window, boundless=True, masked=True).astype('float64').filled(np.nan)
        classes, _ = classify_horn(dem)
        if classes.shape != (TILE_SIZE, TILE_SIZE):
            raise ValueError('Incomplete DEM window')
        metadata = dict(version=1, name=self.source['name'], thresholdDegrees=35, cellSizeMetres=1,
            width=TILE_SIZE, height=TILE_SIZE, left=left, top=top, crs='EPSG:2193',
            bounds=list(NZ_TO_WGS.transform_bounds(left, top-TILE_SIZE, left+TILE_SIZE, top)),
            validCells=int((classes != 0).sum()), steepCells=int((classes == 2).sum()))
        tile = dict(metadata=metadata, classes=base64.b64encode(pack(classes)).decode(),
            polygons=polygons_for(classes, left, top), source=self.source)
        content = gzip.compress(json.dumps(tile, separators=(',', ':')).encode(), compresslevel=6, mtime=0)
        temporary = path.with_suffix('.tmp')
        temporary.write_bytes(content)
        temporary.replace(path)
        return dict(column=column, row=row, url=f'/api/slope/tiles/{path.name}', cached=False, bytes=len(content), seconds=round(time.perf_counter()-start, 3))

    def scoped_tile(self, entry, scope, scope_id):
        c, r = entry['column'], entry['row']
        fingerprint = hashlib.sha256((self.source['fingerprint']+scope_id).encode()).hexdigest()[:20]
        path = self.cache/f'{fingerprint}-{c}-{r}.json.gz'
        if not path.exists():
            tile = json.loads(gzip.decompress(self.tile_path(c, r).read_bytes()))
            m = tile['metadata']
            raw = np.frombuffer(base64.b64decode(tile['classes']), dtype='uint8')
            classes = ((raw[:, None] >> np.array([0, 2, 4, 6])) & 3).astype('uint8').ravel().reshape(TILE_SIZE, TILE_SIZE)
            mask = rasterize([(mapping(scope), 1)], out_shape=classes.shape,
                transform=from_origin(m['left'], m['top'], 1, 1), dtype='uint8')
            classes[mask == 0] = 0
            tile['classes'] = base64.b64encode(pack(classes)).decode()
            tile['polygons'] = polygons_for(classes, m['left'], m['top'])
            m['validCells'], m['steepCells'] = int((classes != 0).sum()), int((classes == 2).sum())
            temporary = path.with_suffix('.tmp')
            temporary.write_bytes(gzip.compress(json.dumps(tile, separators=(',', ':')).encode(), mtime=0))
            temporary.replace(path)
        return dict(entry, url=f'/api/slope/tiles/{path.name}', bytes=path.stat().st_size)

    def prepare(self, bounds, roads, areas=None):
        areas = areas if areas is not None else [bounds]
        scope = analysis_geometry(areas)
        scope_id = json.dumps(areas, sort_keys=True, separators=(',', ':'))
        keys = request_tiles(bounds, roads, areas)
        start = time.perf_counter()
        with self.lock:
            self.initialise()
            sb = self.source['bounds']
            tiles = []
            for c, r in keys:
                left, top = c*TILE_SIZE, GRID_TOP-r*TILE_SIZE
                b = NZ_TO_WGS.transform_bounds(left, top-TILE_SIZE, left+TILE_SIZE, top)
                if b[0] > sb[2] or b[2] < sb[0] or b[1] > sb[3] or b[3] < sb[1]:
                    continue
                tiles.append(self.scoped_tile(self.tile(c, r), scope, scope_id))
        return dict(tiles=tiles, source=self.source, tileSize=TILE_SIZE, gridTop=GRID_TOP,
            seconds=round(time.perf_counter()-start, 3), cacheHits=sum(t['cached'] for t in tiles),
            downloadBytes=sum(t['bytes'] for t in tiles), requestedTiles=len(keys))
