import { expect, it } from "vitest";
import { roadSlopeStats, roadMidpoint, createRoadSlopePopups } from "../src/road-slope-cards.js";

it("associates metres with road IDs, preserving road names after deletion or reordering", () => {
  const roads = [{ id: "b", properties: { name: "Road 2" } }, { id: "a", properties: { name: "Road 1" } }];
  const analysis = { roadSummaries: [
    {roadId: "a", roadLengthMetres: 1000, steepLengthMetres: 100},
    {roadId: "b", roadLengthMetres: 2000, steepLengthMetres: 500},
  ] };
  expect(roadSlopeStats(roads, analysis)).toEqual([
    {id: "b", name: "Road 2", steepMetres: 500, totalMetres: 2000, percentage: "25.0"},
    {id: "a", name: "Road 1", steepMetres: 100, totalMetres: 1000, percentage: "10.0"},
  ]);
  expect(roadSlopeStats(roads.slice(0, 1), analysis)[0].name).toBe("Road 2");
});

it("anchors halfway along the road, rather than halfway through its vertices", () => {
  const point = roadMidpoint([[0,0], [0.001,0], [0.01,0]]);
  expect(point[0]).toBeCloseTo(0.005, 6);
  expect(point[1]).toBe(0);
});

it("creates one anchored popup per road and removes obsolete popups", () => {
  const instances = [];
  class Popup {
    constructor() { instances.push(this); }
    on(event, callback) { this.close = callback; return this; }
    isOpen() { return this.removed === false; }
    setLngLat(value) { this.position = value; return this; }
    setDOMContent(value) { this.content = value; return this; }
    addTo() { this.removed = false; return this; }
    remove() { this.removed = true; this.close?.(); }
  }
  const documentRef = {createElement: () => ({dataset: {}, append(...children) {this.children = children;}})};
  const render = createRoadSlopePopups({PopupClass: Popup, map: {getContainer: () => ({ownerDocument: documentRef})}});
  const roads = ["a", "b"].map((id, index) => ({id, properties: {name: `Road ${index+1}`}, geometry: {coordinates: [[0, index], [0.01, index]]}}));
  render({roads, active: true});
  expect(instances).toHaveLength(2);
  expect(instances[0].position[0]).toBeCloseTo(0.005);
  expect(instances[1].content.children[0].textContent).toBe("Road 2");
  instances[0].remove();
  render({roads, active: true, analysis: {roadSummaries: [{roadId: "a", roadLengthMetres: 200, steepLengthMetres: 100}]}});
  expect(instances).toHaveLength(2);
  render.reopen(["a"]);
  expect(instances).toHaveLength(3);
  expect(instances[2].content.children[1].textContent).toBe("100 m >35°");
  expect(instances[2].content.children[2].textContent).toBe("Total length = 200 m");
  render({roads: roads.slice(1), active: true});
  expect(instances[0].removed).toBe(true);
  expect(instances[1].removed).toBe(false);
  render({roads: roads.slice(1), active: false});
  expect(instances[1].removed).toBe(true);
  render({roads: roads.slice(1), active: true});
  expect(instances).toHaveLength(4);
  expect(instances[3].removed).toBe(false);
});

it("distinguishes a flat road from an unmeasured road and reports long distances in metres", () => {
  const roads = [{id: "flat"}, {id: "pending"}, {id: "long"}];
  const stats = roadSlopeStats(roads, {roadSummaries: [
    {roadId: "flat", roadLengthMetres: 50, steepLengthMetres: 0},
    {roadId: "long", roadLengthMetres: 3000, steepLengthMetres: 1500.4},
  ]});
  expect(stats[0].steepMetres).toBe(0);
  expect(stats[1].steepMetres).toBeNull();
  expect(stats[2].steepMetres).toBe(1500);
});

it('preserves unknown coverage independently of measured steep metres', () => {
  const stats = roadSlopeStats([{id: 'outside'}], {sourceName: 'LiDAR', roadSummaries: [
    {roadId: 'outside', roadLengthMetres: 100, steepLengthMetres: 0, unknownLengthMetres: 100},
  ]});
  expect(stats[0].unknownMetres).toBe(100);
  expect(stats[0].sourceName).toBe('LiDAR');
});
