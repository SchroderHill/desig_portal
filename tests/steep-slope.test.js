import { describe, expect, it } from "vitest";
import {
  analyseSteepSlope,
  isSteeperThan,
  slopeDegreesFromElevations,
} from "../src/steep-slope-model.js";

const road = {
  id: "road-1",
  geometry: {
    type: "LineString",
    coordinates: [[0, 0], [0.001, 0]],
  },
};

describe("steep terrain model", () => {
  it("maps steep terrain throughout a viewport without any roads", async () => {
    const bounds = { west: 0, south: 0, east: 0.002, north: 0.002 };
    const analysis = await analyseSteepSlope({
      roads: [], bounds, terrainProvider: terrainFromLongitude(x => x),
    });
    expect(analysis.features.length).toBeGreaterThan(100);
    const points = analysis.features.flatMap(f => f.geometry.coordinates[0]);
    expect(Math.min(...points.map(p => p[0]))).toBeLessThanOrEqual(bounds.west);
    expect(Math.max(...points.map(p => p[0]))).toBeGreaterThanOrEqual(bounds.east);
    expect(Math.min(...points.map(p => p[1]))).toBeLessThanOrEqual(bounds.south);
    expect(Math.max(...points.map(p => p[1]))).toBeGreaterThanOrEqual(bounds.north);
    expect(analysis.totalRoadLengthMetres).toBe(0);
  });

  it("limits viewport sampling and rejects invalid bounds", async () => {
    let count = 0;
    const terrainProvider = { sampleLine: async points => { count = points.length; return points.map(() => 100); } };
    const analysis = await analyseSteepSlope({
      bounds: { west: 0, south: 0, east: 0.1, north: 0.1 }, maximumCells: 500, terrainProvider,
    });
    expect(count).toBeLessThanOrEqual(2000);
    expect(analysis.cellSizeMetres).toBeGreaterThan(20);
    expect(analysis.features).toEqual([]);
    await expect(analyseSteepSlope({ bounds: {west: 1, east: 0, south: 0, north: 1}, terrainProvider })).rejects.toThrow("Invalid slope map bounds");
  });

  it("calculates slope in degrees from perpendicular elevation samples", () => {
    expect(slopeDegreesFromElevations({
      west: 0,
      east: 20,
      south: 10,
      north: 10,
      sampleSpacingMetres: 20,
    })).toBeCloseTo(45, 6);
  });

  it("treats exactly 35 degrees as the boundary, not as greater than 35 degrees", () => {
    expect(isSteeperThan(35, 35)).toBe(false);
    expect(isSteeperThan(35.0001, 35)).toBe(true);
    expect(isSteeperThan(34.9999, 35)).toBe(false);
  });

  it("returns an empty result without requesting terrain when there are no roads", async () => {
    let requestedTerrain = false;
    const analysis = await analyseSteepSlope({
      roads: [],
      terrainProvider: {
        async sampleLine() {
          requestedTerrain = true;
          return [];
        },
      },
    });

    expect(requestedTerrain).toBe(false);
    expect(analysis.features).toEqual([]);
    expect(analysis.roadSummaries).toEqual([]);
    expect(analysis.totalRoadLengthMetres).toBe(0);
  });

  it("returns no red polygons or steep road length for flat terrain", async () => {
    const analysis = await analyseSteepSlope({
      roads: [road],
      terrainProvider: terrainFromLongitude(() => 100),
      cellSizeMetres: 20,
      corridorMetres: 30,
    });

    expect(analysis.features).toHaveLength(0);
    expect(analysis.steepRoadLengthMetres).toBe(0);
    expect(analysis.totalRoadLengthMetres).toBeGreaterThan(100);
  });

  it("creates closed red-area polygons and measures road through 45 degree terrain", async () => {
    const analysis = await analyseSteepSlope({
      roads: [road],
      terrainProvider: terrainFromLongitude((xMetres) => xMetres),
      thresholdDegrees: 35,
      cellSizeMetres: 20,
      corridorMetres: 30,
    });

    expect(analysis.features.length).toBeGreaterThan(0);
    expect(analysis.features.every((feature) => feature.properties.slopeDegrees > 35)).toBe(true);
    analysis.features.forEach((feature) => {
      const ring = feature.geometry.coordinates[0];
      expect(ring[0]).toEqual(ring[ring.length - 1]);
    });
    expect(analysis.steepRoadLengthMetres).toBeCloseTo(analysis.totalRoadLengthMetres, 6);
    expect(analysis.steepAreaSquareMetres).toBeGreaterThan(0);
  });

  it("measures only the portion of a road that enters steep terrain", async () => {
    const analysis = await analyseSteepSlope({
      roads: [road],
      terrainProvider: terrainFromLongitude((xMetres) => (
        xMetres < 55 ? 0 : xMetres - 55
      )),
      thresholdDegrees: 35,
      cellSizeMetres: 10,
      corridorMetres: 20,
    });

    expect(analysis.steepRoadLengthMetres).toBeGreaterThan(0);
    expect(analysis.steepRoadLengthMetres).toBeLessThan(analysis.totalRoadLengthMetres);
  });

  it("keeps separate road summaries while reporting combined totals", async () => {
    const secondRoad = {
      id: "road-2",
      geometry: {
        type: "LineString",
        coordinates: [[0.01, 0], [0.011, 0]],
      },
    };
    const analysis = await analyseSteepSlope({
      roads: [road, secondRoad],
      terrainProvider: terrainFromLongitude((xMetres) => (xMetres < 500 ? 0 : xMetres)),
      thresholdDegrees: 35,
      cellSizeMetres: 20,
      corridorMetres: 30,
    });

    expect(analysis.roadSummaries).toHaveLength(2);
    expect(analysis.roadSummaries[0].steepLengthMetres).toBe(0);
    expect(analysis.roadSummaries[1].steepLengthMetres).toBeCloseTo(
      analysis.roadSummaries[1].roadLengthMetres,
      6,
    );
    expect(analysis.totalRoadLengthMetres).toBeCloseTo(
      analysis.roadSummaries[0].roadLengthMetres + analysis.roadSummaries[1].roadLengthMetres,
      6,
    );
  });

  it("keeps the DEM request bounded by increasing grid size for long roads", async () => {
    let requestedCoordinates = 0;
    const analysis = await analyseSteepSlope({
      roads: [{
        id: "long-road",
        geometry: { type: "LineString", coordinates: [[0, 0], [0.1, 0]] },
      }],
      terrainProvider: {
        async sampleLine(coordinates) {
          requestedCoordinates = coordinates.length;
          return coordinates.map(() => 100);
        },
      },
      cellSizeMetres: 20,
      corridorMetres: 75,
      maximumCells: 500,
    });

    expect(requestedCoordinates).toBeLessThanOrEqual(500 * 4);
    expect(analysis.cellSizeMetres).toBeGreaterThan(20);
  });
});

function terrainFromLongitude(elevationAtMetresEast) {
  return {
    async sampleLine(coordinates) {
      return coordinates.map(([longitude]) => elevationAtMetresEast(longitude * 111320));
    },
  };
}
