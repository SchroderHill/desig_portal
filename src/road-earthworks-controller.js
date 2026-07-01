import { analyseRoadEarthworks } from "./road-earthworks-model.js";
import { MapboxTerrainRgbProvider } from "./terrain-rgb.js";

const SOURCE_ID = "road-earthworks-estimate";
const LAYER_ID = "road-earthworks-estimate-line";
const EMPTY_COLLECTION = { type: "FeatureCollection", features: [] };

export function initialiseRoadEarthworks({ map, draw, accessToken, legendElement, statusElement }) {
  if (!map || !draw || !accessToken) {
    if (statusElement) {
      statusElement.hidden = false;
      statusElement.textContent = "Cut/fill estimate unavailable.";
    }
    return;
  }

  const terrainProvider = new MapboxTerrainRgbProvider({ accessToken });
  const analyses = new Map();
  let revision = 0;
  let debounceTimer = null;
  let lastSuccessfulGeometry = "";
  let drawingOrEditing = false;

  const ensureMapLayer = () => {
    if (!map.isStyleLoaded()) return;
    if (!map.getSource(SOURCE_ID)) {
      map.addSource(SOURCE_ID, { type: "geojson", data: EMPTY_COLLECTION });
    }
    if (!map.getLayer(LAYER_ID)) {
      const beforeLayer = map.getLayer("vertices")
        ? "vertices"
        : map.getLayer("grade-labels") ? "grade-labels" : undefined;
      map.addLayer({
        id: LAYER_ID,
        type: "line",
        source: SOURCE_ID,
        paint: {
          "line-color": [
            "match",
            ["get", "earthwork"],
            "cut", "#2eae62",
            "fill", "#f28c28",
            "#9ca3af",
          ],
          "line-width": 6,
          "line-opacity": 0.95,
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
      }, beforeLayer);
    }
  };

  const render = () => {
    ensureMapLayer();
    const source = map.getSource(SOURCE_ID);
    if (!source) return;
    const features = [...analyses.values()].flatMap((analysis) => analysis.features);
    source.setData(drawingOrEditing ? EMPTY_COLLECTION : { type: "FeatureCollection", features });
    if (legendElement) legendElement.hidden = drawingOrEditing || features.length === 0;
  };

  const runAnalysis = async (requestedRevision) => {
    const roads = draw.getAll().features.filter((feature) => feature.geometry?.type === "LineString");
    if (!roads.length) {
      analyses.clear();
      lastSuccessfulGeometry = "";
      render();
      hideStatus(statusElement);
      return;
    }

    const geometrySignature = JSON.stringify(roads.map((road) => [road.id, road.geometry.coordinates]));
    if (geometrySignature === lastSuccessfulGeometry) {
      render();
      hideStatus(statusElement);
      return;
    }

    showStatus(statusElement, "Estimating cut and fill…");
    try {
      const results = await Promise.all(roads.map((road) => analyseRoadEarthworks({
        id: String(road.id),
        coordinates: road.geometry.coordinates,
        terrainProvider,
        spacingMetres: 5,
        balanceToleranceMetres: 0.5,
      })));

      if (requestedRevision !== revision) return;
      analyses.clear();
      results.forEach((analysis) => analyses.set(analysis.roadId, analysis));
      lastSuccessfulGeometry = geometrySignature;
      render();
      hideStatus(statusElement);
    } catch (error) {
      if (requestedRevision !== revision) return;
      analyses.clear();
      render();
      showStatus(statusElement, `Cut/fill estimate unavailable: ${error.message}`, true);
    }
  };

  const scheduleAnalysis = (delay = 350) => {
    revision += 1;
    const requestedRevision = revision;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => runAnalysis(requestedRevision), delay);
  };

  if (map.isStyleLoaded()) ensureMapLayer();
  else map.once("load", ensureMapLayer);

  map.on("style.load", () => {
    ensureMapLayer();
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

  scheduleAnalysis(0);
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
