import {beforeEach,it,expect,vi} from 'vitest';
const records=vi.hoisted(()=>new Map());
vi.mock('@netlify/blobs',()=>({getStore:()=>({setJSON:async(k,v)=>records.set(k,structuredClone(v)),set:async(k,v)=>records.set(k,v),get:async k=>records.get(k)??null,getMetadata:async k=>records.has(k)?{}:null})}));
import handler from '../netlify/functions/design-packages.mjs';
const base='https://example.netlify.app/.netlify/functions/design-packages';
const req=(suffix,method,body)=>new Request(base+suffix,{method,headers:{Origin:'https://example.netlify.app'},body});
beforeEach(()=>records.clear());
it('accepts a 36 MiB package in chunks, rejects unfinished download and freezes completed data',async()=>{
  const reference='DP-11111111-1111-4111-8111-111111111111',size=36*1024*1024;
  const start=await handler(req('','POST',JSON.stringify({reference,name:reference+'.zip',size}))),upload=await start.json();
  expect(upload.count).toBe(18);
  expect((await handler(req('?token='+upload.token,'POST'))).status).toBe(409);
  expect((await handler(new Request(base+'?token='+upload.token))).status).toBe(404);
  for(let i=0;i<upload.count;i++){
    const bytes=new Uint8Array(upload.chunkSize);if(!i)bytes.set([80,75,3,4]);
    expect((await handler(req(`?token=${upload.token}&part=${i}`,'PUT',bytes))).status).toBe(200);
  }
  expect((await handler(req('?token='+upload.token,'POST'))).status).toBe(200);
  const result=await handler(new Request(base+`?token=${upload.token}&part=0`));expect((await result.arrayBuffer()).byteLength).toBe(upload.chunkSize);
});
it('rejects oversized packages and cross-origin writes',async()=>{
  expect((await handler(req('','POST',JSON.stringify({size:300*1024*1024})))).status).toBe(400);
  expect((await handler(new Request(base,{method:'POST',headers:{Origin:'https://other.example'},body:'{}'}))).status).toBe(403);
});
