import { distanceMetres } from "./road-earthworks-model.js";

export function roadSlopeStats(roads, analysis) {
  const summaries = new Map((analysis?.roadSummaries ?? []).map(summary => [summary.roadId, summary]));
  return roads.map((road, index) => {
    const summary = summaries.get(String(road.id));
    return {
      id: road.id,
      ...(summary?.unknownLengthMetres !== undefined ? { unknownMetres: summary.unknownLengthMetres, sourceName: analysis.sourceName } : {}),
      name: road.properties?.name || `Road ${index + 1}`,
      steepMetres: summary ? Math.round(summary.steepLengthMetres) : null,
      totalMetres: summary ? Math.round(summary.roadLengthMetres) : null,
      percentage: summary ? (summary.roadLengthMetres > 0
        ? 100 * summary.steepLengthMetres / summary.roadLengthMetres : 0).toFixed(1) : null,
    };
  });
}

export function roadMidpoint(points) {
  const lengths = points.slice(1).map((point, index) => distanceMetres(points[index], point));
  let remaining = lengths.reduce((total, length) => total + length, 0) / 2;
  for (let index = 0; index < lengths.length; index += 1) {
    if (remaining <= lengths[index]) {
      const fraction = lengths[index] ? remaining / lengths[index] : 0;
      return points[index].map((value, axis) => value + (points[index + 1][axis] - value) * fraction).slice(0, 2);
    }
    remaining -= lengths[index];
  }
  return points[0];
}

export function createRoadSlopePopups({ PopupClass, map }) {
  if (!PopupClass) return () => {};
  const documentRef = map.getContainer().ownerDocument;
  const popups = new Map();
  const closed = new Set();
  let latest;
  let previous = "";
  const render = (input) => {
    latest = input;
    const { roads, analysis, active, editing, error } = input;
    const stats = roadSlopeStats(roads, analysis).map((stat, index) => ({
      ...stat, position: roadMidpoint(roads[index].geometry.coordinates),
    }));
    const signature = JSON.stringify({ stats, active, editing, error });
    if (signature === previous) return;
    previous = signature;
    for (const id of closed) {
      if (!stats.some(stat => stat.id === id)) closed.delete(id);
    }
    for (const [id, popup] of popups) {
      if (!active || editing || !stats.some(stat => stat.id === id)) {
        popups.delete(id);
        popup.remove();
      }
    }
    if (!active || editing) return;
    for (const stat of stats) {
      if (closed.has(stat.id)) continue;
      const card = documentRef.createElement("div");
      card.className = "road-slope-card";
      card.dataset.roadId = String(stat.id);
      const name = documentRef.createElement("strong");
      name.textContent = stat.name;
      const value = documentRef.createElement("span");
      value.className = "road-slope-metres";
      const detail = documentRef.createElement("span");
      if (stat.steepMetres !== null && !editing) {
        value.textContent = `${stat.steepMetres.toLocaleString("en-NZ")} m >35°`;
        detail.textContent = `Total length = ${stat.totalMetres.toLocaleString("en-NZ")} m`;
        if (stat.unknownMetres > 0.01) {
          value.textContent = stat.unknownMetres >= stat.totalMetres - 0.5 ? 'Slope unknown' : `${stat.steepMetres.toLocaleString("en-NZ")} m >35° (partial)`;
          detail.textContent += ` · ${Math.ceil(stat.unknownMetres).toLocaleString("en-NZ")} m not assessed`;
        }
      } else {
        value.textContent = "—";
        detail.textContent = editing ? "Finish editing to update slope metres."
          : error ? "Slope measurement unavailable. Retry Slope."
          : active ? "Calculating slope metres…" : "Turn on Slope >35° to calculate.";
      }
      card.append(name, value, detail);
      if (stat.sourceName) {
        const source = documentRef.createElement('small');
        source.textContent = 'LiDAR · 1 m grid · estimated metres';
        card.append(source);
      }
      let popup = popups.get(stat.id);
      if (!popup) {
        popup = new PopupClass({ closeButton: true, closeOnClick: false, anchor: "bottom", offset: 14,
          className: "road-slope-popup", maxWidth: "200px", focusAfterOpen: false });
        popup.on("close", () => {
          // Programmatic hiding removes the entry first; only user dismissal persists.
          if (popups.get(stat.id) === popup) {
            closed.add(stat.id);
            popups.delete(stat.id);
          }
        });
        popups.set(stat.id, popup);
      }
      popup.setLngLat(stat.position).setDOMContent(card);
      if (!popup.isOpen()) popup.addTo(map);
    }
  };
  render.reopen = (ids) => {
    if (!latest || !ids.some(id => closed.has(id))) return;
    ids.forEach(id => closed.delete(id));
    previous = "";
    render(latest);
  };
  return render;
}
