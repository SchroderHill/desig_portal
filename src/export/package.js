import {zip,strToU8} from 'fflate';
import {clipDesign,clipProjectedPolygon} from './geometry.js';
import {createGeoPackage} from './geopackage.js';
import {annotatedPdf} from './map-pdf.js';
import {maskTile,project} from '../browser-slope-core.js';

async function traceTile(tile,signal) {
  signal?.throwIfAborted();
  const worker=new Worker(new URL('./slope-export.worker.js',import.meta.url),{type:'module'});
  return new Promise((resolve,reject)=>{
    const cleanup=()=>{worker.terminate();signal?.removeEventListener('abort',abort);};
    const abort=()=>{cleanup();reject(signal.reason);};signal?.addEventListener('abort',abort,{once:true});
    worker.onerror=e=>{cleanup();reject(Error(e.message));};
    worker.onmessage=({data})=>{cleanup();data.error?reject(Error(data.error)):resolve(data);};
    worker.postMessage(tile);
  });
}
export async function buildPackage({overlay,features,tiles,includeSlope,shade,includeDem=false,details={},reference,earthworks=[],signal,onProgress=()=>{}}) {
  const clipped=clipDesign(features,overlay?.georeference),slope=[];
  const notes=[];
  if(includeSlope && !tiles)throw Error('Slope is not ready. Enable slope and wait for processing, or uncheck slope export.');
  if(includeSlope && !overlay)throw Error('Import a map to crop slope polygons.');
  if(includeSlope){
    const rings=[overlay.georeference.viewportCoordinates.map(project)];
    const xs=rings[0].map(p=>p[0]),ys=rings[0].map(p=>p[1]);
    tiles=tiles.filter(t=>t.metadata.left<Math.max(...xs)&&t.metadata.left+t.metadata.width>Math.min(...xs)&&t.metadata.top>Math.min(...ys)&&t.metadata.top-t.metadata.height<Math.max(...ys))
      .map(t=>({...t,bytes:maskTile(t.bytes,t.metadata.left,t.metadata.top,rings,t.metadata.width)}));
  }
  if(includeSlope)for(let i=0;i<tiles.length;i++) {
    onProgress(`Tracing slope ${i+1} / ${tiles.length}…`);
    const result=await traceTile(tiles[i],signal);
    for(const rings of result.polygons)for(const coordinates of clipProjectedPolygon(rings,overlay.georeference))slope.push({type:'Feature',properties:{name:'Slope >35°',source_id:tiles[i].id,threshold_degrees:35},geometry:{type:'Polygon',coordinates}});
  }
  signal?.throwIfAborted();onProgress('Preparing road and pad layers…');
  const layers={roads:clipped.filter(f=>f.geometry.type==='LineString'),pads:clipped.filter(f=>f.geometry.type==='Polygon')};
  if(includeSlope)layers.steep_slope=slope;
  const files={'design.gpkg':await createGeoPackage(layers)};
  if(overlay){onProgress('Adding design to the original map…');files['design-map.pdf']=await annotatedPdf(overlay,clipped,shade?slope:[],earthworks);}
  else notes.push('Geometry-only export: no map was imported.');
  if(includeDem){
    try {
      if(!overlay)throw Error('No map selected for DEM crop.');
      files['elevation_EPSG2193.tif']=await new Promise((resolve,reject)=>{
        const worker=new Worker(new URL('./dem-export.worker.js',import.meta.url),{type:'module'});
        const stop=()=>{worker.terminate();signal?.removeEventListener('abort',abort);};
        const abort=()=>{stop();reject(signal.reason);};signal?.addEventListener('abort',abort,{once:true});
        worker.onerror=e=>{stop();reject(Error(e.message));};
        worker.onmessage=({data})=>{if(data.progress){onProgress(data.progress);return;}stop();data.error?reject(Error(data.error)):resolve(data.bytes);};
        worker.postMessage({...overlay.boundsLngLat,coordinates:overlay.georeference.viewportCoordinates});
      });
    }catch(e){signal?.throwIfAborted();notes.push(`DEM omitted: ${e.message}`);onProgress('DEM unavailable; continuing with core files…');}
  }
  if(includeSlope)notes.push('Slope polygons use calculated 1 m classes >35 degrees. Tile edges are retained; missing data is unknown, not gentle ground.');
  if(includeSlope){
    // Keep the compact classified source as explicit coverage evidence, including unknown cells.
    for(const tile of tiles){files[`coverage/${tile.id.replace(':','-')}.bin`]=tile.bytes;}
    files['coverage/index.json']=strToU8(JSON.stringify(tiles.map(t=>({id:t.id,...t.metadata,file:t.id.replace(':','-')+'.bin'})),null,2));
    notes.push('coverage/*.bin stores four 2-bit cells per byte, least-significant first: 0 unknown, 1 <=35 degrees, 2 >35 degrees. Coverage tiles may extend beyond the selected PDF; use its footprint in project.json.');
  }
  const metadata={reference,createdAt:new Date().toISOString(),details,map:overlay?.name??null,footprint:overlay?.georeference.viewportCoordinates,crs:'EPSG:2193',slopeIncluded:!!includeSlope,notes,files:Object.keys(files)};
  files['project.json']=strToU8(JSON.stringify(metadata,null,2));
  files['README.txt']=strToU8(['DESIGN PORTAL',reference,'Road lengths and pad areas refer to clipped NZTM geometry.','Source elevation: Toitu Te Whenua LINZ, CC BY 4.0. Slope: native 1 m Horn 3x3, strict >35 degrees.','The original PDF geospatial dictionaries are retained; verify field-app compatibility for your source PDF.',...notes].join('\n'));
  signal?.throwIfAborted();onProgress('Compressing package…');
  const data=await new Promise((resolve,reject)=>zip(files,{level:6},(error,data)=>error?reject(error):resolve(data)));
  signal?.throwIfAborted();const file=new File([data],`${reference}.zip`,{type:'application/zip'});file.exportWarnings=notes.filter(n=>n.startsWith('DEM omitted'));return file;
}
