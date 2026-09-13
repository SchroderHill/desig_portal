import {PDFDocument,rgb, pushGraphicsState,popGraphicsState,moveTo,lineTo,closePath,clip,endPath} from 'pdf-lib';
import {pdfTransform} from './geometry.js';
import {unproject} from '../browser-slope-core.js';
export async function annotatedPdf(overlay,features,slope,earthworks=[]) {
  const doc=await PDFDocument.load(await overlay.originalFile.arrayBuffer(),{updateMetadata:false});
  const page=doc.getPages()[0],b=overlay.georeference.viewportBBox,toPdf=pdfTransform(overlay.georeference);
  const transform=p=>toPdf(unproject(p));
  page.pushOperators(pushGraphicsState(),moveTo(b.minX,b.minY),lineTo(b.maxX,b.minY),lineTo(b.maxX,b.maxY),lineTo(b.minX,b.maxY),closePath(),clip(),endPath());
  function polygon(g,color,opacity) {
    // SVG paths use downward Y; negate PDF Y and place at the PDF origin.
    const path=g.coordinates.map(r=>r.map((p,i)=>{const [x,y]=transform(p);return `${i?'L':'M'} ${x} ${-y}`;}).join(' ')+' Z').join(' ');
    page.drawSvgPath(path,{x:0,y:0,color,opacity,borderColor:color,borderWidth:0.25});
  }
  for(const f of slope)polygon(f.geometry,rgb(.84,.1,.11),.35);
  for(const f of features) {
    if(f.geometry.type==='Polygon'){polygon(f.geometry,rgb(.8,.25,.12),.2);continue;}
    const points=f.geometry.coordinates.map(transform);
    for(let i=1;i<points.length;i++)page.drawLine({start:{x:points[i-1][0],y:points[i-1][1]},end:{x:points[i][0],y:points[i][1]},thickness:1.5,color:rgb(.35,.4,.35)});
  }
  for(const f of earthworks) {
    if(f.geometry?.type!=='LineString')continue;
    const points=f.geometry.coordinates.map(toPdf),kind=f.properties?.earthwork;
    const color=kind==='cut'?rgb(.18,.68,.38):kind==='fill'?rgb(.95,.55,.16):rgb(.61,.64,.69);
    for(let i=1;i<points.length;i++)page.drawLine({start:{x:points[i-1][0],y:points[i-1][1]},end:{x:points[i][0],y:points[i][1]},thickness:1.5,color});
  }
  for(const f of features.filter(f=>f.geometry.type==='LineString')) {
    const [x,y]=transform(f.geometry.coordinates[0]);
    // Standard Helvetica cannot encode every user character; preserve full names in GPKG.
    const text=String(f.properties.name).replace(/[^\x20-\x7e]/g,'?');
    page.drawText(text,{x:x+3,y:y+3,size:7,color:rgb(.08,.15,.09)});
  }
  page.pushOperators(popGraphicsState());
  return doc.save();
}
