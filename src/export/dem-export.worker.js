import {writeArrayBuffer} from 'geotiff';
import sources from '../../server/linz-dem-index.json';
import {readElevationTile} from '../browser-slope-dem.js';
import {SIZE,TOP,areaRings,tilesForAreas,inside} from '../browser-slope-core.js';
self.onmessage=async({data:area})=>{
  try {
    const rings=areaRings([area]),points=rings.flat(),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
    const left=Math.floor(Math.min(...xs)),top=Math.ceil(Math.max(...ys)),width=Math.ceil(Math.max(...xs))-left,height=top-Math.floor(Math.min(...ys));
    if(width*height>25000000)throw Error('Optional DEM exceeds the 25 million cell browser limit; core files are still available.');
    const values=new Float32Array(width*height).fill(-9999);let n=0;
    for(const {column,row} of tilesForAreas(rings)) {
      self.postMessage({progress:`Reading DEM tile ${++n}…`});
      const dem=await readElevationTile(sources,column,row,AbortSignal.timeout(60000));
      for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++) {
        const px=column*SIZE+x,py=TOP-row*SIZE-y,dx=px-left,dy=top-py;
        if(dx<0||dy<0||dx>=width||dy>=height||!inside([px+.5,py-.5],rings[0]))continue;
        const z=dem[(y+1)*(SIZE+2)+x+1];if(Number.isFinite(z))values[dy*width+dx]=z;
      }
    }
    const bytes=new Uint8Array(writeArrayBuffer(values,{width,height,ModelPixelScale:[1,1,0],ModelTiepoint:[0,0,0,left,top,0],GTModelTypeGeoKey:1,GTRasterTypeGeoKey:1,ProjectedCSTypeGeoKey:2193,ProjLinearUnitsGeoKey:9001,VerticalUnitsGeoKey:9001,GDAL_NODATA:'-9999'}));
    self.postMessage({bytes},[bytes.buffer]);
  }catch(e){self.postMessage({error:e.message});}
};
