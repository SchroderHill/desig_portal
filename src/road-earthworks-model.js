const EARTH_RADIUS_METRES = 6371008.8;

export function distanceMetres(a, b) {
  const lat1 = toRadians(a[1]);
  const lat2 = toRadians(b[1]);
  const deltaLat = toRadians(b[1] - a[1]);
  const deltaLng = toRadians(b[0] - a[0]);
  const haversine = Math.sin(deltaLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
  return EARTH_RADIUS_METRES * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(Math.max(0, 1 - haversine)));
}

export function roadLengthMetres(coordinates) {
  return coordinates.slice(1).reduce(
    (total, coordinate, index) => total + distanceMetres(coordinates[index], coordinate),
    0,
  );
}

export function densifyRoad(coordinates, maximumSpacingMetres = 5) {
  if (!Array.isArray(coordinates) || coordinates.length < 2) return [];
  const spacing = Math.max(1, Number(maximumSpacingMetres) || 5);
  const samples = [];
  let distanceAlong = 0;

  for (let segmentIndex = 0; segmentIndex < coordinates.length - 1; segmentIndex += 1) {
    const start = coordinates[segmentIndex];
    const end = coordinates[segmentIndex + 1];
    const segmentLength = distanceMetres(start, end);
    const intervalCount = Math.max(1, Math.ceil(segmentLength / spacing));

    for (let interval = 0; interval <= intervalCount; interval += 1) {
      if (segmentIndex > 0 && interval === 0) continue;
      const ratio = interval / intervalCount;
      samples.push({
        coordinate: [
          start[0] + ((end[0] - start[0]) * ratio),
          start[1] + ((end[1] - start[1]) * ratio),
        ],
        segmentIndex,
        ratio,
        distanceAlong: distanceAlong + (segmentLength * ratio),
        vertexIndex: interval === 0
          ? segmentIndex
          : interval === intervalCount ? segmentIndex + 1 : null,
      });
    }

    distanceAlong += segmentLength;
  }

  return samples;
}

export async function analyseRoadEarthworks({
  id,
  coordinates,
  terrainProvider,
  spacingMetres = 5,
  balanceToleranceMetres = 0.5,
  maximumSamples = 5000,
}) {
  const length = roadLengthMetres(coordinates);
  const effectiveSpacing = Math.max(spacingMetres, length / Math.max(2, maximumSamples));
  const samples = densifyRoad(coordinates, effectiveSpacing);
  if (samples.length < 2) return emptyAnalysis(id);

  const elevations = await terrainProvider.sampleLine(samples.map((sample) => sample.coordinate));
  if (elevations.length !== samples.length || elevations.some((elevation) => !Number.isFinite(elevation))) {
    throw new Error("Terrain sampling returned incomplete road elevations.");
  }

  const vertexElevations = new Map();
  samples.forEach((sample, index) => {
    if (sample.vertexIndex !== null) vertexElevations.set(sample.vertexIndex, elevations[index]);
  });

  const formationElevations = samples.map((sample) => {
    const startElevation = vertexElevations.get(sample.segmentIndex);
    const endElevation = vertexElevations.get(sample.segmentIndex + 1);
    return startElevation + ((endElevation - startElevation) * sample.ratio);
  });

  const features = [];
  let maximumCutDepth = 0;
  let maximumFillDepth = 0;

  for (let index = 0; index < samples.length - 1; index += 1) {
    const start = samples[index];
    const end = samples[index + 1];
    if (distanceMetres(start.coordinate, end.coordinate) < 0.01) continue;

    const groundElevation = (elevations[index] + elevations[index + 1]) / 2;
    const formationElevation = (formationElevations[index] + formationElevations[index + 1]) / 2;
    const difference = groundElevation - formationElevation;
    const earthwork = difference > balanceToleranceMetres
      ? "cut"
      : difference < -balanceToleranceMetres ? "fill" : "balanced";

    if (earthwork === "cut") maximumCutDepth = Math.max(maximumCutDepth, difference);
    if (earthwork === "fill") maximumFillDepth = Math.max(maximumFillDepth, -difference);

    features.push({
      type: "Feature",
      properties: {
        roadId: id,
        segmentIndex: end.segmentIndex,
        earthwork,
        estimatedDepthMetres: Math.abs(difference),
      },
      geometry: {
        type: "LineString",
        coordinates: [start.coordinate, end.coordinate],
      },
    });
  }

  return {
    roadId: id,
    features,
    maximumCutDepth,
    maximumFillDepth,
    sampleSpacingMetres: effectiveSpacing,
  };
}

function emptyAnalysis(id) {
  return {
    roadId: id,
    features: [],
    maximumCutDepth: 0,
    maximumFillDepth: 0,
    sampleSpacingMetres: 5,
  };
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}
