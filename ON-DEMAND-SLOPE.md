# On-demand LINZ DEM slope analysis

The desktop portal now discovers the appropriate sources from LINZ's national
1 m DEM collection for any supported New Zealand GeoPDF or fixed manual area.
It no longer requires a configured forest or a visit to the Kenningtons test area.
Supported coordinates are 166–180 degrees east, 48–33 degrees south; overseas
maps are not supported by this LINZ/NZTM pipeline. Missing elevation is unknown.

## Run

Install the locked JavaScript dependencies and `server/requirements.txt`, then:

```powershell
npm run build
python server/desktop.py --port 4176
```

Open http://127.0.0.1:4176/ and import a GeoPDF, then enable **Slope >35°**.
Without a PDF, explicitly click **Use this view as slope area** before enabling
slope. The Python server must stay running. Static hosting cannot run this service.
The reassessment used port 4176 to leave the original build on 4174 untouched.

## Source selection and calculation

- The service rechecks the official national STAC collection on startup. A small
  bundled source index (424 items when refreshed on 9 September 2026) avoids
  fetching every item's metadata on first use. Item checksums determine reuse;
  new or changed catalogue items are fetched automatically. No forest names or
  project directories participate in source selection.
- `python scripts/update-linz-index.py` refreshes that metadata snapshot. The
  snapshot contains source locations, bounds and checksums, not terrain pixels.
- Only selected 512 m working tiles are read from the intersecting public LINZ
  Cloud Optimized GeoTIFFs. Adjacent source sheets supply the one-cell halo.
  Elevations are mosaicked before Horn 3x3 slope calculation, at native aligned
  EPSG:2193 1 m resolution. Missing neighbours remain unknown; no resampling or
  Mapbox fallback is used. Classification is strictly greater than 35 degrees.
- The existing hillshade is shaded PNG imagery, not elevation. It remains a
  separate display. Mapbox 3D terrain and earthworks estimates are also separate.
- The classified two-bit grid supplies both unsimplified overlay polygons and
  road measurements. Lengths are horizontal model estimates, not survey results.

## Extent, loading and limits

Loaded GeoPDF geographic bounding rectangles form a union without filling gaps;
visibility switches do not change permission. View tiles and off-screen road
segments are intersected with that union. With no PDF, the manual rectangle is
fixed until explicitly replaced. Removing the last PDF clears selection.

Downloads are quantized to source COG blocks and 512 m tiles with a one-cell halo.
Reported coverage is masked to the permitted area by 1 m cell centres. The
geographic extent is not an inferred forest boundary.

Preparation is serial with per-tile progress. Superseded requests are cancelled
between tiles (an in-progress native read may finish first). The loader waits for
an occupied slot and uses a 15-minute preparation timeout. Metadata requests have
bounded retries with TLS verification. Network errors are errors, not no-coverage
results. Completed unchanged-road measurements survive unrelated view failures.

A request may contain up to 1024 native tiles, 100 roads and 100 km of road length.
Larger requests produce an explicit resource-limit error and require a smaller
view or road set; resolution is never silently reduced. Large polygon overlays
still require significant browser memory. This supports arbitrary covered
locations, not unbounded whole-country analysis in one view.

Derived raw and extent-masked tiles are cached in the OS temporary directory
`design-portal-slope-cache`. Cache identity includes catalogue source checksums
and algorithm version. Browser LRU holds up to 48 tiles between requests, in
addition to the dataset needed for the active view and roads. There is no disk
cache eviction yet. Restart needs a successful catalogue check; offline use is
not guaranteed. The service binds only to loopback and does not upload forest
files or serve project source code. Nothing has been pushed or published.

## Validation — 9 September 2026

`python scripts/check-national-slope.py` streamed small elevation windows using
normal discovery at Rams Head (BR28), Terraces (BR27), Kenningtons (BQ28) and
Auckland (BA32). All returned valid classified cells. Indexed startup took about
0.5 seconds; small-window preparation took 0.7–1.4 seconds on this run. See
`national-slope-validation.json` for sample counts and timings.

At Rams Head, 9,238 of 9,239 common valid cells agreed with the existing local
Clipped_Slope.tif >35-degree classification. The discrepancy was not investigated
further; this is numerical consistency evidence, not independent field accuracy.
No local DEM, slope raster, QGIS project or final forest map was modified.

Browser QA imported RamsheadHP_Imagery20260804.pdf into the isolated build.
Shading appeared before drawing. Its full extent prepared 38 tiles in 33.2 seconds
(one raw tile cached); subsequent views reused cache. A disposable road reported
122 m >35 degrees / 446 m total, unchanged after pan and zoom. Its popup closed
and reopened by clicking the road. Removing the final GeoPDF cleared the area and
invalidated slope results. Mapbox earthworks remained separately labelled.

Automated checks cover source discovery/cache changes, catalogue failures,
adjacent-sheet mosaicking before slope, unknown neighbours, disjoint extents,
roads outside view, progress/cancellation and preservation of road measurements
on view errors, plus the existing numerical/GeoPDF/road tests.
All 56 JavaScript tests and 18 Python tests passed, and the production build
succeeded after the final changes.

```powershell
npm test
python -m unittest discover -s server -p 'test_*.py'
npm run build
```

The previous Terraces numerical baseline is retained in LIDAR-SLOPE.md and its
unchanged data package. Existing dependency security findings were not remediated
as part of this source-selection change.
