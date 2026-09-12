# Netlify production and slope delivery plan

## Release structure

- Netlify project: `designportal1`
- Stable site address: `https://designportal1.netlify.app`
- Production branch: `main`
- Feature and acceptance branch: `slope-lidar`
- Wix embeds the stable Netlify address. Releasing a preview never changes the Wix site.
- Netlify builds `site-dist/`, which contains only the files required by the browser. Source files, tests, Python services, and working data are excluded from the published site.

Every pull request and branch deployment is an acceptance environment. Only a reviewed merge to `main` is a production release. Netlify retains immutable deployments so a previous production version can be restored quickly.

## Release checks

Before merging `slope-lidar` into `main`:

1. Run `npm test` and `npm run build:site`.
2. Open the Netlify deploy preview in a desktop browser and in the Wix iframe.
3. Import a GeoPDF and confirm its placement, opacity, zoom, removal, road drawing, pad drawing, and export.
4. Confirm middle-button panning works while drawing.
5. Confirm the slope control, progress display, compact road popup, and cancellation behaviour.
6. Test Rams Head plus at least one map in another LINZ DEM grid area.
7. Merge to `main`, inspect the production deployment, and then leave the Wix iframe on the stable Netlify address.

## Browser-based national slope architecture

The production slope tool will read LINZ 1 m DEM cloud-optimised GeoTIFF windows directly in the browser. Work is split into small tiles and processed in a Web Worker so map interaction stays responsive.

The browser pipeline will:

1. Resolve every imported map extent against the versioned LINZ DEM catalogue.
2. Request only the byte ranges needed for each DEM tile, including the one-cell neighbouring halo required for correct edge slopes.
3. Calculate the 35-degree mask with the same Horn 3-by-3 method used by the validated Python reference.
4. Render slope tiles incrementally and calculate road intersections as tiles become available.
5. Cache results in IndexedDB using dataset, source revision, grid cell, resolution, and threshold as the cache key.
6. Cancel obsolete work when a map is removed or the analysis is restarted, while keeping completed cache entries.
7. Report uncovered DEM cells as unavailable data rather than classifying them as flat ground.

Large maps remain valid inputs. Processing is queued in visible-first chunks, with the road corridor prioritised ahead of the rest of the imported extent. This avoids arbitrary test areas while keeping the first useful result quick.

## Migration stages

### 1. Netlify foundation

Connect `designportal1` to `SchroderHill/desig_portal`, set `main` as production, and enable branch and pull-request previews. Keep the stable Netlify address in Wix.

### 2. Browser feasibility gate

Prove LINZ cross-origin byte-range access, GeoTIFF decoding, memory use, cancellation, and IndexedDB caching at Rams Head and a second region. Compare slope masks and road metres against the existing Python reference.

### 3. Production implementation

Move catalogue lookup, DEM window reads, slope calculation, incremental rendering, and road statistics into a Web Worker. Keep the UI independent of the processing engine so the validated Python loader can remain available during comparison.

### 4. Acceptance and cutover

Meet the same numerical results within documented raster-edge tolerances, validate several North and South Island datasets, and test inside Wix. Then select the browser loader in production and remove the Python deployment requirement.

## Operating rules

- `main` is always deployable.
- Slope work reaches production only after its Netlify preview passes the release checks.
- The LINZ catalogue is versioned in Git so results are reproducible.
- Errors identify the missing source or failed tile and offer retry without losing completed work.
- The user never selects a special test area; the imported GeoPDF extent defines the analysis area.
