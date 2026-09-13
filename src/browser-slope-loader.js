import {LidarSlopeGrid} from './lidar-slope.js';
import {SIZE,TOP,corners} from './browser-slope-core.js';

export class BrowserSlopeGrid extends LidarSlopeGrid {
  constructor() {
    super({version:1,thresholdDegrees:35,cellSizeMetres:1,width:1,height:1,left:0,top:TOP,name:'LINZ LiDAR slope'},new Uint8Array(1));
    this.tiles=new Map();
    this.complete=false;
  }
  cell(x,y) {
    const c=Math.floor(x/SIZE),r=Math.floor(y/SIZE);
    return this.tiles.get(`${c}:${r}`)?.cell(x-c*SIZE,y-r*SIZE)??0;
  }
  add({column,row,bytes}) {
    const left=column*SIZE,top=TOP-row*SIZE;
    const grid=new LidarSlopeGrid({...this.metadata,width:SIZE,height:SIZE,left,top},bytes);
    grid.coordinates=corners(left,top);
    this.tiles.set(`${column}:${row}`,grid);
  }
  analyse(input) {
    return {...super.analyse(input),rasterTiles:this.tiles,partial:!this.complete};
  }
}

export function createBrowserSlopeLoader({makeWorker=()=>new Worker(new URL('./browser-slope.worker.js',import.meta.url),{type:'module'})}={}) {
  let previousKey,previousGrid;
  return ({areas,signal,onProgress=()=>{},onTile=()=>{}}={})=> {
    signal?.throwIfAborted();
    const key=JSON.stringify(areas);
    if(previousGrid?.complete && key===previousKey)return Promise.resolve(previousGrid);
    return new Promise((resolve,reject)=>{
      const worker=makeWorker(),grid=new BrowserSlopeGrid();
      const finish=(error)=>{
        worker.terminate();signal?.removeEventListener('abort',abort);
        if(error)reject(error);else {grid.complete=true;previousKey=key;previousGrid=grid;resolve(grid);}
      };
      const abort=()=>finish(signal.reason??new DOMException('Cancelled','AbortError'));
      signal?.addEventListener('abort',abort,{once:true});
      worker.onerror=event=>finish(Error(event.message||'Slope worker could not start.'));
      worker.onmessage=({data})=>{
        if(data.type==='error')finish(Error(data.message));
        else if(data.type==='done')finish();
        else {
          grid.add(data);
          onProgress(`Processing map elevation: ${data.count} tiles ready…`);
          onTile(grid);
        }
      };
      worker.postMessage({areas});
    });
  };
}
