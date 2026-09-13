# Design Portal export plan

## Agreed priorities

1. Usable road and pad geometry.
2. The user's original map with their design overlaid.
3. Slope polygons derived from calculated slope classes.
4. Optional LINZ elevation DEM; its failure must never prevent the core export.

Both Download locally and Send to Schroder Hill use the same package builder. Implementation has not started. Keep export development on a separate branch based on the agreed road styling work; do not publish unfinished export work to production.

## User flow

- Open Export. Use the imported PDF automatically when there is one; ask which PDF when several are loaded. Require a map for the complete map-based package, while allowing geometry-only local download when no PDF is loaded.
- Include roads and pads within the selected map. Offer slope polygons and slope shading on the map, plus an optional DEM. Clearly distinguish a downloadable geometry layer from visual shading.
- Choose Download locally or Send to Schroder Hill.
- For sending, reuse Skid Builder's contact/job form structure and validation after inspecting the exact fields. Give Design Portal its own submission identity and delivery configuration.
- Show preparation and upload progress. Explain missing coverage or omitted optional files. Only confirm Sent when the package and form details have been durably accepted; provide a submission reference.
- Preserve entered details after failure and offer retry. Reuse the same reference on retry to prevent duplicate submissions where supported.

## Package contract

### Core: geometry and map

- `design.gpkg`: separate roads and pads layers in NZTM2000 / EPSG:2193, with stable IDs, names, and appropriate length/area fields. Retain full-feature IDs when clipping creates multiple parts. Recalculate exported geometry measurements after clipping. Label any full-road or estimated terrain measurements distinctly.
- `design-map.pdf`: annotate the retained original PDF, preserving its page layout, title, legend and margins. Clip overlays to its georeferenced map panel; keep cut/fill symbology and readable road labels. Preserve other document pages. Initially annotate the same imported page/panel supported by the importer; do not imply unsupported multi-panel editing.
- Preserve and verify original PDF georeferencing where supported. If a source cannot be round-tripped reliably, explicitly report the limitation rather than mark the exported PDF georeferenced.
- `project.json` and a short readme: submission reference, map identity, CRS, form details when supplied, export options, source/algorithm versions, included files and coverage/omission notes.

### Slope

- Add a steep-slope layer to the GeoPackage using existing packed class cells: 2 means greater than 35 degrees; 1 means valid ground at or below 35 degrees; 0 means unknown.
- Do not download elevation again solely to polygonize existing completed classes. If requested slope results are not prepared, explain that processing is required and allow the user to wait or explicitly export without slope.
- Trace cells in a worker, preserving islands, holes and tile boundaries without a polygon per pixel or silent smoothing. Export coverage information so unknown terrain cannot be mistaken for gentle terrain.
- Do not describe a finished processing job as full data coverage.

### Optional DEM

- Export a clipped, georeferenced elevation GeoTIFF in EPSG:2193 with explicit NoData outside the map footprint and in uncovered cells. Keep native elevation values; slope classes are not elevation.
- Reuse the LINZ window-reading code. Read elevations again where necessary because the slope cache stores classes, not DEM pixels.
- Allow DEM cancellation/omission without discarding the core package. Record omissions and reasons. Avoid generating an unbounded in-memory raster for unusually large maps.

## Geometry and consistency

- Retain the original PDF File, imported page and viewport, rotation, map corners and forward/inverse PDF-to-world transforms at import.
- Use the actual georeferenced map footprint as the common clip for map overlays, vectors, slope and DEM. The current axis-aligned bounds are insufficient for rotated maps.
- Freeze the selected PDF, roads/pads and slope revision when export begins. Editing or changing maps during preparation must not mix revisions in one package.
- Add a supported slope-export snapshot interface; do not reach into controller-private state.

## Delivery to Schroder Hill

- Reuse Skid Builder's form experience, not its upload-size assumption. Its code caps multipart submission at 7.5 MiB; this portal accepts source PDFs up to 35 MB. Its existing ZIP writer does not compress entries.
- Before selecting a delivery mechanism, measure representative core packages and verify current provider limits. Prove secure large-file upload and downloadable package delivery for at least a maximum-size accepted PDF plus its design layers. If a separate storage service is required, select it explicitly with its access, retention and cost implications before provisioning.
- Prefer a stored package and download link over a large email attachment. Keep private uploads protected, validate type/size server-side, and keep credentials out of browser code. Never silently lose files to fit a submission limit.
- Use a dedicated form/submission type such as `design-portal-submission`. Send a new email for each job, with a unique subject such as `Design Portal — Rams Head — DP-<unique reference>`. Never reply to a Skid Builder thread. Do not reuse a fixed subject for every job.
- Verify the recipient and notification configuration rather than infer an address. Test actual receipt and threading with user-authorized test submissions. Distinguish accepted upload from verified notification delivery.

## Build sequence and gates

1. **Foundation and delivery feasibility:** inspect exact Skid Builder form/export code; retain PDF metadata, implement the shared footprint and export snapshot, and establish the large-file delivery route. Confirm GeoPackage writing with a small valid file that opens in QGIS.
2. **First usable milestone — lines and map:** local ZIP with clipped roads/pads, annotated original PDF and metadata. Verify rotated alignment and labels. This is the highest-priority deliverable.
3. **Slope polygons:** worker tracing, hole/seam/NoData handling and optional map shading, with a clear wait/omit flow when results are incomplete.
4. **Send to Schroder Hill:** connect the shared package to the form, storage and separate job emails. Verify a representative large upload, retry behavior and receipt before marking sending complete.
5. **Optional DEM:** add native elevation export after the core files and delivery work. Keep failures independent.
6. **Release:** test the complete user flow on Netlify preview, then merge/publish only after acceptance. Detailed visual comparison against Rams Head can be performed by the user; basic export alignment and geometry validity remain required before release.

## Acceptance checks

- Roads/pads open in QGIS at the correct location with useful attributes and correct clipped lengths/areas.
- Annotated PDF retains the original layout; overlays align on rotated maps and remain within the map panel. Check georeferencing independently.
- Slope polygons preserve holes/islands and tile seams; exported unknown coverage is explicit.
- A single export never mixes geometry or slope from different map revisions.
- Download and submission contain equivalent core files. Selecting a different PDF does not export unrelated geometry.
- Two authorized Design Portal submissions arrive as separate job emails, separate from Skid Builder, with usable package links.
- Large packages and failed uploads produce recoverable states; no false Sent confirmation.
- Missing or failed DEM never blocks the core files.

## Definition of ready to implement

The product scope and priorities are settled. GeoPackage generation, PDF transform retention and large-file delivery are implementation gates, not capabilities already present. Begin with the foundation and lines/map milestone; do not quietly replace the agreed formats or weaken the delivery requirement.
