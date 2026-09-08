import tempfile
import unittest
import numpy as np
from slope_service import classify_horn, pack, request_tiles, TILE_SIZE, SlopeService


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


if __name__ == '__main__': unittest.main()
