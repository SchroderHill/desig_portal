import clipping from 'polygon-clipping';
import {project,unproject} from '../browser-slope-core.js';

export function pdfTransform(geo) {
  const a=geo.projectPdfPoint([0,0]),b=geo.projectPdfPoint([1,0]),c=geo.projectPdfPoint([0,1]);
  const ux=b[0]-a[0],uy=b[1]-a[1],vx=c[0]-a[0],vy=c[1]-a[1],det=ux*vy-uy*vx;
  if(Math.abs(det)<1e-20)throw Error('Map alignment cannot be inverted.');
  return p=>{const x=p[0]-a[0],y=p[1]-a[1];return [(x*vy-y*vx)/det,(ux*y-uy*x)/det];};
}
export function clipLine(points,b) {
  const parts=[];let current=[];
  for(let i=1;i<points.length;i++) {
    const a=points[i-1],z=points[i],dx=z[0]-a[0],dy=z[1]-a[1];let lo=0,hi=1,valid=true;
    for(const [p,q] of [[-dx,a[0]-b.minX],[dx,b.maxX-a[0]],[-dy,a[1]-b.minY],[dy,b.maxY-a[1]]]) {
      if(p===0){if(q<0)valid=false;}else{const t=q/p;if(p<0)lo=Math.max(lo,t);else hi=Math.min(hi,t);}
    }
    if(!valid||hi<=lo){if(current.length>1)parts.push(current);current=[];continue;}
    const start=[a[0]+lo*dx,a[1]+lo*dy],end=[a[0]+hi*dx,a[1]+hi*dy];
    if(current.length && Math.hypot(current.at(-1)[0]-start[0],current.at(-1)[1]-start[1])>1e-7){parts.push(current);current=[];}
    if(!current.length)current.push(start);current.push(end);
  }
  if(current.length>1)parts.push(current);return parts;
}
export const mapGeometry=(g,fn)=>({type:g.type,coordinates:g.type==='LineString'?g.coordinates.map(fn):g.type==='MultiPolygon'?g.coordinates.map(p=>p.map(r=>r.map(fn))):g.coordinates.map(r=>r.map(fn))});
export function clipDesign(features,geo) {
  const result=[],toPdf=geo?pdfTransform(geo):null,b=geo?.viewportBBox;
  const box=b?[[[b.minX,b.minY],[b.maxX,b.minY],[b.maxX,b.maxY],[b.minX,b.maxY],[b.minX,b.minY]]]:null;
  for(const f of features) {
    if(!['LineString','Polygon'].includes(f.geometry?.type))continue;
    const g=toPdf?mapGeometry(f.geometry,toPdf):f.geometry;
    const geometries=g.type==='LineString'?(b?clipLine(g.coordinates,b):[g.coordinates]).map(coordinates=>({type:'LineString',coordinates})):
      (b?clipping.intersection(g.coordinates,box):[g.coordinates]).map(coordinates=>({type:'Polygon',coordinates}));
    geometries.forEach((geometry,part)=>{
      const world=geo?mapGeometry(geometry,geo.projectPdfPoint):geometry;
      result.push({type:'Feature',properties:{source_id:String(f.id??''),name:f.properties?.name??(g.type==='LineString'?'Road':'Pad'),part:part+1},geometry:mapGeometry(world,project)});
    });
  }
  return result;
}
export function ringArea(r) {return Math.abs(r.reduce((s,p,i)=>{const n=r[(i+1)%r.length];return s+p[0]*n[1]-n[0]*p[1];},0)/2);}
export function measurement(g) {
  if(g.type==='LineString')return g.coordinates.slice(1).reduce((s,p,i)=>s+Math.hypot(p[0]-g.coordinates[i][0],p[1]-g.coordinates[i][1]),0);
  return ringArea(g.coordinates[0])-g.coordinates.slice(1).reduce((s,r)=>s+ringArea(r),0);
}
export function clipProjectedPolygon(rings,geo) {
  const toPdf=pdfTransform(geo),b=geo.viewportBBox;
  const polygon=rings.map(r=>r.map(p=>toPdf(unproject(p))));
  return clipping.intersection(polygon,[[[b.minX,b.minY],[b.maxX,b.minY],[b.maxX,b.maxY],[b.minX,b.maxY],[b.minX,b.minY]]])
    .map(p=>p.map(r=>r.map(q=>project(geo.projectPdfPoint(q)))));
}
