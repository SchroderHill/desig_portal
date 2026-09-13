import { expect, it } from 'vitest';
import { LidarSlopeGrid, createLidarSlopeLoader } from '../src/lidar-slope.js';

const meta = { version: 1, thresholdDegrees: 35, cellSizeMetres: 1, width: 4, height: 1, left: 0, top: 1 };
const road = (a, b, id = 'a') => ({ id, geometry: { coordinates: [[a / 100000, .5 / 100000], [b / 100000, .5 / 100000]] } });
const grid = () => new LidarSlopeGrid(meta, new Uint8Array([1 | (2 << 2) | (0 << 4) | (2 << 6)]), {features: []}, p => p.map(v => v * 100000));

it('splits road lengths exactly at class boundaries and retains unknown sections', () => {
  const result = grid().measureRoad(road(0, 4));
  expect(result.steepLengthMetres / result.roadLengthMetres).toBeCloseTo(.5, 8);
  expect(result.unknownLengthMetres / result.roadLengthMetres).toBeCloseTo(.25, 8);
});
it('handles partial cells, reversed roads, and zero-length geometry', () => {
  const g = grid();
  expect(g.measureRoad(road(.5, 1.5)).steepLengthMetres / g.measureRoad(road(.5, 1.5)).roadLengthMetres).toBeCloseTo(.5, 8);
  expect(g.measureRoad(road(4, 0)).steepLengthMetres).toBeCloseTo(g.measureRoad(road(0, 4)).steepLengthMetres, 8);
  expect(g.measureRoad(road(1, 1)).roadLengthMetres).toBe(0);
});
it('never interprets outside coverage as flat', () => {
  const r = grid().measureRoad(road(5, 8));
  expect(r.steepLengthMetres).toBe(0);
  expect(r.unknownLengthMetres).toBeCloseTo(r.roadLengthMetres, 8);
});
it('is invariant to other roads and viewport bounds', () => {
  const g = grid(); const a = road(0, 4);
  expect(g.analyse({roads: [a]}).roadSummaries[0]).toEqual(g.analyse({roads: [a, road(8, 12, 'b')], bounds: {west: 1,east: 2,south: 1,north: 2}}).roadSummaries[0]);
});
it('rejects incomplete datasets and allows retry after loading errors', async () => {
  expect(() => new LidarSlopeGrid(meta, new Uint8Array())).toThrow();
  let count = 0;
  const load = createLidarSlopeLoader({fetchImpl: async () => { count++; return {ok: false, status: 404}; }});
  await expect(load()).rejects.toThrow('404');
  await expect(load()).rejects.toThrow('404');
  expect(count).toBe(2);
});
