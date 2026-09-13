// Cell-edge tracing adapted from Skid Builder fill-footprint. Tiles remain separate at seams.
import {inside} from "../browser-slope-core.js";
const pointInPolygon=(p,polygon)=>inside(p,polygon.outerRing);
function fillFootprint(classification, width, height) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || classification.length !== width * height) {
    throw new Error("The fill grid does not match the DEM. Grade again before exporting.");
  }
  const stride = width + 1;
  const edges = [];
  const outgoing = /* @__PURE__ */ new Map();
  const isFill = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return false;
    const kind = classification[y * width + x];
    return kind === 2;
  };
  const add = (x, y, dx, dy, direction) => {
    const start = y * stride + x;
    const edge = { start, end: (y + dy) * stride + x + dx, direction, used: false };
    edges.push(edge);
    const list = outgoing.get(start) ?? [];
    list.push(edge);
    outgoing.set(start, list);
  };
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!isFill(x, y)) continue;
      if (!isFill(x, y - 1)) add(x, y, 1, 0, 0);
      if (!isFill(x + 1, y)) add(x + 1, y, 0, 1, 1);
      if (!isFill(x, y + 1)) add(x + 1, y + 1, -1, 0, 2);
      if (!isFill(x - 1, y)) add(x, y + 1, 0, -1, 3);
    }
  }
  const coordinate = (vertex) => [vertex % stride, Math.floor(vertex / stride)];
  const rings = [];
  for (const first of edges) {
    if (first.used) continue;
    const ring = [coordinate(first.start)];
    let edge = first;
    while (true) {
      edge.used = true;
      if (edge.end === first.start) break;
      ring.push(coordinate(edge.end));
      const candidates = (outgoing.get(edge.end) ?? []).filter((candidate) => !candidate.used);
      const next = [1, 0, 3, 2].flatMap((turn) => candidates.filter((candidate) => candidate.direction === (edge.direction + turn) % 4))[0];
      if (!next) throw new Error("Unable to close the fill boundary. Grade again before exporting.");
      edge = next;
    }
    for (const simple of splitTouchingRings(ring)) {
      rings.push(simple.filter((point, i) => {
        const previous = simple[(i + simple.length - 1) % simple.length];
        const next = simple[(i + 1) % simple.length];
        return (point[0] - previous[0]) * (next[1] - point[1]) !== (point[1] - previous[1]) * (next[0] - point[0]);
      }));
    }
  }
  const polygons = rings.filter((ring) => signedRingArea(ring) > 0).map((outerRing) => ({ outerRing, holes: [] }));
  for (const hole of rings.filter((ring) => signedRingArea(ring) < 0)) {
    const a = hole[0], b = hole[1];
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const probe = [
      (a[0] + b[0]) / 2 + (b[1] - a[1]) / length * 0.25,
      (a[1] + b[1]) / 2 - (b[0] - a[0]) / length * 0.25
    ];
    const owner = polygons.filter((polygon) => pointInPolygon(probe, { outerRing: polygon.outerRing, holes: [] })).sort((a2, b2) => signedRingArea(a2.outerRing) - signedRingArea(b2.outerRing))[0];
    if (!owner) throw new Error("Unable to place a gap in the fill boundary.");
    owner.holes = [...owner.holes, hole];
  }
  return polygons;
}
function splitTouchingRings(ring) {
  const rings = [], path = [];
  const positions = /* @__PURE__ */ new Map();
  for (const point of [...ring, ring[0]]) {
    const key = point.join(","), previous = positions.get(key);
    if (previous !== void 0) {
      rings.push(path.slice(previous));
      for (const removed of path.slice(previous)) positions.delete(removed.join(","));
      path.length = previous;
    }
    positions.set(key, path.length);
    path.push(point);
  }
  return rings;
}
function signedRingArea(ring) {
  const origin = ring[0];
  if (!origin) return 0;
  return ring.reduce((sum, point, i) => {
    const next = ring[(i + 1) % ring.length];
    return sum + (point[0] - origin[0]) * (next[1] - origin[1]) - (next[0] - origin[0]) * (point[1] - origin[1]);
  }, 0) / 2;
}
export {
  fillFootprint,
  signedRingArea
};
