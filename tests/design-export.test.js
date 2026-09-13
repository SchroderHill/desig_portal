import {describe,it,expect} from 'vitest';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {PDFDocument,PDFName,rgb} from 'pdf-lib';
import initSqlJs from 'sql.js';
import {createGeoPackage} from '../src/export/geopackage.js';
import {clipDesign,pdfTransform,measurement} from '../src/export/geometry.js';
import {extractGeoPdfGeoreference} from '../src/geopdf-metadata.js';
import {annotatedPdf} from '../src/export/map-pdf.js';
import {fillFootprint,signedRingArea} from '../src/export/slope-outline.js';

async function fixture() {
  const doc=await PDFDocument.create(),page=doc.addPage([400,500]);
  const bbox=[40,70,360,430];
  const transform=([x,y])=>[173.44+(x-40)*.00002+(y-70)*.000004,-41.65+(y-70)*.00002-(x-40)*.000004];
  const points=[[40,70],[360,70],[360,430],[40,430]],gpts=points.flatMap(p=>{const [x,y]=transform(p);return[y,x];});
  page.node.set(PDFName.of('VP'),doc.context.obj([{Type:'Viewport',BBox:bbox,Measure:{Type:'Measure',Subtype:'GEO',GPTS:gpts,LPTS:[0,0,1,0,1,1,0,1],GCS:{Type:'GEOGCS',EPSG:4326}}}]));
  page.drawText('EXPORT ALIGNMENT CHECK',{x:40,y:465,size:15});
  page.drawRectangle({x:40,y:70,width:320,height:360,borderWidth:1,borderColor:rgb(0,0,0)});
  for(const [x,y] of [[40,160],[200,240],[360,320]]){page.drawLine({start:{x:x-5,y},end:{x:x+5,y},color:rgb(0,0,1)});page.drawLine({start:{x,y:y-5},end:{x,y:y+5},color:rgb(0,0,1)});}
  doc.addPage([400,500]).drawText('SECOND PAGE PRESERVED');
  const bytes=await doc.save(),geo=await extractGeoPdfGeoreference(bytes);
  return {geo,bytes,transform};
}
describe('design export',()=>{
  it('clips roads to a rotated PDF panel and preserves PDF metadata/pages',async()=>{
    const {geo,bytes,transform}=await fixture();
    const inverse=pdfTransform(geo);expect(inverse(transform([200,240]))[0]).toBeCloseTo(200,4);
    const features=clipDesign([{id:'r1',properties:{name:'Road 1'},geometry:{type:'LineString',coordinates:[[0,140],[200,240],[400,340]].map(transform)}}],geo);
    expect(features).toHaveLength(1);expect(measurement(features[0].geometry)).toBeGreaterThan(100);
    const output=await annotatedPdf({originalFile:new Blob([bytes]),georeference:geo},features,[]);
    const pdf=await PDFDocument.load(output);expect(pdf.getPageCount()).toBe(2);expect(pdf.getPage(0).node.get(PDFName.of('VP'))).toBeTruthy();
    const roundtrip=await extractGeoPdfGeoreference(output);expect(roundtrip.viewportCoordinates[0][0]).toBeCloseTo(geo.viewportCoordinates[0][0],9);
    mkdirSync('tmp/pdfs',{recursive:true});writeFileSync('tmp/pdfs/export-alignment.pdf',output);writeFileSync('tmp/pdfs/export-source.pdf',bytes);
    const gpkg=await createGeoPackage({roads:features,pads:[]},{wasmBinary:readFileSync('node_modules/sql.js/dist/sql-wasm.wasm')});writeFileSync('tmp/pdfs/design.gpkg',gpkg);
    const SQL=await initSqlJs({wasmBinary:readFileSync('node_modules/sql.js/dist/sql-wasm.wasm')}),db=new SQL.Database(gpkg);
    expect(db.exec('PRAGMA integrity_check')[0].values[0][0]).toBe('ok');expect(db.exec('SELECT COUNT(*) FROM roads')[0].values[0][0]).toBe(1);db.close();
  });
  it('traces holes and diagonal islands without filling gaps',()=>{
    const classes=new Uint8Array(9).fill(2);classes[4]=0;
    const rings=fillFootprint(classes,3,3);expect(rings).toHaveLength(1);expect(rings[0].holes).toHaveLength(1);
    expect(Math.abs(signedRingArea(rings[0].outerRing))-Math.abs(signedRingArea(rings[0].holes[0]))).toBe(8);
    expect(fillFootprint(new Uint8Array([2,0,0,2]),2,2)).toHaveLength(2);
  });
});
