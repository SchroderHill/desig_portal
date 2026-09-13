import {afterEach, expect, it, vi} from 'vitest';
import {initialiseSteepSlope} from '../src/steep-slope-controller.js';
const {cards} = vi.hoisted(() => ({cards: vi.fn()}));
vi.mock('../src/road-slope-cards.js', () => ({createRoadSlopePopups:()=>cards}));
afterEach(() => vi.useRealTimers());

it('retains unchanged road measurements on view failure, but invalidates edited roads', async () => {
  vi.useFakeTimers();
  const handlers={}, sources=new Map(), layers=new Map();
  let toggle, fail=false;
  const roads=[{id:'r',geometry:{type:'LineString',coordinates:[[173.73,-41.65],[173.731,-41.65]]}}];
  const map={isStyleLoaded:()=>true,getBounds:()=>({getWest:()=>173.73,getEast:()=>173.74,getSouth:()=>-41.66,getNorth:()=>-41.65}),
    getSource:id=>sources.get(id),getLayer:id=>layers.get(id),addSource:id=>sources.set(id,{setData:vi.fn()}),
    addLayer:l=>layers.set(l.id,l),on:(e,h)=>handlers[e]=h,once:vi.fn()};
  initialiseSteepSlope({map,draw:{getAll:()=>({features:roads})},getAnalysisAreas:()=>[{west:173.7,east:173.8,south:-41.7,north:-41.6}],
    buttonElement:{addEventListener:(_,h)=>toggle=h,setAttribute:vi.fn()},
    loadSlope:async()=>{if(fail)throw Error('network failed');return {analyse:()=>({features:[],sourceName:'LINZ',roadSummaries:[{roadId:'r',steepLengthMetres:50}]})};}});
  toggle();await vi.advanceTimersByTimeAsync(500);
  const measured=cards.mock.lastCall[0].analysis;
  expect(measured.roadSummaries[0].steepLengthMetres).toBe(50);
  fail=true;handlers.movestart();handlers.moveend();await vi.advanceTimersByTimeAsync(500);
  expect(cards.mock.lastCall[0].analysis).toBe(measured);
  expect(cards.mock.lastCall[0].error).toBe(false);
  handlers['draw.update']();await vi.advanceTimersByTimeAsync(500);
  expect(cards.mock.lastCall[0].analysis).toBeNull();
  expect(cards.mock.lastCall[0].error).toBe(true);
});
