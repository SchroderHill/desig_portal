import {expect, it, vi} from 'vitest';
import {enableMiddleDragPan} from '../src/middle-drag-pan.js';

function canvasFixture() {
  const listeners = new Map();
  return {
    style:{}, setPointerCapture:vi.fn(), releasePointerCapture:vi.fn(), hasPointerCapture:()=>true,
    addEventListener(type, handler, capture) {
      const entries = listeners.get(type) ?? [];
      capture ? entries.unshift(handler) : entries.push(handler);
      listeners.set(type, entries);
    },
    emit(type, values) {
      let stopped = false;
      const event = {...values, preventDefault:vi.fn(), stopImmediatePropagation:()=>{stopped=true;}};
      for (const handler of listeners.get(type) ?? []) {
        handler(event);
        if (stopped) break;
      }
      return event;
    },
  };
}

it('pans with the middle button while drawing without placing vertices', () => {
  const canvas = canvasFixture();
  const panBy = vi.fn();
  const map = {getCanvas:()=>canvas, panBy, stop:vi.fn()};
  const draw = {getMode:()=> 'draw_line_string'};
  const downstream = vi.fn(), windowRef = {addEventListener:vi.fn()};
  canvas.addEventListener('pointerdown', downstream);
  enableMiddleDragPan({map, draw, windowRef});

  canvas.emit('pointerdown',{button:1,pointerId:7,clientX:100,clientY:80});
  canvas.emit('pointermove',{buttons:4,pointerId:7,clientX:115,clientY:70});
  canvas.emit('pointerup',{button:1,pointerId:7,clientX:115,clientY:70});

  expect(downstream).not.toHaveBeenCalled();
  expect(map.stop).toHaveBeenCalled();
  expect(panBy).toHaveBeenCalledWith([-15,10],{animate:false});
  expect(canvas.style.cursor).toBe('');
});

it('leaves middle-button events alone outside drawing mode', () => {
  const canvas = canvasFixture();
  const panBy = vi.fn();
  const downstream = vi.fn();
  canvas.addEventListener('pointerdown', downstream);
  enableMiddleDragPan({map:{getCanvas:()=>canvas,panBy},draw:{getMode:()=> 'simple_select'},windowRef:{addEventListener:vi.fn()}});
  canvas.emit('pointerdown',{button:1,pointerId:2,clientX:0,clientY:0});
  canvas.emit('pointermove',{buttons:4,pointerId:2,clientX:20,clientY:20});
  expect(downstream).toHaveBeenCalledOnce();
  expect(panBy).not.toHaveBeenCalled();
});
