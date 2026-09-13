import {SIZE} from './browser-slope-core.js';

// Retain packed cells for measurement; only visible tiles become GPU textures.
export function createSlopeRasterRenderer(map) {
  const shown=new Map();
  return (tiles=new Map(),bounds)=>{
    const wanted=new Map();
    for(const [key,tile] of tiles) {
      const xs=tile.coordinates.map(p=>p[0]),ys=tile.coordinates.map(p=>p[1]);
      if(bounds && (Math.max(...xs)<bounds.west||Math.min(...xs)>bounds.east||Math.max(...ys)<bounds.south||Math.min(...ys)>bounds.north))continue;
      wanted.set(key,tile);
    }
    for(const [key,entry] of shown) if(!wanted.has(key)||wanted.get(key)!==entry.tile||!map.getSource(entry.id)) {
      if(map.getLayer(entry.id))map.removeLayer(entry.id);
      if(map.getSource(entry.id))map.removeSource(entry.id);
      shown.delete(key);
    }
    for(const [key,tile] of wanted) {
      if(shown.has(key))continue;
      const canvas=document.createElement('canvas');canvas.width=SIZE;canvas.height=SIZE;
      const ctx=canvas.getContext('2d'),pixels=ctx.createImageData(SIZE,SIZE);
      for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++)if(tile.cell(x,y)===2){const i=(y*SIZE+x)*4;pixels.data.set([215,25,28,255],i);}
      ctx.putImageData(pixels,0,0);
      const id=`slope-raster-${key}`;
      map.addSource(id,{type:'image',url:canvas.toDataURL(),coordinates:tile.coordinates});
      const before=map.getLayer('road-earthworks-estimate-line')?'road-earthworks-estimate-line':undefined;
      map.addLayer({id,type:'raster',source:id,paint:{'raster-opacity':0.48,'raster-fade-duration':0,'raster-resampling':'nearest'}},before);
      shown.set(key,{id,tile});
    }
  };
}
