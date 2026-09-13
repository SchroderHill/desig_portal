import sources from '../server/linz-dem-index.json';
import {SIZE,TOP,areaRings,tilesForAreas,maskTile} from './browser-slope-core.js';
import {readTile} from './browser-slope-dem.js';
sources.sort((a,b)=>a.id.localeCompare(b.id));
// Cache unmasked classes only: changing the imported map always reapplies its scope.
const version='horn-strict35-v1:'+sources.map(s=>s.checksum).join(',');
async function database() {
  if(!globalThis.indexedDB) return null;
  return new Promise(resolve=>{const r=indexedDB.open('portal-slope-v1',1);r.onupgradeneeded=()=>r.result.createObjectStore('tiles');r.onsuccess=()=>resolve(r.result);r.onerror=()=>resolve(null);});
}
async function cached(db,key,value) {
  if(!db)return;
  return new Promise(resolve=>{try{const tx=db.transaction('tiles',value?'readwrite':'readonly'),s=tx.objectStore('tiles');const r=value?s.put(value,key):s.get(key);r.onsuccess=()=>resolve(r.result);r.onerror=()=>resolve();tx.onabort=()=>resolve();}catch{resolve();}});
}
self.onmessage=async ({data:{areas}})=>{
  const db=await database();
  try {
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(version));
    const prefix=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
    const rings=areaRings(areas);let count=0;
    for(const {column,row} of tilesForAreas(rings)) {
      const key=`${prefix}:${column}:${row}`;
      let bytes=await cached(db,key),hit=!!bytes;
      if(!bytes){bytes=await readTile(sources,column,row,AbortSignal.timeout(60000));await cached(db,key,bytes);}
      bytes=maskTile(bytes,column*SIZE,TOP-row*SIZE,rings);
      self.postMessage({type:'tile',column,row,bytes,hit,count:++count},[bytes.buffer]);
    }
    self.postMessage({type:'done'});
  }catch(error){self.postMessage({type:'error',message:error.message});}finally{db?.close();}
};
