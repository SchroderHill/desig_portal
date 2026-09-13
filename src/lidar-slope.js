import proj4 from 'proj4';
import { distanceMetres, densifyRoad } from './road-earthworks-model.js';

const NZTM = '+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +ellps=GRS80 +units=m +no_defs';
const project = coordinate => proj4('EPSG:4326', NZTM, coordinate.slice(0, 2));

export class LidarSlopeGrid {
  constructor(metadata, bytes, polygons = { features: [] }, toProjected = project) {
    if (metadata.version !== 1 || metadata.thresholdDegrees !== 35 || metadata.cellSizeMetres !== 1
      || !Number.isInteger(metadata.width) || metadata.width <= 0
      || !Number.isInteger(metadata.height) || metadata.height <= 0
      || !Number.isFinite(metadata.left) || !Number.isFinite(metadata.top)
      || bytes.length !== Math.ceil(metadata.width * metadata.height / 4)) throw Error('Invalid LiDAR slope dataset');
    this.metadata = metadata; this.bytes = bytes; this.polygons = polygons; this.project = toProjected;
  }

  cell(column, row) {
    const { width, height } = this.metadata;
    if (column < 0 || row < 0 || column >= width || row >= height) return 0;
    const index = row * width + column;
    const value = (this.bytes[index >> 2] >> ((index % 4) * 2)) & 3;
    return value === 1 || value === 2 ? value : 0;
  }

  pixel(coordinate) {
    const [x, y] = this.project(coordinate);
    return [x - this.metadata.left, this.metadata.top - y];
  }

  measureRoad(road) {
    const points = road.geometry.coordinates;
    if (!points.every(p => Number.isFinite(p[0]) && Number.isFinite(p[1]))) throw Error('Invalid road coordinates');
    // Short projected chords avoid curvature error; split exactly at every raster boundary.
    const samples = densifyRoad(points, 20).map(sample => sample.coordinate);
    let roadLengthMetres = 0, steepLengthMetres = 0, unknownLengthMetres = 0;
    for (let i = 1; i < samples.length; i++) {
      const length = distanceMetres(samples[i - 1], samples[i]);
      const a = this.pixel(samples[i - 1]), b = this.pixel(samples[i]);
      const stops = [0, 1];
      for (let axis = 0; axis < 2; axis++) {
        const delta = b[axis] - a[axis];
        if (!delta) continue;
        for (let edge = Math.floor(Math.min(a[axis], b[axis])) + 1; edge < Math.max(a[axis], b[axis]); edge++) {
          stops.push((edge - a[axis]) / delta);
        }
      }
      stops.sort((x, y) => x - y);
      for (let j = 1; j < stops.length; j++) {
        const mid = (stops[j - 1] + stops[j]) / 2;
        const value = this.cell(Math.floor(a[0] + (b[0] - a[0]) * mid), Math.floor(a[1] + (b[1] - a[1]) * mid));
        const part = length * (stops[j] - stops[j - 1]);
        if (value === 2) steepLengthMetres += part;
        if (!value) unknownLengthMetres += part;
      }
      roadLengthMetres += length;
    }
    return { roadId: String(road.id), roadLengthMetres, steepLengthMetres, unknownLengthMetres };
  }

  analyse({ roads = [], bounds }) {
    const roadSummaries = roads.map(road => this.measureRoad(road));
    const features = bounds ? this.polygons.features.filter(({ bbox: b }) =>
      b[0] <= bounds.east && b[2] >= bounds.west && b[1] <= bounds.north && b[3] >= bounds.south) : [];
    const b = this.metadata.bounds;
    const outsideCoverage = bounds && b && (bounds.east < b[0] || bounds.west > b[2] || bounds.north < b[1] || bounds.south > b[3]);
    return { features, roadSummaries, outsideCoverage, sourceName: this.metadata.name, cellSizeMetres: 1, thresholdDegrees: 35,
      coverageBounds: this.metadata.bounds,
      totalRoadLengthMetres: roadSummaries.reduce((sum, r) => sum + r.roadLengthMetres, 0),
      steepRoadLengthMetres: roadSummaries.reduce((sum, r) => sum + r.steepLengthMetres, 0),
      unknownLengthMetres: roadSummaries.reduce((sum, r) => sum + r.unknownLengthMetres, 0) };
  }
}

export function createLidarSlopeLoader({ fetchImpl = globalThis.fetch, baseUrl = './data/slope/terraces/' } = {}) {
  let pending;
  return () => pending ??= (async () => {
    const get = async name => {
      const response = await fetchImpl(baseUrl + name, {cache: 'no-cache'});
      if (!response.ok) throw Error(`LiDAR dataset could not load (HTTP ${response.status})`);
      return response;
    };
    const metadata = await (await get('manifest.json')).json();
    const [binary, compressed] = await Promise.all([get(metadata.classes), get(metadata.polygons)]);
    const bytes = new Uint8Array(await binary.arrayBuffer());
    if (globalThis.crypto?.subtle) {
      const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', bytes));
      if (Array.from(digest, n => n.toString(16).padStart(2, '0')).join('') !== metadata.classesSha256) throw Error('LiDAR dataset checksum mismatch');
    }
    if (typeof DecompressionStream !== 'function') throw Error('Please use a current browser to load LiDAR slope data');
    const polygons = await new Response(compressed.body.pipeThrough(new DecompressionStream('gzip'))).json();
    return new LidarSlopeGrid(metadata, bytes, polygons);
  })().catch(error => { pending = undefined; throw error; });
}
