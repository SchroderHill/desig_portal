import { densifyRoad, distanceMetres, roadLengthMetres } from "./road-earthworks-model.js";

const METRES_PER_DEGREE_LATITUDE = 110574;
const METRES_PER_DEGREE_LONGITUDE = 111320;

export function slopeDegreesFromElevations({
  west,
  east,
  south,
  north,
  sampleSpacingMetres,
}) {
  const spacing = Number(sampleSpacingMetres);
  if (![west, east, south, north, spacing].every(Number.isFinite) || spacing <= 0) {
    throw new Error("Slope samples must contain four elevations and a positive spacing.");
  }

  const eastWestGradient = (east - west) / spacing;
  const northSouthGradient = (north - south) / spacing;
  return Math.atan(Math.hypot(eastWestGradient, northSouthGradient)) * 180 / Math.PI;
}

export async function analyseSteepSlope({
  roads,
  terrainProvider,
  thresholdDegrees = 35,
  cellSizeMetres = 20,
  corridorMetres = 75,
  maximumCells = 2500,
}) {
  const validRoads = (roads ?? [])
    .filter((road) => road?.geometry?.type === "LineString")
    .filter((road) => Array.isArray(road.geometry.coordinates) && road.geometry.coordinates.length >= 2);

  if (!validRoads.length) return emptyAnalysis(thresholdDegrees, cellSizeMetres, corridorMetres);
  if (!terrainProvider?.sampleLine) throw new Error("A terrain provider is required for slope analysis.");

  const threshold = finitePositive(thresholdDegrees, 35);
  const corridor = finitePositive(corridorMetres, 75);
  const requestedCellSize = Math.max(5, finitePositive(cellSizeMetres, 20));
  const cellLimit = Math.max(100, Math.floor(finitePositive(maximumCells, 2500)));
  const origin = roadOrigin(validRoads);
  const projection = createLocalProjection(origin);
  const localRoads = validRoads.map((road) => ({
    id: String(road.id ?? "road"),
    coordinates: road.geometry.coordinates,
    localCoordinates: road.geometry.coordinates.map(projection.toLocal),
  }));
  const totalRoadLengthMetres = validRoads.reduce(
    (total, road) => total + roadLengthMetres(road.geometry.coordinates),
    0,
  );

  const approximateCorridorArea = (2 * corridor * totalRoadLengthMetres)
    + (Math.PI * corridor ** 2 * validRoads.length);
  let effectiveCellSize = Math.max(requestedCellSize, Math.sqrt(approximateCorridorArea / cellLimit));
  let cells = buildCorridorCells(localRoads, effectiveCellSize, corridor);

  for (let attempt = 0; cells.length > cellLimit && attempt < 6; attempt += 1) {
    effectiveCellSize *= Math.sqrt(cells.length / cellLimit) * 1.03;
    cells = buildCorridorCells(localRoads, effectiveCellSize, corridor);
  }

  const sampleCoordinates = cells.flatMap((cell) => [
    projection.toLngLat([cell.x - (effectiveCellSize / 2), cell.y]),
    projection.toLngLat([cell.x + (effectiveCellSize / 2), cell.y]),
    projection.toLngLat([cell.x, cell.y - (effectiveCellSize / 2)]),
    projection.toLngLat([cell.x, cell.y + (effectiveCellSize / 2)]),
  ]);
  const elevations = await terrainProvider.sampleLine(sampleCoordinates);

  if (elevations.length !== sampleCoordinates.length || elevations.some((value) => !Number.isFinite(value))) {
    throw new Error("Terrain sampling returned incomplete slope elevations.");
  }

  const slopesByCell = new Map();
  const features = [];

  cells.forEach((cell, cellIndex) => {
    const elevationIndex = cellIndex * 4;
    const slopeDegrees = slopeDegreesFromElevations({
      west: elevations[elevationIndex],
      east: elevations[elevationIndex + 1],
      south: elevations[elevationIndex + 2],
      north: elevations[elevationIndex + 3],
      sampleSpacingMetres: effectiveCellSize,
    });
    slopesByCell.set(cell.key, slopeDegrees);

    if (slopeDegrees <= threshold) return;
    const halfCell = effectiveCellSize / 2;
    const corners = [
      projection.toLngLat([cell.x - halfCell, cell.y - halfCell]),
      projection.toLngLat([cell.x + halfCell, cell.y - halfCell]),
      projection.toLngLat([cell.x + halfCell, cell.y + halfCell]),
      projection.toLngLat([cell.x - halfCell, cell.y + halfCell]),
    ];
    corners.push(corners[0]);
    features.push({
      type: "Feature",
      properties: {
        slopeDegrees,
        thresholdDegrees: threshold,
      },
      geometry: {
        type: "Polygon",
        coordinates: [corners],
      },
    });
  });

  const roadSummaries = localRoads.map((road) => {
    const samples = densifyRoad(road.coordinates, Math.max(5, effectiveCellSize / 2));
    let steepLengthMetres = 0;

    for (let index = 0; index < samples.length - 1; index += 1) {
      const start = samples[index].coordinate;
      const end = samples[index + 1].coordinate;
      const midpoint = projection.toLocal([
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
      ]);
      const slope = slopesByCell.get(cellKeyForPoint(midpoint, effectiveCellSize));
      if (slope > threshold) steepLengthMetres += distanceMetres(start, end);
    }

    return {
      roadId: road.id,
      roadLengthMetres: roadLengthMetres(road.coordinates),
      steepLengthMetres,
    };
  });

  return {
    thresholdDegrees: threshold,
    corridorMetres: corridor,
    cellSizeMetres: effectiveCellSize,
    features,
    totalRoadLengthMetres,
    steepRoadLengthMetres: roadSummaries.reduce((total, road) => total + road.steepLengthMetres, 0),
    steepAreaSquareMetres: features.length * effectiveCellSize ** 2,
    roadSummaries,
  };
}

function buildCorridorCells(roads, cellSize, corridor) {
  const candidates = new Map();
  const neighbourRadius = Math.ceil(corridor / cellSize) + 1;

  roads.forEach((road) => {
    const lineSamples = densifyLocalRoad(road.localCoordinates, Math.max(5, cellSize / 2));
    lineSamples.forEach(([x, y]) => {
      const centreColumn = Math.floor(x / cellSize);
      const centreRow = Math.floor(y / cellSize);
      for (let columnOffset = -neighbourRadius; columnOffset <= neighbourRadius; columnOffset += 1) {
        for (let rowOffset = -neighbourRadius; rowOffset <= neighbourRadius; rowOffset += 1) {
          const column = centreColumn + columnOffset;
          const row = centreRow + rowOffset;
          const key = `${column}:${row}`;
          if (!candidates.has(key)) {
            candidates.set(key, {
              key,
              column,
              row,
              x: (column + 0.5) * cellSize,
              y: (row + 0.5) * cellSize,
            });
          }
        }
      }
    });
  });

  return [...candidates.values()].filter((cell) => (
    distanceToRoads([cell.x, cell.y], roads) <= corridor
  ));
}

function densifyLocalRoad(coordinates, spacing) {
  const samples = [];
  coordinates.slice(0, -1).forEach((start, segmentIndex) => {
    const end = coordinates[segmentIndex + 1];
    const length = Math.hypot(end[0] - start[0], end[1] - start[1]);
    const intervals = Math.max(1, Math.ceil(length / spacing));
    for (let interval = 0; interval <= intervals; interval += 1) {
      if (segmentIndex > 0 && interval === 0) continue;
      const ratio = interval / intervals;
      samples.push([
        start[0] + ((end[0] - start[0]) * ratio),
        start[1] + ((end[1] - start[1]) * ratio),
      ]);
    }
  });
  return samples;
}

function distanceToRoads(point, roads) {
  let minimum = Number.POSITIVE_INFINITY;
  roads.forEach((road) => {
    for (let index = 0; index < road.localCoordinates.length - 1; index += 1) {
      minimum = Math.min(
        minimum,
        distanceToSegment(point, road.localCoordinates[index], road.localCoordinates[index + 1]),
      );
    }
  });
  return minimum;
}

function distanceToSegment(point, start, end) {
  const deltaX = end[0] - start[0];
  const deltaY = end[1] - start[1];
  const lengthSquared = (deltaX ** 2) + (deltaY ** 2);
  if (!lengthSquared) return Math.hypot(point[0] - start[0], point[1] - start[1]);
  const ratio = Math.max(0, Math.min(1, (
    ((point[0] - start[0]) * deltaX) + ((point[1] - start[1]) * deltaY)
  ) / lengthSquared));
  return Math.hypot(
    point[0] - (start[0] + (ratio * deltaX)),
    point[1] - (start[1] + (ratio * deltaY)),
  );
}

function cellKeyForPoint([x, y], cellSize) {
  return `${Math.floor(x / cellSize)}:${Math.floor(y / cellSize)}`;
}

function roadOrigin(roads) {
  const coordinates = roads.flatMap((road) => road.geometry.coordinates);
  const totals = coordinates.reduce(
    (sum, coordinate) => [sum[0] + coordinate[0], sum[1] + coordinate[1]],
    [0, 0],
  );
  return [totals[0] / coordinates.length, totals[1] / coordinates.length];
}

function createLocalProjection([originLongitude, originLatitude]) {
  const longitudeScale = METRES_PER_DEGREE_LONGITUDE * Math.cos(originLatitude * Math.PI / 180);
  return {
    toLocal: ([longitude, latitude]) => [
      (longitude - originLongitude) * longitudeScale,
      (latitude - originLatitude) * METRES_PER_DEGREE_LATITUDE,
    ],
    toLngLat: ([x, y]) => [
      originLongitude + (x / longitudeScale),
      originLatitude + (y / METRES_PER_DEGREE_LATITUDE),
    ],
  };
}

function finitePositive(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function emptyAnalysis(thresholdDegrees, cellSizeMetres, corridorMetres) {
  return {
    thresholdDegrees,
    corridorMetres,
    cellSizeMetres,
    features: [],
    totalRoadLengthMetres: 0,
    steepRoadLengthMetres: 0,
    steepAreaSquareMetres: 0,
    roadSummaries: [],
  };
}
