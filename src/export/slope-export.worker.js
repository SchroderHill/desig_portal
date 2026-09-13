import {fillFootprint} from './slope-outline.js';
self.onmessage=({data:tile})=>{
  try {
    const {width,height,left,top}=tile.metadata;
    const classes=new Uint8Array(width*height);let valid=0;
    for(let i=0;i<classes.length;i++){classes[i]=(tile.bytes[i>>2]>>((i%4)*2))&3;if(classes[i])valid++;}
    const polygons=fillFootprint(classes,width,height).map(p=>[p.outerRing,...p.holes].map(r=>{const ring=r.map(([x,y])=>[left+x,top-y]);return [...ring,ring[0]];}));
    self.postMessage({polygons,valid,cells:classes.length});
  }catch(e){self.postMessage({error:e.message});}
};
