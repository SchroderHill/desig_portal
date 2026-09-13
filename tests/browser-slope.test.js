import {describe,it,expect} from 'vitest';
import {classify,maskTile} from '../src/browser-slope-core.js';
import {BrowserSlopeGrid} from '../src/browser-slope-loader.js';
describe('browser slope calculation',()=>{
  it('classifies flat and steep planes and preserves missing neighbours',()=>{
    expect(classify(new Float64Array(9).fill(3),1)[0]).toBe(1);
    expect(classify(Float64Array.from([0,1,2,0,1,2,0,1,2]),1)[0]).toBe(2);
    expect(classify(Float64Array.from([0,1,2,0,NaN,2,0,1,2]),1)[0]).toBe(0);
  });
  it('masks each new map without mutating cached classes',()=>{
    const raw=new Uint8Array([170]);
    const masked=maskTile(raw,0,2,[[[0,2],[1,2],[1,0],[0,0]]],2);
    expect(masked[0]).toBe(34);expect(raw[0]).toBe(170);
  });
  it('keeps unfinished neighbouring cells unknown',()=>{
    const grid=new BrowserSlopeGrid();
    grid.add({column:1,row:2,bytes:new Uint8Array(65536).fill(170)});
    expect(grid.cell(512,1024)).toBe(2);
    expect(grid.cell(511,1024)).toBe(0);
    expect(grid.analyse({}).partial).toBe(true);
  });
});
