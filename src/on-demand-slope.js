import { LidarSlopeGrid } from './lidar-slope.js';

export class LidarTileGrid extends LidarSlopeGrid {
  constructor(result, tiles) {
    super({version: 1, thresholdDegrees: 35, cellSizeMetres: 1, width: 1, height: 1, left: 0,
      top: result.gridTop, name: result.source.name, bounds: result.source.bounds}, new Uint8Array(1));
    this.tileSize = result.tileSize;
    this.tiles = new Map(tiles.map(({column, row, grid}) => [`${column}:${row}`, grid]));
    this.polygons = {features: tiles.flatMap(tile => tile.grid.polygons.features)};
    this.timing = {seconds: result.seconds, cacheHits: result.cacheHits, tileCount: result.tiles.length, bytes: result.downloadBytes};
    this.noCoverage = !tiles.length;
  }
  cell(column, row) {
    const c = Math.floor(column/this.tileSize), r = Math.floor(row/this.tileSize);
    return this.tiles.get(`${c}:${r}`)?.cell(column-c*this.tileSize, row-r*this.tileSize) ?? 0;
  }
  analyse(input) {
    return {...super.analyse(input), outsideCoverage: this.noCoverage, timing: this.timing, onDemand: true};
  }
}

export function createOnDemandSlopeLoader({fetchImpl = globalThis.fetch, pollMs = 400, timeoutMs = 900000} = {}) {
  const cache = new Map();
  const json = async (url, options = {}) => {
    const response = await fetchImpl(url, {...options, signal: options.signal
      ? AbortSignal.any([options.signal, AbortSignal.timeout(30000)]) : AbortSignal.timeout(30000)});
    let data;
    try { data = await response.json(); }
    catch { throw Error('Open this portal through its local Python desktop server; a static preview cannot load LiDAR.'); }
    if (!response.ok) throw Object.assign(Error(data.error || `Slope server HTTP ${response.status}`), {status: response.status});
    return data;
  };
  return async ({bounds, roads = [], areas, coverageOnly = false, signal, onProgress = () => {}} = {}) => {
    if (coverageOnly) return {metadata: await json('/api/slope/coverage')};
    const started = performance.now();
    let job;
    // A cancelled native read may need a moment to finish; wait for its slot.
    while (!job) {
      signal?.throwIfAborted();
      try {
        ({job} = await json('/api/slope/prepare', {
          method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({bounds, roads, areas}),
        }));
      } catch (error) {
        if (error.status !== 429 || performance.now()-started > timeoutMs) throw error;
        await new Promise(resolve => setTimeout(resolve, pollMs));
      }
    }
    const cancel = () => { fetchImpl(`/api/slope/cancel/${job}`, {method: 'POST', signal: AbortSignal.timeout(5000)}).catch(() => {}); };
    signal?.addEventListener('abort', cancel, {once: true});
    try {
      if (signal?.aborted) { cancel(); signal.throwIfAborted(); }
      let result;
      while (!result) {
        if (performance.now()-started > timeoutMs) throw Error('LiDAR preparation is taking too long. Retry to use tiles already cached.');
        signal?.throwIfAborted();
        const status = await json(`/api/slope/jobs/${job}`, {signal});
        if (status.state === 'error') throw Error(status.error);
        if (status.state === 'ready') result = status.result;
        else {
          if (status.message) onProgress(status.message);
          await new Promise(resolve => setTimeout(resolve, pollMs));
        }
      }
      const tiles = [];
      for (const entry of result.tiles) {
        signal?.throwIfAborted();
        onProgress(`Loading slope overlay: ${tiles.length+1} / ${result.tiles.length} tiles…`);
        let grid = cache.get(entry.url);
        if (!grid) {
          const response = await fetchImpl(entry.url, {signal: signal
            ? AbortSignal.any([signal, AbortSignal.timeout(30000)]) : AbortSignal.timeout(30000)});
          if (!response.ok) throw Error(`Slope tile could not load (HTTP ${response.status})`);
          if (typeof DecompressionStream !== 'function') throw Error('A current desktop browser is required');
          const data = await new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json();
          const bytes = Uint8Array.from(atob(data.classes), char => char.charCodeAt(0));
          grid = new LidarSlopeGrid(data.metadata, bytes, data.polygons);
          cache.set(entry.url, grid);
        } else {
          cache.delete(entry.url); cache.set(entry.url, grid);
        }
        tiles.push({...entry, grid});
      }
      while (cache.size > 48) cache.delete(cache.keys().next().value);
      return new LidarTileGrid(result, tiles);
    } catch (error) {
      cancel();
      throw error;
    } finally {
      signal?.removeEventListener('abort', cancel);
    }
  };
}
