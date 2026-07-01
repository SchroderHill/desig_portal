import { parseGeoPdf } from "./geopdf.js";
import { initialiseRoadEarthworks } from "./road-earthworks-controller.js";

const portal = window.designPortal ?? window.designPortalGeoPdf;
const map = portal?.map;
const draw = portal?.draw;
const addButton = document.querySelector("#add-geopdf");
const fileInput = document.querySelector("#geopdf-file");
const statusElement = document.querySelector("#geopdf-status");
const layersList = document.querySelector("#layers-list");
const overlays = new Map();

if (map && draw) {
  initialiseRoadEarthworks({
    map,
    draw,
    accessToken: window.mapboxgl?.accessToken,
    legendElement: document.querySelector("#earthworks-legend"),
    statusElement: document.querySelector("#road-analysis-status"),
  });
}

if (!map || !addButton || !fileInput || !statusElement || !layersList) {
  console.error("GeoPDF importer could not find its Design Portal controls or map bridge.");
} else {
  initialiseGeoPdfImporter();
}

function initialiseGeoPdfImporter() {
  addButton.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleFileSelection);
  map.on("style.load", restoreOverlaysAfterStyleChange);
}

async function handleFileSelection(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  addButton.disabled = true;
  setStatus(`Importing ${file.name}…`, "loading");

  try {
    const parsed = await parseGeoPdf(file);
    const overlay = {
      id: createOverlayId(),
      name: file.name,
      visible: true,
      opacity: 0.65,
      ...parsed,
    };

    overlays.set(overlay.id, overlay);
    await waitForMapStyle();
    addOverlayToMap(overlay);
    addOverlayControls(overlay);
    zoomToOverlay(overlay);

    const pageNote = overlay.pageCount > 1 ? " Showing page 1." : "";
    const fitNote = overlay.fitWarning ? " Check alignment: the control-point fit is low confidence." : "";
    setStatus(`Imported ${file.name}.${pageNote}${fitNote}`, overlay.fitWarning ? "warning" : "success");
  } catch (error) {
    setStatus(`Could not import ${file.name}: ${error.message}`, "error");
  } finally {
    addButton.disabled = false;
    fileInput.value = "";
  }
}

function createOverlayId() {
  if (globalThis.crypto?.randomUUID) return `geopdf-${globalThis.crypto.randomUUID()}`;
  return `geopdf-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sourceId(overlay) {
  return `${overlay.id}-source`;
}

function layerId(overlay) {
  return `${overlay.id}-raster`;
}

function waitForMapStyle() {
  if (map.isStyleLoaded()) return Promise.resolve();
  return new Promise((resolve) => map.once("style.load", resolve));
}

function addOverlayToMap(overlay) {
  const source = sourceId(overlay);
  const layer = layerId(overlay);
  if (map.getSource(source)) return;

  map.addSource(source, {
    type: "image",
    url: overlay.imageDataUrl,
    coordinates: overlay.coordinates,
  });

  const beforeLayer = findFirstDesignLayer();
  map.addLayer({
    id: layer,
    type: "raster",
    source,
    paint: {
      "raster-opacity": overlay.visible ? overlay.opacity : 0,
      "raster-fade-duration": 0,
    },
  }, beforeLayer);
}

function findFirstDesignLayer() {
  const layers = map.getStyle()?.layers ?? [];
  return layers.find(({ id }) =>
    id.startsWith("gl-draw-")
    || id === "vertices"
    || id === "grade-labels"
    || id === "parcels-line"
  )?.id;
}

function restoreOverlaysAfterStyleChange() {
  overlays.forEach((overlay) => addOverlayToMap(overlay));
}

function addOverlayControls(overlay) {
  const item = document.createElement("div");
  item.className = "geopdf-layer";
  item.dataset.geopdfId = overlay.id;

  const heading = document.createElement("label");
  heading.className = "geopdf-layer-heading";
  const visibility = document.createElement("input");
  visibility.type = "checkbox";
  visibility.checked = true;
  visibility.className = "geopdf-visible";
  const name = document.createElement("span");
  name.textContent = overlay.name;
  name.title = overlay.name;
  heading.append(visibility, name);

  const opacityLabel = document.createElement("label");
  opacityLabel.className = "geopdf-opacity";
  const opacityText = document.createElement("span");
  opacityText.textContent = "Opacity";
  const opacity = document.createElement("input");
  opacity.type = "range";
  opacity.min = "0";
  opacity.max = "1";
  opacity.step = "0.05";
  opacity.value = String(overlay.opacity);
  opacityLabel.append(opacityText, opacity);

  const actions = document.createElement("div");
  actions.className = "geopdf-actions";
  const zoomButton = createActionButton("Zoom", () => zoomToOverlay(overlay));
  const removeButton = createActionButton("Remove", () => removeOverlay(overlay));
  actions.append(zoomButton, removeButton);

  const metadata = document.createElement("small");
  metadata.className = overlay.fitWarning ? "geopdf-meta geopdf-meta-warning" : "geopdf-meta";
  const fit = Number.isFinite(overlay.fitErrorMeters)
    ? ` · fit ${overlay.fitErrorMeters < 10 ? overlay.fitErrorMeters.toFixed(1) : Math.round(overlay.fitErrorMeters)} m`
    : "";
  metadata.textContent = `${overlay.crsLabel ?? "GeoPDF"}${fit}`;

  visibility.addEventListener("change", () => {
    overlay.visible = visibility.checked;
    updateOverlayOpacity(overlay);
  });
  opacity.addEventListener("input", () => {
    overlay.opacity = Number(opacity.value);
    updateOverlayOpacity(overlay);
  });

  item.append(heading, opacityLabel, actions, metadata);
  layersList.appendChild(item);
}

function createActionButton(label, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", handler);
  return button;
}

function updateOverlayOpacity(overlay) {
  const layer = layerId(overlay);
  if (map.getLayer(layer)) {
    map.setPaintProperty(layer, "raster-opacity", overlay.visible ? overlay.opacity : 0);
  }
}

function zoomToOverlay(overlay) {
  const { west, south, east, north } = overlay.boundsLngLat;
  map.fitBounds([[west, south], [east, north]], {
    padding: 40,
    duration: 900,
  });
}

function removeOverlay(overlay) {
  const layer = layerId(overlay);
  const source = sourceId(overlay);
  if (map.getLayer(layer)) map.removeLayer(layer);
  if (map.getSource(source)) map.removeSource(source);
  overlays.delete(overlay.id);
  document.querySelector(`[data-geopdf-id="${overlay.id}"]`)?.remove();
  setStatus(`Removed ${overlay.name}.`, "success");
}

function setStatus(message, state) {
  statusElement.textContent = message;
  statusElement.dataset.state = state;
}
