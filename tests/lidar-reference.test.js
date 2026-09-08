import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { LidarSlopeGrid, createLidarSlopeLoader } from '../src/lidar-slope.js';
const metadata = JSON.parse(readFileSync('data/slope/terraces/manifest.json'));
const grid = new LidarSlopeGrid(metadata, readFileSync('data/slope/terraces/classes.bin'));
const roads = JSON.parse(readFileSync('tests/fixtures/lidar-roads.json'));

it.each(roads)('matches independent 5 cm raster sampling on $id within 0.5 m', road => {
  const result = grid.measureRoad(road);
  expect(Math.abs(result.steepLengthMetres - road.expectedSteepMetres)).toBeLessThan(.5);
  expect(Math.abs(result.unknownLengthMetres - road.expectedUnknownMetres)).toBeLessThan(.5);
  expect(Math.abs(result.roadLengthMetres - road.expectedTotalMetres)).toBeLessThan(.01);
});

it('loads the actual compressed overlay and classified grid together', async () => {
  const load = createLidarSlopeLoader({baseUrl: 'data/slope/terraces/', fetchImpl: async path => new Response(readFileSync(path))});
  const loaded = await load();
  expect(loaded.polygons.features.length).toBe(47554);
  expect(await load()).toBe(loaded);
  expect(loaded.measureRoad(roads[0])).toEqual(grid.measureRoad(roads[0]));
});
