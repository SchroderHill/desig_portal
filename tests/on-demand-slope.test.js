import { expect, it } from 'vitest';
import { LidarTileGrid, createOnDemandSlopeLoader } from '../src/on-demand-slope.js';
import { LidarSlopeGrid } from '../src/lidar-slope.js';
import { gzipSync } from 'node:zlib';

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

it('loads a prepared national tile and reports loading progress', async () => {
  const progress = [];
  const tile = {metadata:{version:1,thresholdDegrees:35,cellSizeMetres:1,width:2,height:2,left:0,top:2},
    classes:Buffer.from([170]).toString('base64'),polygons:{features:[]}};
  const result = {tileSize:2,gridTop:2,source:{name:'LINZ LiDAR slope'},tiles:[{column:0,row:0,url:'/tile'}]};
  const load = createOnDemandSlopeLoader({fetchImpl:async url => {
    if (url === '/tile') return new Response(gzipSync(JSON.stringify(tile)));
    return {ok:true,json:async()=>url.endsWith('prepare')?{job:'j'}:{state:'ready',result}};
  }});
  const grid = await load({onProgress:message=>progress.push(message)});
  expect(grid.cell(0,0)).toBe(2);
  expect(grid.cell(2,0)).toBe(0);
  expect(progress[0]).toContain('1 / 1');
});

it('cancels server work when an in-flight view is superseded', async () => {
  const controller = new AbortController();
  const urls = [];
  const load = createOnDemandSlopeLoader({pollMs:0,fetchImpl:async url=>{
    urls.push(url);
    return {ok:true,json:async()=>url.endsWith('prepare')?{job:'j'}:{state:'preparing',message:'Indexing'}};
  }});
  await expect(load({signal:controller.signal,onProgress:()=>controller.abort()})).rejects.toThrow();
  expect(urls).toContain('/api/slope/cancel/j');
});

it('does not mistake an empty national result for flat terrain', () => {
  const grid = new LidarTileGrid({tileSize:512,gridTop:10000000,source:{name:'LINZ'},tiles:[]}, []);
  expect(grid.cell(3260,8950)).toBe(0);
  expect(grid.analyse({}).outsideCoverage).toBe(true);
});
