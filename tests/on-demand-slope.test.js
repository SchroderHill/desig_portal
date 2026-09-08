import { expect, it } from 'vitest';
import { LidarTileGrid, createOnDemandSlopeLoader } from '../src/on-demand-slope.js';
import { LidarSlopeGrid } from '../src/lidar-slope.js';

it('crosses tile seams without gaps and keeps missing tiles unknown', () => {
  const tile = value => new LidarSlopeGrid({version:1, thresholdDegrees:35, cellSizeMetres:1, width:2, height:2, left:0, top:2}, new Uint8Array([value]));
  const grid = new LidarTileGrid({tileSize:2, gridTop:2, source:{name:'test'}, tiles:[{}, {}]},
    [{column:0,row:0,grid:tile(85)}, {column:1,row:0,grid:tile(170)}]);
  grid.project = p => p.map(v => v*100000);
  expect([0,1,2,3,4].map(c => grid.cell(c,0))).toEqual([1,1,2,2,0]);
  const road = {id:'road',geometry:{coordinates:[[0, .000015],[.00006,.000015]]}};
  const result = grid.measureRoad(road);
  expect(result.steepLengthMetres/result.roadLengthMetres).toBeCloseTo(1/3,8);
  expect(result.unknownLengthMetres/result.roadLengthMetres).toBeCloseTo(1/3,8);
});

it('reports service errors and supports retry rather than retaining failed state', async () => {
  let calls=0;
  const load = createOnDemandSlopeLoader({fetchImpl:async () => { calls++; return {ok:false,json:async()=>({error:'Zoom in'})}; }});
  await expect(load({bounds:{}})).rejects.toThrow('Zoom in');
  await expect(load({bounds:{}})).rejects.toThrow('Zoom in');
  expect(calls).toBe(2);
});
