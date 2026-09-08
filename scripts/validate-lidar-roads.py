"""Independent dense reference sampling for integration-test road fixtures."""
import os, json
from pathlib import Path
import pyproj
os.environ['PROJ_DATA']=pyproj.datadir.get_data_dir()
os.environ['PROJ_LIB']=pyproj.datadir.get_data_dir()
import rasterio
import numpy as np
source=Path('D:/1A Documents/Forest/Edridge_Terraces/Layers/Clipped_sLOPE.tif')
forward=pyproj.Transformer.from_crs(2193,4326,always_xy=True)
reverse=pyproj.Transformer.from_crs(4326,2193,always_xy=True)
sphere=pyproj.Geod(a=6371008.8,b=6371008.8)
lines=[[(1636700,5389200),(1637900,5389200)],[(1637300,5388600),(1637300,5389800)],
       [(1636800,5388600),(1637800,5389800)],[(1635500,5389100),(1637000,5389100)],
       [(1635000,5389000),(1635200,5389000)]]
fixtures=[]
with rasterio.open(source) as ds:
    slope=ds.read(1,masked=True)
    for i,line in enumerate(lines):
        coordinates=[list(forward.transform(*p)) for p in line]
        a,b=np.array(coordinates)
        length=sphere.inv(*a,*b)[2]; steps=int(np.ceil(length/.05))
        # Sample every <=5 cm along the geographic line independently of portal grid traversal.
        fractions=(np.arange(steps)+.5)/steps
        coords=a[None,:]+fractions[:,None]*(b-a)[None,:]
        x,y=reverse.transform(coords[:,0],coords[:,1]); rows,cols=rasterio.transform.rowcol(ds.transform,x,y)
        rows=np.array(rows);cols=np.array(cols)
        valid=(rows>=0)&(cols>=0)&(rows<ds.height)&(cols<ds.width)
        values=np.full(steps,np.nan);values[valid]=slope.filled(np.nan)[rows[valid],cols[valid]]
        fixtures.append(dict(id=f'validation-{i+1}',geometry=dict(type='LineString',coordinates=coordinates),
            expectedSteepMetres=float(np.mean(values>35)*length),expectedUnknownMetres=float(np.mean(~np.isfinite(values))*length),expectedTotalMetres=length))
Path('tests/fixtures').mkdir(exist_ok=True)
Path('tests/fixtures/lidar-roads.json').write_text(json.dumps(fixtures,indent=2))
print(json.dumps(fixtures,indent=2))
