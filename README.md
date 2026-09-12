# design_Portal
draft design portal for roadeng quotes and design

## GeoPDF importer

The portal loads the built GeoPDF importer from `geopdf-dist/` so the existing
static deployment remains unchanged. Parser source lives in `src/` and supports
the QGIS, ArcGIS, and LGIDict metadata variants covered by `tests/geopdf.test.js`.

After changing the importer:

```powershell
npm test
npm run build
```

Commit the regenerated `geopdf-dist/` files with the source changes.

## Deployment

Netlify builds the browser-only production bundle with `npm run build:site` and
publishes `site-dist/`. See [NETLIFY-DEPLOYMENT.md](NETLIFY-DEPLOYMENT.md) for the
production, preview, and national browser-slope release plan.

## Road terrain estimate

Completed road lines are sampled against Mapbox Terrain-RGB at approximately
5 m spacing. Green sections indicate estimated cut, orange sections estimated
fill, and grey sections are within 0.5 m of the straight formation between
drawn vertices. This display is a DEM-based indication only; it does not alter
the drawn/exported road geometry or calculate earthwork volumes.

## Terrain steeper than 35 degrees

Use **Slope >35°** after drawing a road to analyse a 75 m corridor around the
road against Mapbox Terrain-RGB. Terrain cells steeper than 35 degrees are shown
as translucent red polygons. The sidebar reports the approximate length and
percentage of road crossing those cells, plus the red terrain area. The grid is
normally about 20 m and automatically becomes coarser for very long roads to
keep the browser calculation bounded. Treat the result as a DEM-based costing
screen rather than a survey or final earthworks design.
