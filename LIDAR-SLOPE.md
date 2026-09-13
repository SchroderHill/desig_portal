# LiDAR slope analysis

Implemented on `slope-lidar`. The Slope >35 degree overlay and road metres now use one fixed 1 m classification from the Terraces reference slope raster. There is no Mapbox fallback for this feature. Existing road grade and earthworks estimates still use Mapbox and are separately labelled.

## Coverage and use

Choose **View Terraces LiDAR**, then **Slope >35 degrees**. Draw a road or select an existing one to see its steep metres and total length. Close popups with the cross; reopen by selecting the road. Partial/no-coverage road lengths are explicitly reported as unassessed. Coverage presently includes Terraces only, not all of New Zealand. Missing data must not be interpreted as safe or flat ground.

The packaged forest is near longitude 173.447, not the earlier browser demonstration at longitude 173.745. The coverage button deliberately changes only the view; it does not move any roads or imported maps.

## Source and method

Source: `D:/1A Documents/Forest/Edridge_Terraces/Layers/Clipped_sLOPE.tif`, EPSG:2193, 1 m grid. The prior audit independently reproduced its degree slopes from `Clipped_DEM.tif` using the Horn derivative. Source hash, bounds, threshold, class counts and provenance are in `data/slope/terraces/manifest.json`.

Classes are 0 = unknown, 1 = at most 35 degrees, 2 = strictly over 35 degrees, packed as four two-bit cells per byte in row-major order. Raster values are classified before any geometry reprojection. All steep connected polygons, holes and boundaries are preserved, without simplification, in gzip-compressed WGS84 GeoJSON. Mapbox GeoJSON simplification is disabled. Only polygons intersecting the viewport bounding box are sent to the map; classification never changes with zoom.

Roads are densified into <=20 m geographic chords, projected to NZTM, and split at every 1 m raster grid crossing. Each sub-length is assigned to its actual class cell, including NoData. Distances use the portal's existing horizontal spherical-distance convention, not slope-surface length. Other roads and viewport bounds cannot shift this grid. This is an estimate based on a 1 m model, not a claim of metre-level surveyed accuracy.

The first load downloads approximately 10.1 MB of classification and compressed overlay data. Assets are cached in memory after loading and revalidated on a new page load. A current browser with gzip DecompressionStream support is required. No service or GIS server is required; deploy the `data/` directory alongside `index.html` and `geopdf-dist/`. Do not omit the binary or gzip assets from hosting.

## Validation

Packaging checked all 10,059,188 cells. There are 6,965,619 valid cells, including 1,781,394 steep cells. Unpacking reproduces the classification exactly; rasterizing the unsimplified overlay reproduces the steep mask with zero differing pixels. This is representation consistency against the reference, not independent field validation.

Five geographic test transects were independently sampled against the original raster at <=5 cm intervals. New road-grid intersection results differ by at most 0.158 m in steep length:

| Test | New steep metres | Independent reference metres | Unassessed metres |
|---|---:|---:|---:|
| East-west | 478.938 | 478.848 | 0 |
| North-south | 626.965 | 627.000 | 0 |
| Diagonal | 842.485 | 842.643 | 0 |
| Partial coverage | 138.692 | 138.798 | 634.593 |
| Outside coverage | 0 | 0 | 199.558 |

Tests also cover reversing roads, partial cells, zero-length geometry, failed-load retry, unavailable data, invariance to viewport/other roads, startup, drawing, toggling and actual gzip asset loading. Browser QA confirmed overlay loading before drawing and a road popup of 135 m >35 degrees / 309 m total, with dismissal/reopening.

## Reproduce and extend

Run `python scripts/package-lidar-slope.py <approved-slope.tif> <output-directory>` using Python with numpy, rasterio and pyproj. The packager intentionally requires a 1 m EPSG:2193 degree-slope raster; do not feed it an elevation DEM or percent-grade raster. Run `python scripts/validate-lidar-roads.py` to rebuild the Terraces-specific reference fixtures when its original raster is available. Run `npm test` and `npm run build` before release.

Adding other forests requires an approved source and additional dataset-selection/coverage handling; it is not automatic. Do not overwrite Terraces assets with another forest without updating provenance, tests and the portal configuration. QGIS projects, original DEMs and final map PDFs are not modified by this workflow.
