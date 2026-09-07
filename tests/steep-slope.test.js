import { describe, expect, it } from "vitest";
import { analyseSteepSlope, slopeDegreesFromElevations } from "../src/steep-slope-model.js";

const road = {
  id: "road-1",
  geometry: {
    type: "LineString",
    coordinates: [[0, 0], [0.001, 0]],
  },
};

describe("steep terrain model", () => {
  it("calculates slope in degrees from perpendicular elevation samples", () => {
    expect(slopeDegreesFromElevations({
      west: 0,
      east: 20,
      south: 10,
      north: 10,
      sampleSpacingMetres: 20,
    })).toBeCloseTo(45, 6);
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
