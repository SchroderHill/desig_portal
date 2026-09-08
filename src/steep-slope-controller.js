import { analyseSteepSlope } from "./steep-slope-model.js";
import { MapboxTerrainRgbProvider } from "./terrain-rgb.js";

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
  thresholdDegrees = 35,
  corridorMetres = 75,
}) {
  if (!map || !draw || !accessToken || !buttonElement) {
    if (buttonElement) buttonElement.disabled = true;
    showStatus(statusElement, "Slope analysis unavailable.", true);
    return;
  }

  const terrainProvider = new MapboxTerrainRgbProvider({ accessToken });
  let active = false;
  let analysis = null;
  let revision = 0;
  let debounceTimer = null;
  let drawingOrEditing = false;
  let roadAnalysis = null;
  let roadSignature = "";
  let running = false;

  const ensureMapLayers = () => {
    // getStyle() can throw while Mapbox is still fetching its initial style.
    if (!map.isStyleLoaded() && !map.getSource(SOURCE_ID)) return false;
    if (!map.getSource(SOURCE_ID)) {
      map.addSource(SOURCE_ID, { type: "geojson", data: EMPTY_COLLECTION });
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
          "line-width": 0.8,
          "line-opacity": 0.8,
        },
      }, beforeLayer);
    }
    return true;
  };

  const render = () => {
    if (resultElement) {
      resultElement.hidden = !(active && analysis);
      resultElement.textContent = active && analysis ? resultSummary(analysis, drawingOrEditing ? null : roadAnalysis) : "";
    }
    if (!ensureMapLayers()) return;
    const source = map.getSource(SOURCE_ID);
    if (source) {
      source.setData(active && analysis
        ? { type: "FeatureCollection", features: analysis.features }
        : EMPTY_COLLECTION);
    }
  };

  const runAnalysis = async (requestedRevision) => {
    if (!active || requestedRevision !== revision) return;
    if (running) { scheduleAnalysis(250); return; }
    if (!map.isStyleLoaded()) { scheduleAnalysis(250); return; }
    running = true;
    showStatus(statusElement, `Calculating visible terrain over ${thresholdDegrees}°…`);
    try {
      const view = map.getBounds();
      const bounds = { west: view.getWest(), south: view.getSouth(), east: view.getEast(), north: view.getNorth() };
      const width = (bounds.east - bounds.west) * 111320 * Math.cos((bounds.south + bounds.north) * Math.PI / 360);
      const height = (bounds.north - bounds.south) * 110574;
      if (width > 20000 || height > 20000) throw new Error("Zoom in to a forest or road area (view under 20 km across).");
      const result = await analyseSteepSlope({
        roads: [],
        bounds,
        terrainProvider,
        thresholdDegrees,
        corridorMetres,
        cellSizeMetres: 20,
        maximumCells: 10000,
      });
      if (requestedRevision !== revision || !active) return;
      analysis = result;
      render();
      const roads = drawingOrEditing ? [] : draw.getAll().features.filter((feature) => feature.geometry?.type === "LineString");
      const signature = JSON.stringify(roads.map(({ id, geometry }) => ({ id, geometry })));
      if (signature !== roadSignature) {
        const summary = roads.length ? await analyseSteepSlope({
          roads, terrainProvider, thresholdDegrees, corridorMetres, cellSizeMetres: 20, maximumCells: 2500,
        }) : null;
        if (requestedRevision !== revision || !active) return;
        roadAnalysis = summary;
        roadSignature = signature;
        render();
      }
      hideStatus(statusElement);
    } catch (error) {
      if (requestedRevision !== revision || !active) return;
      analysis = null;
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
    roadSignature = "";
    render();
    scheduleAnalysis(0);
  };
  map.on("draw.create", roadsChanged);
  map.on("draw.update", roadsChanged);
  map.on("draw.delete", roadsChanged);
  map.on("draw.modechange", ({ mode }) => {
    drawingOrEditing = mode === "draw_line_string" || mode === "direct_select";
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
  const gridSize = Math.round(analysis.cellSizeMetres);
  const overview = `Slope >${analysis.thresholdDegrees}°: ${formatArea(analysis.steepAreaSquareMetres)} in the map view. `
    + `Grid: ~${gridSize} m${gridSize > 25 ? " (zoom in for more detail)" : ""}. `;
  if (!roadAnalysis) return overview + "Draw a road to measure its steep sections.";
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
