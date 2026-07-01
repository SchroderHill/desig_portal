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

## Road terrain estimate

Completed road lines are sampled against Mapbox Terrain-RGB at approximately
5 m spacing. Green sections indicate estimated cut, orange sections estimated
fill, and grey sections are within 0.5 m of the straight formation between
drawn vertices. This display is a DEM-based indication only; it does not alter
the drawn/exported road geometry or calculate earthwork volumes.
