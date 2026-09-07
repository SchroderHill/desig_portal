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

  const ensureMapLayers = () => {
    if (!map.getStyle()?.layers) return false;
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
    ensureMapLayers();
    const source = map.getSource(SOURCE_ID);
    if (source) {
      source.setData(active && !drawingOrEditing && analysis
        ? { type: "FeatureCollection", features: analysis.features }
        : EMPTY_COLLECTION);
    }
    if (resultElement) {
      resultElement.hidden = !(active && !drawingOrEditing && analysis);
      resultElement.textContent = active && analysis ? resultSummary(analysis) : "";
    }
  };

  const runAnalysis = async (requestedRevision) => {
    if (!active) return;
    const roads = draw.getAll().features.filter((feature) => feature.geometry?.type === "LineString");
    if (!roads.length) {
      analysis = null;
      render();
      showStatus(statusElement, "Draw a road before calculating slope >35°.", true);
      return;
    }

    buttonElement.disabled = true;
    showStatus(statusElement, `Calculating terrain over ${thresholdDegrees}°…`);
    try {
      const result = await analyseSteepSlope({
        roads,
        terrainProvider,
        thresholdDegrees,
        corridorMetres,
        cellSizeMetres: 20,
        maximumCells: 2500,
      });
      if (requestedRevision !== revision || !active) return;
      analysis = result;
      render();
      hideStatus(statusElement);
    } catch (error) {
      if (requestedRevision !== revision || !active) return;
      analysis = null;
      render();
      showStatus(statusElement, `Slope analysis unavailable: ${error.message}`, true);
    } finally {
      if (requestedRevision === revision) buttonElement.disabled = false;
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
  });
  map.on("draw.create", () => scheduleAnalysis(0));
  map.on("draw.update", () => scheduleAnalysis());
  map.on("draw.delete", () => scheduleAnalysis(0));
  map.on("draw.modechange", ({ mode }) => {
    drawingOrEditing = mode === "draw_line_string" || mode === "direct_select";
    if (drawingOrEditing) render();
    else scheduleAnalysis(0);
  });
  map.on("mouseup", () => scheduleAnalysis());
}

function resultSummary(analysis) {
  const percentage = analysis.totalRoadLengthMetres > 0
    ? (analysis.steepRoadLengthMetres / analysis.totalRoadLengthMetres) * 100
    : 0;
  const gridSize = Math.round(analysis.cellSizeMetres);
  return `Slope >${analysis.thresholdDegrees}°: ${formatLength(analysis.steepRoadLengthMetres)} of `
    + `${formatLength(analysis.totalRoadLengthMetres)} road (${percentage.toFixed(1)}%). `
    + `Red area: ${formatArea(analysis.steepAreaSquareMetres)} within ${analysis.corridorMetres} m of roads. `
    + `DEM grid: ~${gridSize} m.`;
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
