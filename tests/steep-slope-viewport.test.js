import { afterEach, expect, it, vi } from "vitest";
import { initialiseSteepSlope } from "../src/steep-slope-controller.js";
vi.mock("../src/terrain-rgb.js", () => ({
  MapboxTerrainRgbProvider: class {
    async sampleLine(points) { return points.map(([x]) => x * 111320); }
  },
}));
afterEach(() => vi.useRealTimers());

it("shows slope before drawing, retains it during drawing, measures roads and clears on toggle off", async () => {
  vi.useFakeTimers();
  const handlers = new Map();
  const sources = new Map();
  const layers = new Map();
  let roads = [];
  let click;
  const resultElement = {};
  const map = {
    isStyleLoaded: () => true,
    getBounds: () => ({getWest: () => 0, getEast: () => 0.002, getSouth: () => 0, getNorth: () => 0.002}),
    getSource: id => sources.get(id), getLayer: id => layers.get(id),
    addSource: id => sources.set(id, { setData: vi.fn() }),
    addLayer: layer => layers.set(layer.id, layer),
    on: (event, handler) => handlers.set(event, handler), once: vi.fn(),
  };
  initialiseSteepSlope({map, draw: {getAll: () => ({features: roads})}, accessToken: "test",
    loadSlope: async () => ({analyse: ({roads = []}) => ({features: [{type: 'Feature'}], sourceName: 'Test LiDAR', totalRoadLengthMetres: roads.length * 100, steepRoadLengthMetres: roads.length * 100, unknownLengthMetres: 0})}),
    resultElement, buttonElement: {addEventListener: (_, handler) => {click = handler;}, setAttribute: vi.fn()},
  });
  click();
  await vi.advanceTimersByTimeAsync(500);
  const source = sources.get("steep-slope-35");
  expect(source.setData.mock.lastCall[0].features.length).toBeGreaterThan(0);
  expect(resultElement.textContent).toContain("1 m reference grid");
  handlers.get("draw.modechange")({mode: "draw_line_string"});
  expect(source.setData.mock.lastCall[0].features.length).toBeGreaterThan(0);
  roads = [{id: "r", geometry: {type: "LineString", coordinates: [[0,0],[0.001,0]]}}];
  handlers.get("draw.create")();
  handlers.get("draw.modechange")({mode: "simple_select"});
  await vi.advanceTimersByTimeAsync(500);
  expect(resultElement.textContent).toContain("Roads:");
  expect(resultElement.textContent).toContain("100 m above 35");
  handlers.get("movestart")();
  handlers.get("moveend")();
  await vi.advanceTimersByTimeAsync(500);
  expect(resultElement.textContent).toContain("Roads:");
  click();
  expect(source.setData.mock.lastCall[0].features).toEqual([]);
  expect(resultElement.hidden).toBe(true);
});
