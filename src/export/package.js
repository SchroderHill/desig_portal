import {zip,strToU8} from 'fflate';
import {clipDesign} from './geometry.js';
import {createGeoPackage} from './geopackage.js';
import {annotatedPdf} from './map-pdf.js';

export const MAX_MAP_BYTES=5*1024*1024;
export async function buildPackage({overlay,features,details={},reference,earthworks=[],signal,onProgress=()=>{}}) {
  const clipped=clipDesign(features,overlay?.georeference),notes=[];
  signal?.throwIfAborted();onProgress('Preparing roads and pads…');
  const layers={roads:clipped.filter(f=>f.geometry.type==='LineString'),pads:clipped.filter(f=>f.geometry.type==='Polygon')};
  const files={'design.gpkg':await createGeoPackage(layers)};
  if(overlay && overlay.originalFile?.size<=MAX_MAP_BYTES){
    try {
      signal?.throwIfAborted();onProgress('Adding your map…');
      const pdf=await annotatedPdf(overlay,clipped,[],earthworks);
      if(pdf.byteLength<=MAX_MAP_BYTES)files['design-map.pdf']=pdf;
      else notes.push('Map omitted: annotated PDF exceeds 5 MB. Roads and pads are included.');
    }catch(error){signal?.throwIfAborted();notes.push('Map omitted: PDF could not be prepared. Roads and pads are included.');}
  }else if(overlay)notes.push('Map omitted: source PDF exceeds 5 MB. Roads and pads are included.');
  else notes.push('No map was imported.');
  const metadata={reference,createdAt:new Date().toISOString(),details,map:overlay?.name??null,mapIncluded:!!files['design-map.pdf'],footprint:overlay?.georeference.viewportCoordinates,crs:'EPSG:2193',notes,files:Object.keys(files)};
  files['project.json']=strToU8(JSON.stringify(metadata,null,2));
  files['README.txt']=strToU8(['DESIGN PORTAL',reference,'Road lengths and pad areas refer to clipped NZTM geometry.','No slope polygons or DEM are included.',...notes].join('\n'));
  signal?.throwIfAborted();onProgress('Packaging files…');
  const data=await new Promise((resolve,reject)=>zip(files,{level:1},(error,data)=>error?reject(error):resolve(data)));
  signal?.throwIfAborted();const file=new File([data],`${reference}.zip`,{type:'application/zip'});file.exportWarnings=notes.filter(n=>n.startsWith('Map omitted'));return file;
}
