import {fromUrl} from 'geotiff';
import {SIZE, TOP, corners, classify} from './browser-slope-core.js';
export async function readElevationTile(sources,column,row,signal) {
  const left=column*SIZE,top=TOP-row*SIZE, width=SIZE+2;
  const dem=new Float64Array(width*width).fill(NaN);
  const points=corners(left-1,top+1,SIZE+2),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
  const matching=sources.filter(s=>s.bounds[0]<Math.max(...xs)&&s.bounds[2]>Math.min(...xs)&&s.bounds[1]<Math.max(...ys)&&s.bounds[3]>Math.min(...ys));
  for(const source of matching) {
    signal?.throwIfAborted();
    const tiff=await fromUrl(source.url,{allowFullFile:false,cacheSize:16,blockSize:65536},signal);
    const image=await tiff.getImage();
    const [ox,oy]=image.getOrigin(),[rx,ry]=image.getResolution();
    if(image.getGeoKeys().ProjectedCSTypeGeoKey!==2193 || rx!==1 || ry!==-1 || Math.abs(ox-Math.round(ox))>1e-6 || Math.abs(oy-Math.round(oy))>1e-6 || image.getFileDirectory().ModelTransformation) throw Error('LINZ source must be an aligned NZTM 1 m elevation grid.');
    const x=Math.round(left-1-ox),y=Math.round(oy-top-1);
    const data=await image.readRasters({window:[x,y,x+width,y+width],samples:[0],interleave:true,fillValue:NaN,signal});
    const nodata=image.getGDALNoData();
    for(let i=0;i<dem.length;i++) if(!Number.isFinite(dem[i]) && Number.isFinite(data[i]) && data[i]!==nodata) dem[i]=data[i];
  }
  return dem;
}
export async function readTile(sources,column,row,signal) {return classify(await readElevationTile(sources,column,row,signal));}
