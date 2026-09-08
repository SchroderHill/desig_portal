import { createOnDemandSlopeLoader } from "./on-demand-slope.js";
import { createRoadSlopePopups } from "./road-slope-cards.js";

const SOURCE_ID = "steep-slope-35";
const FILL_LAYER_ID = "steep-slope-35-fill";
const OUTLINE_LAYER_ID = "steep-slope-35-outline";
const EMPTY_COLLECTION = { type: "FeatureCollection", features: [] };

export function initialiseSteepSlope({
  map,
  draw,
  accessToken,
  buttonElement,
  resultElement,
  statusElement,
  PopupClass,
  thresholdDegrees = 35,
  corridorMetres = 75,
  loadSlope = createOnDemandSlopeLoader(),
  coverageButton,
}) {
  if (!map || !draw || !buttonElement) {
    if (buttonElement) buttonElement.disabled = true;
    showStatus(statusElement, "Slope analysis unavailable.", true);
    return;
  }

  let active = false;
  let analysis = null;
  let revision = 0;
  let debounceTimer = null;
  let drawingOrEditing = false;
  let roadAnalysis = null;
  let roadSignature = "";
  let running = false;
  let roadError = false;
  let displayedSource, displayedFeatures;
  coverageButton?.addEventListener('click', async () => {
    try {
      const grid = await loadSlope({coverageOnly: true});
      const [west, south, east, north] = grid.metadata.bounds;
      map.flyTo({center: [(west+east)/2, (south+north)/2], zoom: 16.5, pitch: 0, bearing: 0});
    } catch (error) { showStatus(statusElement, error.message, true); }
  });
  const renderCards = createRoadSlopePopups({ PopupClass, map });
  map.on("draw.selectionchange", event => renderCards.reopen?.(event.features.map(feature => feature.id)));
  map.on("road.popup.open", event => renderCards.reopen?.([event.roadId]));
  map.on("click", event => {
    if (["simple_select", "direct_select"].includes(draw.getMode?.())) {
      const ids = draw.getFeatureIdsAt?.(event.point) ?? [];
      if (map.getLayer("road-earthworks-estimate-line")) {
        const { x, y } = event.point;
        const hits = map.queryRenderedFeatures([[x - 8, y - 8], [x + 8, y + 8]], {
          layers: ["road-earthworks-estimate-line"],
        });
        ids.push(...hits.map(feature => feature.properties.roadId));
      }
      renderCards.reopen?.(ids);
    }
  });

  const ensureMapLayers = () => {
    // getStyle() can throw while Mapbox is still fetching its initial style.
    if (!map.isStyleLoaded() && !map.getSource(SOURCE_ID)) return false;
    if (!map.getSource(SOURCE_ID)) {
      map.addSource(SOURCE_ID, { type: "geojson", data: EMPTY_COLLECTION, tolerance: 0 });
    }
    const beforeLayer = map.getLayer("road-earthworks-estimate-line")
      ? "road-earthworks-estimate-line"
      : map.getLayer("vertices") ? "vertices" : undefined;
    if (!map.getLayer(FILL_LAYER_ID)) {
      map.addLayer({
        id: FILL_LAYER_ID,
        type: "fill",
        source: SOURCE_ID,
        paint: {
          "fill-color": "#d7191c",
          "fill-opacity": 0.48,
        },
      }, beforeLayer);
    }
    if (!map.getLayer(OUTLINE_LAYER_ID)) {
      map.addLayer({
        id: OUTLINE_LAYER_ID,
        type: "line",
        source: SOURCE_ID,
        paint: {
          "line-color": "#8b0000",
          "line-width": 0,
          "line-opacity": 0.8,
        },
      }, beforeLayer);
    }
    return true;
  };

  const render = () => {
    const mode = draw.getMode?.();
    if (mode) drawingOrEditing = mode === "draw_line_string" || mode === "draw_polygon";
    renderCards({
      roads: draw.getAll().features.filter(feature => feature.geometry?.type === "LineString" && feature.geometry.coordinates.length >= 2),
      analysis: roadAnalysis, active, editing: drawingOrEditing, error: roadError,
    });
    if (resultElement) {
      resultElement.hidden = !(active && analysis);
      resultElement.textContent = active && analysis ? resultSummary(analysis, drawingOrEditing ? null : roadAnalysis) : "";
    }
    if (!ensureMapLayers()) return;
    const source = map.getSource(SOURCE_ID);
    const features = active && analysis ? analysis.features : EMPTY_COLLECTION.features;
    if (source && (source !== displayedSource || features !== displayedFeatures)) {
      source.setData({ type: 'FeatureCollection', features });
      displayedSource = source;
      displayedFeatures = features;
    }
  };

  const runAnalysis = async (requestedRevision) => {
    if (!active || requestedRevision !== revision) return;
    if (running) { scheduleAnalysis(250); return; }
    if (!map.isStyleLoaded()) { scheduleAnalysis(250); return; }
    running = true;
    roadError = false;
    showStatus(statusElement, `Preparing 1 m LiDAR slope tiles… First load may take longer; repeat views use the local cache.`);
    try {
      const view = map.getBounds();
      const bounds = { west: view.getWest(), south: view.getSouth(), east: view.getEast(), north: view.getNorth() };
      const width = (bounds.east - bounds.west) * 111320 * Math.cos((bounds.south + bounds.north) * Math.PI / 360);
      const height = (bounds.north - bounds.south) * 110574;
      if (width > 20000 || height > 20000) throw new Error("Zoom in to a forest or road area (view under 20 km across).");
      const requestedRoads = draw.getAll().features.filter(feature => feature.geometry?.type === 'LineString' && feature.geometry.coordinates.length >= 2);
      const grid = await loadSlope({bounds, roads: requestedRoads});
      const result = grid.analyse({ bounds });
      if (requestedRevision !== revision || !active) return;
      analysis = result;
      render();
      const roads = drawingOrEditing ? [] : draw.getAll().features.filter((feature) => feature.geometry?.type === "LineString" && feature.geometry.coordinates.length >= 2);
      const signature = JSON.stringify(roads.map(({ id, geometry }) => ({ id, geometry })));
      if (signature !== roadSignature) {
        const summary = roads.length ? grid.analyse({ roads }) : null;
        if (requestedRevision !== revision || !active) return;
        roadAnalysis = summary;
        roadSignature = signature;
        render();
      }
      hideStatus(statusElement);
    } catch (error) {
      if (requestedRevision !== revision || !active) return;
      analysis = null;
      roadAnalysis = null;
      roadSignature = "";
      roadError = true;
      render();
      showStatus(statusElement, `Slope analysis unavailable: ${error.message}`, true);
    } finally {
      running = false;
    }
  };

  const scheduleAnalysis = (delay = 350) => {
    if (!active) return;
    revision += 1;
    const requestedRevision = revision;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => runAnalysis(requestedRevision), delay);
  };

  buttonElement.addEventListener("click", () => {
    active = !active;
    buttonElement.setAttribute("aria-pressed", String(active));
    buttonElement.textContent = active ? "Slope >35°: On" : "Slope >35°";
    if (active) {
      render();
      scheduleAnalysis(0);
    } else {
      revision += 1;
      clearTimeout(debounceTimer);
      buttonElement.disabled = false;
      render();
      hideStatus(statusElement);
    }
  });

  if (!ensureMapLayers()) {
    map.once("style.load", () => {
      ensureMapLayers();
      render();
    });
  }
  map.on("style.load", () => {
    ensureMapLayers();
    render();
    scheduleAnalysis(0);
  });
  const roadsChanged = () => {
    roadAnalysis = null;
    roadError = false;
    roadSignature = "";
    render();
    scheduleAnalysis(0);
  };
  map.on("draw.create", roadsChanged);
  map.on("draw.update", roadsChanged);
  map.on("draw.delete", roadsChanged);
  map.on("draw.modechange", ({ mode }) => {
    drawingOrEditing = mode === "draw_line_string" || mode === "draw_polygon";
    if (drawingOrEditing) render();
    else scheduleAnalysis(0);
  });
  map.on("movestart", () => {
    revision += 1;
    clearTimeout(debounceTimer);
  });
  map.on("moveend", () => scheduleAnalysis());
}

function resultSummary(analysis, roadAnalysis) {
  if (analysis.sourceName) {
    const timing = analysis.timing ? `${analysis.timing.tileCount} tiles; ${analysis.timing.cacheHits} cached; preparation ${analysis.timing.seconds.toFixed(1)} s. ` : '';
    const overview = (analysis.outsideCoverage ? 'Outside trial coverage. Use View LiDAR test area. ' : '')
      + `${analysis.sourceName} · 1 m reference grid · >35°. Outside mapped coverage is unknown, not flat. `;
    if (!roadAnalysis?.totalRoadLengthMetres) return overview + timing + 'Draw a road within available coverage to measure its steep sections.';
    return overview + timing + `Roads: ${formatLength(roadAnalysis.steepRoadLengthMetres)} above 35°. `
      + (roadAnalysis.unknownLengthMetres > 0.01 ? `${formatLength(roadAnalysis.unknownLengthMetres)} has no LiDAR coverage.` : 'All road sections have coverage.');
  }
  const gridSize = Math.round(analysis.cellSizeMetres);
  const overview = `Slope >${analysis.thresholdDegrees}°: ${formatArea(analysis.steepAreaSquareMetres)} in the map view. `
    + `Grid: ~${gridSize} m${gridSize > 25 ? " (zoom in for more detail)" : ""}. `;
  if (!roadAnalysis || !roadAnalysis.totalRoadLengthMetres) return overview + "Draw a road to measure its steep sections.";
  const percentage = roadAnalysis.steepRoadLengthMetres / roadAnalysis.totalRoadLengthMetres * 100;
  return overview + `Roads: ${formatLength(roadAnalysis.steepRoadLengthMetres)} of `
    + `${formatLength(roadAnalysis.totalRoadLengthMetres)} (${percentage.toFixed(1)}%) above ${analysis.thresholdDegrees}°. `
    + `Road analysis grid: ~${Math.round(roadAnalysis.cellSizeMetres)} m.`;
}

function formatLength(metres) {
  return metres >= 1000 ? `${(metres / 1000).toFixed(2)} km` : `${Math.round(metres)} m`;
}

function formatArea(squareMetres) {
  return squareMetres >= 10000
    ? `${(squareMetres / 10000).toFixed(2)} ha`
    : `${Math.round(squareMetres)} m²`;
}

function showStatus(element, message, isError = false) {
  if (!element) return;
  element.hidden = false;
  element.textContent = message;
  element.dataset.state = isError ? "error" : "loading";
}

function hideStatus(element) {
  if (!element) return;
  element.hidden = true;
  element.textContent = "";
  delete element.dataset.state;
}
