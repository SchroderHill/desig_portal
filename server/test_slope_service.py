import tempfile
import unittest
import numpy as np
from slope_service import classify_horn, pack, request_tiles, TILE_SIZE, SlopeService, analysis_geometry, box
import base64
import gzip
import json


class SlopeTests(unittest.TestCase):
    def test_plane_and_threshold(self):
        x, y = np.meshgrid(np.arange(10), np.arange(10))
        for degrees in (0, 34.9, 35.1, 45):
            classes, slope = classify_horn(x*np.tan(np.radians(degrees)))
            np.testing.assert_allclose(slope, degrees, atol=1e-10)
            self.assertTrue(np.all(classes == (2 if degrees > 35 else 1)))

    def test_diagonal_and_nodata(self):
        x, y = np.meshgrid(np.arange(10), np.arange(10))
        z = (x+y).astype(float)
        classes, slope = classify_horn(z)
        np.testing.assert_allclose(slope, np.degrees(np.arctan(np.sqrt(2))))
        z[4, 4] = np.nan
        classes, _ = classify_horn(z)
        self.assertEqual(int((classes == 0).sum()), 9)

    def test_halo_prevents_tile_seams(self):
        rng = np.random.default_rng(4)
        z = rng.normal(size=(20, 20))
        full, _ = classify_horn(z)
        a, _ = classify_horn(z[:, :11])
        b, _ = classify_horn(z[:, 9:])
        np.testing.assert_array_equal(full, np.concatenate((a, b), axis=1))

    def test_pack_roundtrip(self):
        classes = np.array([[0, 1, 2, 2, 1]], dtype='uint8')
        raw = np.frombuffer(pack(classes), dtype='uint8')
        unpacked = ((raw[:, None] >> np.array([0, 2, 4, 6])) & 3).ravel()[:classes.size]
        np.testing.assert_array_equal(classes.ravel(), unpacked)

    def test_bounds_and_limits(self):
        bounds = dict(west=173.831, east=173.833, south=-41.402, north=-41.400)
        keys = request_tiles(bounds, [])
        self.assertGreater(len(keys), 0)
        with self.assertRaises(ValueError): request_tiles(dict(west=166, east=179, south=-47, north=-34), [])
        with self.assertRaises(ValueError): request_tiles(dict(west=float('nan'), east=179, south=-47, north=-34), [])
        with self.assertRaises(ValueError): request_tiles(bounds, [{'geometry': {'coordinates': [[0, 0], [1, 1]]}}])

    def test_area_limits_pan_and_whole_road(self):
        area = dict(west=173.831, east=173.833, south=-41.402, north=-41.400)
        outside = dict(west=174, east=174.001, south=-41.402, north=-41.400)
        self.assertEqual(request_tiles(outside, [], [area]), [])
        huge_view = dict(west=166, east=179, south=-47, north=-34)
        self.assertEqual(request_tiles(huge_view, [], [area]), request_tiles(area, [], [area]))
        road = {'geometry': {'coordinates': [[173.8311,-41.401],[173.8329,-41.401]]}}
        self.assertTrue(set(request_tiles(outside, [road], [area])).issubset(set(request_tiles(area, [road], [area]))))
        distant_road = {'geometry': {'coordinates': [[174,-41.401],[174.001,-41.401]]}}
        self.assertEqual(request_tiles(outside, [distant_road], [area]), [])
        with self.assertRaises(ValueError): analysis_geometry([])

    def test_scoped_tile_masks_grid_and_polygons_without_changing_cached_source(self):
        with tempfile.TemporaryDirectory() as folder:
            service = SlopeService(folder)
            service.source = {'fingerprint':'a'*20}
            tile = {'metadata':{'left':0,'top':512}, 'classes':base64.b64encode(pack(np.full((512,512),2,dtype='uint8'))).decode()}
            raw = gzip.compress(json.dumps(tile).encode())
            service.tile_path(0,0).write_bytes(raw)
            entry = {'column':0,'row':0,'cached':True}
            result = service.scoped_tile(entry,box(0,0,256,512),'half')
            data = json.loads(gzip.decompress((service.cache/result['url'].rsplit('/',1)[-1]).read_bytes()))
            packed = np.frombuffer(base64.b64decode(data['classes']),dtype='uint8')
            cells = ((packed[:,None] >> np.array([0,2,4,6])) & 3).reshape(512,512)
            self.assertTrue(np.all(cells[:,:256] == 2))
            self.assertTrue(np.all(cells[:,256:] == 0))
            self.assertEqual(data['metadata']['steepCells'],256*512)
            self.assertEqual(service.tile_path(0,0).read_bytes(),raw)
            self.assertNotEqual(result['url'],service.scoped_tile(entry,box(0,0,512,512),'full')['url'])


if __name__ == '__main__': unittest.main()
