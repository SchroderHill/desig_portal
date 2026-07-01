import { describe, expect, it } from "vitest";
import { analyseRoadEarthworks, densifyRoad, distanceMetres } from "../src/road-earthworks-model.js";

const elevenMetreRoad = [[0, 0], [0.0001, 0]];

describe("road cut/fill model", () => {
  it("never leaves terrain sample gaps larger than the requested spacing", () => {
    const samples = densifyRoad(elevenMetreRoad, 5);

    expect(samples).toHaveLength(4);
    for (let index = 0; index < samples.length - 1; index += 1) {
      expect(distanceMetres(samples[index].coordinate, samples[index + 1].coordinate)).toBeLessThanOrEqual(5);
    }
  });

  it("preserves every drawn road vertex", () => {
    const coordinates = [[0, 0], [0.00005, 0], [0.0001, 0.00002]];
    const samples = densifyRoad(coordinates, 5);

    coordinates.forEach((coordinate) => {
      expect(samples.some((sample) => sample.coordinate[0] === coordinate[0] && sample.coordinate[1] === coordinate[1])).toBe(true);
    });
  });

  it("shows a ridge above a straight formation as cut without changing the formation endpoints", async () => {
    const analysis = await analyseRoadEarthworks({
      id: "road-1",
      coordinates: elevenMetreRoad,
      spacingMetres: 5,
      terrainProvider: terrain([100, 104, 104, 100]),
    });

    expect(analysis.features.map((feature) => feature.properties.earthwork)).toContain("cut");
    expect(analysis.features.map((feature) => feature.properties.earthwork)).not.toContain("fill");
    expect(analysis.maximumCutDepth).toBeGreaterThan(0);
  });

  it("shows a hollow below a straight formation as fill", async () => {
    const analysis = await analyseRoadEarthworks({
      id: "road-2",
      coordinates: elevenMetreRoad,
      spacingMetres: 5,
      terrainProvider: terrain([100, 96, 96, 100]),
    });

    expect(analysis.features.map((feature) => feature.properties.earthwork)).toContain("fill");
    expect(analysis.features.map((feature) => feature.properties.earthwork)).not.toContain("cut");
    expect(analysis.maximumFillDepth).toBeGreaterThan(0);
  });

  it("treats differences within half a metre as balanced", async () => {
    const analysis = await analyseRoadEarthworks({
      id: "road-3",
      coordinates: elevenMetreRoad,
      spacingMetres: 5,
      balanceToleranceMetres: 0.5,
      terrainProvider: terrain([100, 100.4, 99.6, 100]),
    });

    expect(analysis.features.every((feature) => feature.properties.earthwork === "balanced")).toBe(true);
  });
});

function terrain(elevations) {
  return {
    async sampleLine(coordinates) {
      expect(coordinates).toHaveLength(elevations.length);
      return elevations;
    },
  };
}
