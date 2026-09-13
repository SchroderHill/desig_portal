# Slope reassessment — 8 September 2026

Historical diagnosis before implementation. The follow-up national source-selection
change and its 9 September validation are documented in ON-DEMAND-SLOPE.md.

Assessment of 22e3f63, compared with 8d1e311 and the static Terraces baseline e02f801. No implementation changes, branch resets, terrain downloads, or pushes were made. The original service on port 4174 was not changed.

## User-visible problem

The user reports a warning that they are outside the test area. The current default loader always uses the BQ28 LINZ DEM. Loading a GeoPDF restricts the permitted analysis area; it does not select an appropriate DEM. This is a single-sheet trial, not a general forest-map workflow.

The public BQ28 catalogue was read with TLS verification enabled. Its bounding box is [173.715274, -41.4953737, 174.0063253, -41.1689895]. The coverage navigation endpoint returns a smaller Kenningtons demonstration rectangle, whereas the warning uses the actual source bounding box. These are different concepts presented through one test-area message.

The supplied latest URL centre (173.83281, -41.39893) is inside BQ28. Therefore source restriction explains the reproducible failure at other forests, but does not establish why that exact view would show the warning. The user's current forest/view and loaded build remain to be confirmed. No end-to-end browser or actual GeoPDF import was performed in this assessment.

## Reproduced findings

Follow-up: the user identified Rams Head as the affected forest. Local Ramshead files include `layers/Clipped_DEM.tif`, `layers/Clipped_Slope.tif` and downloaded LINZ BR27/BR28 rasters. Read-only inspection of the clipped DEM confirms that its geographic bounds do not overlap BQ28. This establishes the source-selection limitation as the explanation for the Rams Head warning; the prior Kenningtons URL was not the affected forest.

1. A small Terraces view, west/east 173.446/173.448 and south/north -41.650/-41.648, requests one tile but returns zero against the verified BQ28 bounds. This was reproduced with the real service preparation code, injecting the catalogue bounds to avoid downloading elevation. The actual controller summary function then produces `Outside trial coverage. Use View LiDAR test area.`
2. The full Kenningtons demonstration rectangle selects exactly 24 tiles, already at the request cap. The preserved Terraces manifest extent triggers the 24-tile rejection. The selector applies its cap before source-coverage filtering, so a broad unsupported area can produce a zoom warning instead of a coverage explanation.
3. In a controller harness with simulated map events and loader responses, a valid 50 m steep-road summary disappears after a pan whose loader request fails with the tile-limit error. The real controller sets both overlay and road analysis to null. This confirms failure-state coupling, not a change in the underlying numerical measurement.
4. All 10 existing Python tests pass. They do not establish usable GeoPDF-to-slope behaviour. JavaScript suite/build were not rerun: this isolated checkout has no node_modules. The targeted controller harness ran with Node and substituted only its external popup dependency and map/loader interfaces.

## Comparison and recommendation

The earlier baseline loads one fixed Terraces classification and polygon package into memory. Panning filters that dataset; it does not require a new server job. Commit 8d1e311 replaced the default data source with on-demand BQ28 processing. Commit 22e3f63 added analysis-area restrictions but did not add source discovery. The original Terraces assets, grid measurement code and popup module remain available.

Retain the native 1 m classification, strict >35 threshold, Horn halo/NoData handling, grid-based road intersection measurements, closable/reopenable popups and GeoPDF/manual-area rules. Retain the validated Terraces package as a regression reference. Its reported agreement is representation/numerical validation, not field accuracy. Keep Mapbox earthworks separate from LiDAR slope.

Rebuild source selection first: resolve available DEM sources intersecting the union of loaded GeoPDF rectangles, or the explicitly fixed manual area. Distinguish unsupported source configuration, missing elevation and outside permitted area. Do not direct the user away from their forest as the normal recovery path. Restoring the Terraces loader alone would only exchange one geographic limitation for another.

Simplify loading around a persistent tile dataset. Schedule bounded batches for visible permitted tiles plus all permitted road portions, with road measurements independent of viewport success. Preserve valid road results on unrelated view errors; invalidate them on geometry, area or source changes. Superseded work should be cancellable or deprioritized, with visible progress. A 24-tile batch limit can remain a resource control without becoming a whole-workflow limit.

Avoid redesigning the numerical core now. Unsimplified GeoJSON and area-specific polygon regeneration are plausible costs, but end-to-end timings were not measured here. Profile representative loaded maps before choosing another overlay representation; any display optimization must preserve classification-based road calculations.

## Acceptance before implementing further features

Use the user's actual GeoPDF and confirm its source coverage. Then exercise import, shading before drawing, road creation, close/reopen popup, pan/zoom, rapid movement during loading, view-request failure, PDF add/remove and disjoint PDFs. Verify road totals remain unchanged when geometry/area/source are unchanged, unknown lengths remain explicit, and removing the final PDF clears manual selection. Check outside-BQ28 behaviour deliberately. Record browser render and loading timings separately from server preparation times.
