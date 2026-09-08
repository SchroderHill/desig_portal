"""Package an approved degree-slope raster without resampling or simplification."""
import argparse, hashlib, json, os, gzip
from pathlib import Path
import pyproj
os.environ['PROJ_DATA'] = pyproj.datadir.get_data_dir()
os.environ['PROJ_LIB'] = pyproj.datadir.get_data_dir()
import numpy as np
import rasterio
from rasterio.features import shapes, rasterize

parser = argparse.ArgumentParser()
parser.add_argument('source')
parser.add_argument('output')
args = parser.parse_args()
out = Path(args.output)
out.mkdir(parents=True, exist_ok=True)
with rasterio.open(args.source) as ds:
    assert ds.crs.to_epsg() == 2193 and ds.res == (1, 1), 'Expected NZTM 1 m slope raster'
    slope = ds.read(1, masked=True)
    valid = ~np.ma.getmaskarray(slope) & np.isfinite(slope.data)
    assert np.all((slope.data[valid] >= 0) & (slope.data[valid] <= 90)), 'Expected degrees'
    classes = np.where(valid, np.where(slope.data > 35, 2, 1), 0).astype('uint8')
    flat = classes.ravel()
    padded = np.pad(flat, (0, (-len(flat)) % 4)).reshape(-1, 4)
    packed = np.sum(padded.astype('uint16') << np.array([0, 2, 4, 6]), axis=1).astype('uint8')
    (out/'classes.bin').write_bytes(packed.tobytes())
    unpacked = ((packed[:, None] >> np.array([0, 2, 4, 6])) & 3).ravel()[:len(flat)]
    assert np.array_equal(flat, unpacked)
    geometries = [geom for geom, value in shapes(classes, mask=classes == 2, transform=ds.transform) if value == 2]
    roundtrip = rasterize(((g, 1) for g in geometries), out_shape=classes.shape, transform=ds.transform)
    assert np.array_equal(roundtrip == 1, classes == 2), 'Overlay must match every steep pixel'
    transform = pyproj.Transformer.from_crs(2193, 4326, always_xy=True)
    features = []
    for geom in geometries:
        rings = [[[round(v, 9) for v in transform.transform(*point)] for point in ring] for ring in geom['coordinates']]
        xs = [p[0] for ring in rings for p in ring]; ys = [p[1] for ring in rings for p in ring]
        features.append(dict(type='Feature', bbox=[min(xs), min(ys), max(xs), max(ys)], properties={}, geometry=dict(type='Polygon', coordinates=rings)))
    geojson = json.dumps(dict(type='FeatureCollection', features=features), separators=(',', ':')).encode()
    (out/'steep.geojson.gz').write_bytes(gzip.compress(geojson, mtime=0))
    metadata = dict(version=1, name='Terraces LiDAR slope', thresholdDegrees=35, cellSizeMetres=1,
        width=ds.width, height=ds.height, left=ds.bounds.left, top=ds.bounds.top,
        crs='EPSG:2193', bounds=list(transform.transform_bounds(*ds.bounds)),
        classes='classes.bin', polygons='steep.geojson.gz', sourceName=Path(args.source).name,
        sourceSha256=hashlib.sha256(Path(args.source).read_bytes()).hexdigest(),
        validCells=int(valid.sum()), steepCells=int((classes == 2).sum()),
        classesSha256=hashlib.sha256(packed.tobytes()).hexdigest(),
        attribution='LINZ LiDAR-derived slope; local Terraces reference. 1 m grid, not survey-certified.')
    (out/'manifest.json').write_text(json.dumps(metadata, indent=2))
    print(json.dumps(dict(cells=len(flat), valid=metadata['validCells'], steep=metadata['steepCells'], polygons=len(features), pixelAgreement='100%'), indent=2))
