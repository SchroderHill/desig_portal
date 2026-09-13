# Fix slope analysis on Netlify

Branch: `fix-slope-issue`, created from `main` at `410c58c`.

## Confirmed cause

`src/steep-slope-controller.js` defaults to `createOnDemandSlopeLoader()`.
That loader calls `/api/slope/coverage`, `/prepare`, `/jobs`, and `/tiles`.
Those endpoints belong to the local Python service and are absent from the static Netlify deployment. The loader turns a non-JSON response into the desktop-server error shown in production. Changing that message or a redirect alone will not restore analysis.

## Intended result

Import a georeferenced map, enable slope, and see terrain steeper than 35 degrees and road lengths within it without running desktop software. Use the imported extent automatically. Support arbitrary New Zealand locations where LINZ elevation coverage exists; maps outside that coverage must report unavailable data clearly. Never interpret missing or unfinished data as flat terrain.

Keep the existing right-hand control, compact road popup, and middle-button drawing pan. Hillshade remains a visual aid; numerical slope and road measurements use elevation pixels.

## Implementation sequence

1. **Prove direct data access before committing to the architecture.** Use the existing LINZ national catalogue and representative DEM assets at Rams Head and a second region. From a Netlify preview, verify cross-origin byte-range responses, TIFF compression support, native 1 m window reads, source projection, and cancellation. Measure bytes, elapsed time, and peak memory. Prevent accidental full-file downloads. If direct reads fail, document the precise restriction and evaluate a narrowly scoped range proxy; do not assume Netlify hosting alone supplies GIS processing.
2. **Build a browser loader behind the existing loader interface.** Publish a compact, versioned source index derived from `server/linz-dem-index.json`. Read intersecting COG windows in a Web Worker using an evaluated GeoTIFF reader and the existing projection library. Retain Python as the numerical reference. Reuse the existing grid and road-analysis contracts rather than rewrite the whole UI.
3. **Port the calculation with parity checks.** Preserve native aligned 1 m cells, Horn 3-by-3 calculation, threshold semantics, nodata handling, dataset overlap rules, and neighbouring cells across source/tile seams. Compare masks and road metres against Python fixtures before connecting the production control. Document boundary tolerances rather than silently loosening them.
4. **Make large extents practical.** Process bounded tiles, prioritising visible terrain and road corridors. Render completed tiles incrementally. Limit concurrent reads and memory, cancel obsolete requests, and persist reusable results in IndexedDB with source revision and algorithm parameters in cache keys. Handle storage quota failures without losing the current session. Replace the current 1024-tile rejection with a bounded queue rather than allocating the entire extent at once.
5. **Connect the user experience.** Select the browser loader for Netlify. Show concise loading, partial coverage, retry, and completion states. Automatically scope analysis to imported maps; map removal and replacement must cancel stale work. Road figures must distinguish complete from partial results. Remove the instruction to start a Python server once browser processing works.
6. **Validate a deployed preview, then release.** Use a pull-request preview for this branch: current branch deployment settings only include `slope-lidar`. Test Rams Head, the map in the reported failure, additional North and South Island sources, tile seams, no coverage, offline/retry, cancellation, repeat cached loads, and a large extent. Check drawing/panning, import/removal and export regressions. Run the full tests and production build. Merge to `main` only after real DEM reads, slope shading, and road statistics work on Netlify. Verify production after publication.

## Acceptance evidence

- A deployed preview performs real analysis with no `/api/slope/*` or localhost dependency.
- Representative numerical fixtures agree with the Python reference; edge tolerances are recorded.
- Partial coverage and unfinished tiles cannot produce misleading completed road totals.
- Large imported maps remain responsive with bounded memory and cancellable work.
- Repeat loads reuse cached results; source changes invalidate affected cache entries.
- Record measured cold/warm timings, bytes, and memory with browser/device details before release.

## Scope and release policy

The next deliverable is the deployed direct-read feasibility proof, followed by the browser implementation if that gate passes. No Wix migration work is required for this fix. Production remains on `main` while this branch is developed. Update `NETLIFY-DEPLOYMENT.md` with measured findings and the final architecture at cutover.
