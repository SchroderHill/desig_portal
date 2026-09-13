"""Live, read-only-source smoke checks; derived tiles stay in the OS temp cache."""
import base64
import gzip
import json
from pathlib import Path
import sys
import time

sys.path.insert(0, str(Path(__file__).resolve().parents[1]/'server'))
from slope_service import SlopeService, rasterio, np, from_bounds

service = SlopeService()
started = time.perf_counter()
last = [0]
def progress(message):
    if time.perf_counter()-last[0] > 5:
        print(message, flush=True)
        last[0] = time.perf_counter()

service.initialise(progress)
print(f'Indexed {len(service.sources)} sources in {time.perf_counter()-started:.1f}s', flush=True)
results = []
for name, x, y in [('Rams Head', 173.741, -41.655), ('Terraces', 173.447, -41.648),
                   ('Kenningtons', 173.832, -41.400), ('Auckland', 174.761, -36.877)]:
    area = dict(west=x-.0005, east=x+.0005, south=y-.0005, north=y+.0005)
    result = service.prepare(area, [], [area], progress=progress)
    valid = steep = 0
    for entry in result['tiles']:
        data = json.loads(gzip.decompress((service.cache/entry['url'].rsplit('/', 1)[-1]).read_bytes()))
        valid += data['metadata']['validCells']
        steep += data['metadata']['steepCells']
    row = dict(place=name, tiles=len(result['tiles']), validCells=valid, steepCells=steep,
               seconds=result['seconds'], sheets=sorted({Path(s['url']).stem for t in result['tiles'] for s in service.sources_for_tile(t['column'], t['row'])}))
    if name == 'Rams Head':
        reference = Path('D:/1A Documents/Forest/M&R_Ramshead/layers/Clipped_Slope.tif')
        if reference.exists():
            common = mismatches = 0
            with rasterio.open(reference) as ref:
                for entry in result['tiles']:
                    data = json.loads(gzip.decompress((service.cache/entry['url'].rsplit('/', 1)[-1]).read_bytes()))
                    m = data['metadata']
                    raw = np.frombuffer(base64.b64decode(data['classes']), dtype='uint8')
                    cells = ((raw[:, None] >> np.array([0, 2, 4, 6])) & 3).reshape(512, 512)
                    win = from_bounds(m['left'], m['top']-512, m['left']+512, m['top'], ref.transform).round_offsets().round_lengths()
                    slopes = ref.read(1, window=win, boundless=True, masked=True).astype('float64').filled(np.nan)
                    mask = (cells != 0) & np.isfinite(slopes)
                    common += int(mask.sum())
                    mismatches += int((mask & ((cells == 2) != (slopes > 35))).sum())
            row.update(referenceCommonCells=common, referenceClassDifferences=mismatches)
    results.append(row)
    print(json.dumps(row), flush=True)
Path('national-slope-validation.json').write_text(json.dumps(results, indent=2)+'\n')
