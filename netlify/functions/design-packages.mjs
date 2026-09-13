import {getStore} from '@netlify/blobs';
import {randomBytes} from 'node:crypto';
const CHUNK=2*1024*1024,MAX=256*1024*1024;
export const config={rateLimit:{windowLimit:180,windowSize:60,aggregateBy:['ip','domain']}};
const json=data=>Response.json(data,{headers:{'Cache-Control':'no-store'}});
export default async request=>{
  const url=new URL(request.url),token=url.searchParams.get('token');
  if(Number(request.headers.get('content-length'))>CHUNK)return new Response('Request too large',{status:413});
  if(request.method!=='GET' && request.headers.get('origin')!==url.origin)return new Response('Invalid origin',{status:403});
  const store=getStore({name:'design-portal-packages',consistency:'strong'});
  try {
    if(request.method==='POST'&&!token) {
      if(Number(request.headers.get('content-length'))>4096)return new Response('Request too large',{status:413});
      const input=await request.json();
      if(!Number.isInteger(input.size)||input.size<1||input.size>MAX||!/^DP-[a-f0-9-]{36}$/.test(input.reference)||input.name!==`${input.reference}.zip`)return new Response('Package must be a ZIP under 256 MiB.',{status:400});
      const id=randomBytes(32).toString('hex'),manifest={name:input.name,size:input.size,count:Math.ceil(input.size/CHUNK),created:Date.now(),complete:false};
      await store.setJSON(`${id}/manifest`,manifest);return json({token:id,count:manifest.count,chunkSize:CHUNK});
    }
    if(!/^[a-f0-9]{64}$/.test(token??''))return new Response('Not found',{status:404});
    const manifest=await store.get(`${token}/manifest`,{type:'json'});if(!manifest)return new Response('Not found',{status:404});
    const partText=url.searchParams.get('part'),part=Number(partText),validPart=partText!==null&&Number.isInteger(part)&&part>=0&&part<manifest.count;
    if(request.method==='PUT'&&validPart) {
      if(manifest.complete)return json({stored:true});
      if(Date.now()-manifest.created>24*3600000)return new Response('Upload expired. Start a new export.',{status:410});
      const bytes=await request.arrayBuffer(),expected=Math.min(CHUNK,manifest.size-part*CHUNK);
      if(bytes.byteLength!==expected)return new Response('Invalid chunk size',{status:400});
      if(part===0 && new Uint8Array(bytes).slice(0,4).join(',')!=='80,75,3,4')return new Response('Invalid ZIP',{status:400});
      await store.set(`${token}/${part}`,bytes);return json({stored:true});
    }
    if(request.method==='POST') {
      for(let i=0;i<manifest.count;i++)if(!await store.getMetadata(`${token}/${i}`))return new Response('Upload incomplete',{status:409});
      await store.setJSON(`${token}/manifest`,{...manifest,complete:true});return json({complete:true});
    }
    if(request.method==='GET'&&manifest.complete) {
      if(partText===null)return json({name:manifest.name,size:manifest.size,count:manifest.count});
      if(validPart)return new Response(await store.get(`${token}/${part}`,{type:'arrayBuffer'}),{headers:{'Content-Type':'application/octet-stream','Cache-Control':'no-store'}});
    }
    return new Response('Not available',{status:404});
  }catch{return new Response('Package service unavailable. Your local export is still available; retry later.',{status:503});}
};
