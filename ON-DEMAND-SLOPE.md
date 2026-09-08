# Desktop on-demand LiDAR trial — Kenningtons

This is a local desktop prototype on `slope-lidar`, not a nationwide production service.
The existing Terraces reference assets remain unchanged. The default slope loader now
uses a local Python service to fetch native 1 m elevation windows from public LINZ
Topo50 sheet BQ28. **View LiDAR test area** centres the map on Kenningtons.

## Run

Requires Python with `server/requirements.txt` installed, plus the existing Node tooling.

```powershell
npm ci --ignore-scripts
npm run build
python server/desktop.py --port 4174
```

Open http://127.0.0.1:4174/?revision=on-demand#16.5/-41.39999/173.83228/0/0
and turn on **Slope >35°**. Do not open `index.html` using `file://` or the old
static preview server: they cannot perform on-demand analysis. Keep the Python
process running. The server binds only to this computer, not phones or the LAN.

## Method and bounds

- Fixed source: https://nz-elevation.s3-ap-southeast-2.amazonaws.com/new-zealand/new-zealand/dem_1m/2193/BQ28.json
- Native aligned EPSG:2193 cells; no zoom-dependent resampling.
- Horn 3x3 slope in degrees, strict `>35`, one-cell halo at cache boundaries.
- Missing elevation in any 3x3 neighbour remains unknown, never flat.
- Each 512 m tile contains a two-bit classification grid and unsimplified polygons
  from those same cells. Road metres use the grid, not screen pixels or simplified geometry.
- The local service prepares viewport tiles and tiles surrounding road segments,
  capped at 24 per request. Zoom out too far or add widely separated roads and it
  asks you to zoom in/use fewer roads; it does not silently lower the resolution.
- Automatic loading is currently limited to BQ28. Other forests need a reviewed
  source configuration. Areas without LiDAR remain unknown.
- Derived tiles are cached in the OS temporary directory under
  `design-portal-slope-cache`, outside this OneDrive repository. Cache keys include
  the source checksum and algorithm version. Browser memory retains up to 48 tiles.
- The server requires same-origin loopback requests and does not serve source code,
  git metadata, directory listings, or local reference files. No forest files are uploaded.

First use needs internet for the catalogue and uncached windows; a service restart
also rechecks the catalogue, so this is not yet a guaranteed offline workflow.
Requests are serialized. The UI has a three-minute timeout; prepared tiles survive
for a retry. National discovery, progress/cancellation, disk-cache eviction and
full offline operation remain future work.

## Validation — 8 September 2026

Read-only reference: `D:/1A Documents/Forest/M&R_Kenningtons Road/layers/Clipped_slope.tif`.
The forest-map QA checks preserved native 1 m resolution, degree units, strict
35-degree classification and NoData. No QGIS source or final map was changed.

Four tiles, columns 3260–3261 / rows 8951–8952, were downloaded into a new empty
derived cache. Of 833,601 cells valid in both datasets, 833,593 agreed:
**99.9990403% agreement**. All eight differing reference values lie between
34.9995422 and 35.0004005 degrees. This demonstrates close numerical consistency
near the threshold, not independent survey/ground-truth accuracy. Exact cause of
the tiny differences (source encoding and/or numerical precision) is not established.

Measured service preparation: 3.436 seconds for four uncached derived tiles,
0.001 seconds on immediate disk-cache repeat; gzip payload 948,661 bytes.
Repeat fresh-cache run: 3.442 seconds. These are this machine/network's timings,
not a cold-OS-network-cache guarantee and not end-to-end browser render latency.

Browser checks: red polygons visible before drawing; test road reported 149 m
above 35 degrees / 285 m total; popup closed and reopened by road click; slope
off/on retained the same result. Initial six-tile viewport preparation displayed
3.4 seconds (one cached tile), and adding the test road prepared 12 tiles in
5.1 seconds (six cached). The road is a disposable test transect, not a surveyed road.

Automated checks: 51 JavaScript tests and eight Python tests passed; production
build passed. Existing GeoPDF, KML, terrain, earthworks and popup tests still pass.
Not every feature was manually retested. Earthworks remains separately labelled
as a Mapbox estimate; LiDAR slope is not a LiDAR earthworks-volume calculation.

```powershell
npm test
python -m unittest discover -s server -p 'test_*.py'
python server/validate_kenningtons.py --reference 'D:/1A Documents/Forest/M&R_Kenningtons Road/layers/Clipped_slope.tif'
```

Dependency installation reported seven existing npm audit findings (two moderate,
four high, one critical). Dependency remediation has not been included in this
terrain trial. Do not expose this development server publicly.
