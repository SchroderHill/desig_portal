"""Read-only comparison of streamed LINZ tiles with an existing slope reference."""
import argparse
import base64
import gzip
import json
import tempfile
from slope_service import *

parser = argparse.ArgumentParser()
parser.add_argument('--reference', required=True)
args = parser.parse_args()
service = SlopeService(cache=tempfile.mkdtemp(prefix='kenningtons-validation-'))
bounds = dict(west=173.828, south=-41.403, east=173.836, north=-41.397)
cold = service.prepare(bounds, [])
warm = service.prepare(bounds, [])
valid_count = disagreement = 0
comparisons = []
with rasterio.open(args.reference) as ref:
    assert ref.crs.to_epsg() == 2193 and ref.res == (1, 1)
    for entry in cold['tiles']:
        tile = json.loads(gzip.decompress(service.tile_path(entry['column'], entry['row']).read_bytes()))
        m = tile['metadata']
        raw = np.frombuffer(base64.b64decode(tile['classes']), dtype='uint8')
        classes = ((raw[:, None] >> np.array([0, 2, 4, 6])) & 3).ravel().reshape(512, 512)
        window = from_bounds(m['left'], m['top']-512, m['left']+512, m['top'], ref.transform).round_offsets().round_lengths()
        slopes = ref.read(1, window=window, boundless=True, masked=True).astype('float64').filled(np.nan)
        valid = (classes != 0) & np.isfinite(slopes)
        mismatch = valid & ((classes == 2) != (slopes > 35))
        valid_count += int(valid.sum())
        disagreement += int(mismatch.sum())
        comparisons.append(dict(column=entry['column'], row=entry['row'], valid=int(valid.sum()), differing=int(mismatch.sum()),
            differingReferenceDegrees=slopes[mismatch].tolist()))
print(json.dumps(dict(reference=args.reference, source=cold['source'], coldSeconds=cold['seconds'], warmSeconds=warm['seconds'],
    tileCount=len(cold['tiles']), payloadBytes=cold['downloadBytes'], validCells=valid_count, differingCells=disagreement,
    agreementPercent=100*(1-disagreement/valid_count) if valid_count else None, tiles=comparisons), indent=2))
