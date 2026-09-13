import base64
import gzip
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import numpy as np
from slope_service import SlopeService, NZ_TO_WGS, GRID_TOP, TILE_SIZE, request_tiles, rasterio, from_origin
from linz_catalogue import load_catalogue, trusted_url, COLLECTION_URL


class NationalSlopeTests(unittest.TestCase):
    def test_bundled_index_avoids_fetching_unchanged_items(self):
        index = json.loads(Path(__file__).with_name('linz-dem-index.json').read_text())
        entry = index[0]
        collection = {'links': [{'rel': 'item', 'href': entry['itemUrl'], 'file:checksum': entry['itemChecksum']}]}
        with tempfile.TemporaryDirectory() as folder, patch('linz_catalogue.get_json', return_value=collection) as fetch:
            self.assertEqual(load_catalogue(folder), [entry])
            fetch.assert_called_once_with(COLLECTION_URL)

    def test_catalogue_discovers_unrelated_sheets_and_reuses_checked_metadata(self):
        links = [{'rel': 'item', 'href': f'./{name}.json', 'file:checksum': name} for name in ['BR28', 'AS21']]
        def response(url):
            if url == COLLECTION_URL:
                return {'links': links}
            name = Path(url).stem
            return {'id': name, 'bbox': [170, -45, 175, -35],
                    'assets': {'visual': {'href': f'./{name}.tiff', 'file:checksum': name}}}
        with tempfile.TemporaryDirectory() as folder, patch('linz_catalogue.get_json', side_effect=response) as fetch:
            first = load_catalogue(folder)
            self.assertEqual([s['id'] for s in first], ['AS21', 'BR28'])
            self.assertEqual(fetch.call_count, 3)
            self.assertEqual(load_catalogue(folder), first)
            self.assertEqual(fetch.call_count, 4)  # Only collection is rechecked.
            links[0]['file:checksum'] = 'updated'
            load_catalogue(folder)
            self.assertEqual(fetch.call_count, 6)

    def test_catalogue_failures_are_not_reported_as_missing_elevation(self):
        with tempfile.TemporaryDirectory() as folder, patch('linz_catalogue.get_json', side_effect=RuntimeError('offline')):
            with self.assertRaisesRegex(RuntimeError, 'offline'):
                load_catalogue(folder)
        for href in ['https://example.com/dem.tiff', 'http://127.0.0.1/dem.tiff', '../../../../private.tiff']:
            with self.assertRaises(ValueError):
                trusted_url(COLLECTION_URL, href)

    def test_mosaics_sheet_halos_before_slope_and_preserves_missing_data(self):
        c, r = 3260, 8950
        left, top = c*TILE_SIZE, GRID_TOP-r*TILE_SIZE
        with tempfile.TemporaryDirectory() as folder:
            service = SlopeService(folder)
            service.source = {'fingerprint': 'b'*20, 'name': 'Synthetic national mosaic'}
            # A 45-degree eastward plane split exactly at a sheet boundary.
            for i, offset in enumerate([-1, 256]):
                path = Path(folder)/f'sheet{i}.tif'
                data = np.broadcast_to(np.arange(257, dtype='float32')+offset, (514, 257)).copy()
                with rasterio.open(path, 'w', driver='GTiff', width=257, height=514, count=1,
                                   dtype='float32', crs='EPSG:2193', transform=from_origin(left+offset, top+1, 1, 1), nodata=-9999) as ds:
                    ds.write(data, 1)
                service.sources.append({'url': str(path), 'bounds': NZ_TO_WGS.transform_bounds(left+offset, top-513, left+offset+257, top+1)})
            service.tile(c, r)
            def classes():
                data = json.loads(gzip.decompress(service.tile_path(c, r).read_bytes()))
                raw = np.frombuffer(base64.b64decode(data['classes']), dtype='uint8')
                return ((raw[:, None] >> np.array([0, 2, 4, 6])) & 3).reshape(512, 512)
            self.assertTrue(np.all(classes() == 2))
            # Without the adjacent sheet, its cells AND missing-neighbour seam are unknown.
            service.source['fingerprint'] = 'c'*20
            service.sources.pop()
            service.tile(c, r)
            self.assertTrue(np.all(classes()[:, :255] == 2))
            self.assertTrue(np.all(classes()[:, 255:] == 0))

    def test_ramshead_extent_is_not_limited_to_24_tiles(self):
        b = dict(west=173.72, east=173.76, south=-41.67, north=-41.64)
        self.assertGreater(len(request_tiles(b, [], [b])), 24)

    def test_disjoint_extents_do_not_request_gap(self):
        a = dict(west=173.73, east=173.731, south=-41.65, north=-41.649)
        b = dict(west=173.78, east=173.781, south=-41.65, north=-41.649)
        view = dict(west=173.72, east=173.79, south=-41.66, north=-41.64)
        self.assertEqual(set(request_tiles(view, [], [a, b])),
                         set(request_tiles(a, [], [a])) | set(request_tiles(b, [], [b])))

    def test_uncovered_location_stays_empty_and_cancelled_work_stops(self):
        with tempfile.TemporaryDirectory() as folder:
            s = SlopeService(folder)
            s.source = {'name': 'test'}
            b = dict(west=173.73, east=173.731, south=-41.65, north=-41.649)
            self.assertEqual(s.prepare(b, [], [b])['tiles'], [])
            s.sources = [{'bounds': [166, -48, 180, -33]}]
            with self.assertRaisesRegex(ValueError, 'superseded'):
                s.prepare(b, [], [b], cancelled=lambda: True)
