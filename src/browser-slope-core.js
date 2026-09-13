import proj4 from 'proj4';
export const NZTM = '+proj=tmerc +lat_0=0 +lon_0=173 +k=0.9996 +x_0=1600000 +y_0=10000000 +ellps=GRS80 +units=m +no_defs';
export const SIZE = 512, TOP = 10000000;
export const project = p => proj4('EPSG:4326', NZTM, p);
export const unproject = p => proj4(NZTM, 'EPSG:4326', p);
export const corners = (left, top, size = SIZE) => [[left,top],[left+size,top],[left+size,top-size],[left,top-size]].map(unproject);
export function inside(p, ring) {
  let yes = false;
  for (let i=0,j=ring.length-1;i<ring.length;j=i++) {
    const a=ring[i], b=ring[j];
    if ((a[1]>p[1]) !== (b[1]>p[1]) && p[0] < (b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0]) yes=!yes;
  }
  return yes;
}
export function areaRings(areas) {
  if (!areas?.length) throw Error('Import a GeoPDF to analyse its map area.');
  return areas.map(a => {
    if (![a.west,a.south,a.east,a.north].every(Number.isFinite) || !(166<=a.west && a.west<a.east && a.east<=180 && -48<=a.south && a.south<a.north && a.north<=-33)) throw Error('This map is outside New Zealand LINZ coverage.');
    return [[a.west,a.north],[a.east,a.north],[a.east,a.south],[a.west,a.south]].map(project);
  });
}
export function* tilesForAreas(rings) {
  const seen=new Set();
  for (const ring of rings) {
    const xs=ring.map(p=>p[0]), ys=ring.map(p=>p[1]);
    for(let c=Math.floor(Math.min(...xs)/SIZE); c<=Math.floor(Math.max(...xs)/SIZE); c++)
      for(let r=Math.floor((TOP-Math.max(...ys))/SIZE);r<=Math.floor((TOP-Math.min(...ys))/SIZE);r++) {
        const key=`${c}:${r}`; if (!seen.has(key)) {seen.add(key);yield {column:c,row:r};}
      }
  }
}
export function classify(dem, size=SIZE) {
  const width=size+2, bytes=new Uint8Array(Math.ceil(size*size/4));
  for(let y=0;y<size;y++) for(let x=0;x<size;x++) {
    const i=y*width+x, z=[dem[i],dem[i+1],dem[i+2],dem[i+width],dem[i+width+1],dem[i+width+2],dem[i+2*width],dem[i+2*width+1],dem[i+2*width+2]];
    if(!z.every(Number.isFinite)) continue;
    const gx=(z[2]+2*z[5]+z[8]-z[0]-2*z[3]-z[6])/8;
    const gy=(z[6]+2*z[7]+z[8]-z[0]-2*z[1]-z[2])/8;
    const value=Math.atan(Math.hypot(gx,gy))*180/Math.PI>35?2:1, p=y*size+x;
    bytes[p>>2]|=value<<((p%4)*2);
  }
  return bytes;
}
export function maskTile(raw,left,top,rings,size=SIZE) {
  const bytes=raw.slice();
  for(let y=0;y<size;y++) for(let x=0;x<size;x++) if(!rings.some(r=>inside([left+x+0.5,top-y-0.5],r))) {
    const p=y*size+x;bytes[p>>2]&=~(3<<((p%4)*2));
  }
  return bytes;
}
