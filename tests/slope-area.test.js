import {afterEach, expect, it, vi} from 'vitest';
import {initialiseSteepSlope} from '../src/steep-slope-controller.js';
afterEach(() => vi.useRealTimers());

it('requires an explicit area, freezes it across pans, and invalidates it on GeoPDF changes', async () => {
  vi.useFakeTimers();
  const handlers = new Map(), sources = new Map(), layers = new Map();
  let x = 173.83, pdfs = [];
  let select, toggle;
  const load = vi.fn(async () => ({analyse: () => ({features:[],sourceName:'test'})}));
  const areaElement = {}, statusElement = {dataset:{}};
  const map = {
    isStyleLoaded:()=>true, getBounds:()=>({getWest:()=>x,getEast:()=>x+.001,getSouth:()=>-41.4,getNorth:()=>-41.399}),
    getSource:id=>sources.get(id),getLayer:id=>layers.get(id),
    addSource:id=>sources.set(id,{setData:vi.fn()}),addLayer:l=>layers.set(l.id,l),
    on:(e,h)=>handlers.set(e,h), once:vi.fn(),
  };
  initialiseSteepSlope({map,draw:{getAll:()=>({features:[]})},loadSlope:load,
    getAnalysisAreas:()=>pdfs,areaElement,statusElement,
    buttonElement:{addEventListener:(_,h)=>toggle=h,setAttribute:vi.fn()},
    areaButton:{addEventListener:(_,h)=>select=h},
  });
  toggle(); await vi.advanceTimersByTimeAsync(500);
  expect(load).not.toHaveBeenCalled();
  expect(statusElement.textContent).toContain('select Use this view');
  select(); await vi.advanceTimersByTimeAsync(500);
  const fixed = load.mock.lastCall[0].areas;
  x = 174; handlers.get('moveend')(); await vi.advanceTimersByTimeAsync(500);
  expect(load.mock.lastCall[0].areas).toEqual(fixed);
  expect(load.mock.lastCall[0].bounds.west).toBe(174);
  pdfs = [{west:173.84,east:173.85,south:-41.4,north:-41.39}];
  handlers.get('slope.area.change')(); await vi.advanceTimersByTimeAsync(500);
  expect(load.mock.lastCall[0].areas).toEqual(pdfs);
  expect(areaElement.textContent).toContain('1 loaded GeoPDF');
  load.mockClear(); pdfs=[];
  handlers.get('slope.area.change')(); await vi.advanceTimersByTimeAsync(500);
  expect(load).not.toHaveBeenCalled();
});
