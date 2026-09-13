import {buildPackage} from './package.js';

export function downloadFile(file) {
  const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
export function initialiseExport({button,map,draw,getMaps,slope}) {
  const dialog=document.createElement('dialog');dialog.className='design-export';
  dialog.innerHTML=`<form method="dialog"><button class="export-close" aria-label="Close export">×</button></form><h2>Export design</h2>
    <label>Map<select id="export-map"></select></label>
    <label class="export-check"><input id="export-slope" type="checkbox"> Include slope polygons</label>
    <label class="export-check"><input id="export-shade" type="checkbox"> Show slope on the exported map</label>
    <label class="export-check"><input id="export-dem" type="checkbox"> Include elevation DEM (optional; may take longer)</label>
    <p>Roads, pads and your original map are included. Files are cropped to the map panel.</p>
    <form id="portal-submit-form"><div class="export-fields">
    <label>Your name<input name="name" autocomplete="name" required maxlength="150"></label>
    <label>Email<input name="email" type="email" autocomplete="email" required maxlength="200"></label>
    <label>Phone<input name="phone" type="tel" maxlength="60"></label><label>Company<input name="company" maxlength="150"></label>
    <label>Forest / property<input name="forest" required maxlength="200"></label><label>Job name<input name="job_name" required maxlength="200"></label>
    <label>Location<input name="location" maxlength="300"></label><label>Design details<textarea name="design_details" required maxlength="3000"></textarea></label>
    <label>Additional notes<textarea name="notes" maxlength="3000"></textarea></label>
    <label hidden>Leave empty<input name="bot-field" tabindex="-1" autocomplete="off"></label></div>
    <p>Download stays on your device. Send uploads this package and your details to Schroder Hill. Anyone with the private download link can access it.</p>
    <div class="export-actions"><button type="button" id="export-local">Download locally</button><button type="submit">Send to Schroder Hill</button><button type="button" id="export-cancel" hidden>Cancel</button></div></form>
    <p id="export-progress" role="status" aria-live="polite"></p>`;
  const style=document.createElement('style');style.textContent=`.design-export{box-sizing:border-box;width:min(620px,94vw);max-height:90vh;overflow:auto;border:0;border-radius:10px;padding:24px;color:#26332a;font:14px/1.45 system-ui;box-shadow:0 12px 60px #0005}.design-export::backdrop{background:#0007}.design-export h2{margin:0 0 18px;font-size:21px}.design-export label{display:block;margin:8px 0}.design-export input:not([type=checkbox]),.design-export textarea,.design-export select{box-sizing:border-box;width:100%;padding:8px;border:1px solid #bdc8bf;border-radius:4px;font:inherit}.export-fields{display:grid;grid-template-columns:1fr 1fr;gap:0 14px}.design-export button{padding:9px 12px;border:0;border-radius:5px;background:#294632;color:white;cursor:pointer}.design-export button:disabled{opacity:.5;cursor:wait}.export-close{float:right}.export-actions{display:flex;gap:8px;flex-wrap:wrap}.design-export p{font-size:12px;color:#526257}@media(max-width:480px){.export-fields{grid-template-columns:1fr}}`;
  document.head.append(style);document.body.append(dialog);
  style.textContent+=' .design-export [hidden]{display:none!important}';
  const select=dialog.querySelector('#export-map'),progress=dialog.querySelector('#export-progress'),form=dialog.querySelector('#portal-submit-form'),cancel=dialog.querySelector('#export-cancel');
  let controller=null,maps=[],prepared=null,upload=null,reference=null;
  button.addEventListener('click',()=>{
    maps=getMaps();select.replaceChildren();
    for(const overlay of maps)select.add(new Option(overlay.name,overlay.id));
    if(!maps.length)select.add(new Option('Geometry only — no imported map',''));
    select.disabled=maps.length<2;
    prepared=null;upload=null;reference=`DP-${crypto.randomUUID()}`;progress.textContent='';dialog.showModal();
  });
  cancel.onclick=()=>controller?.abort(new DOMException('Export cancelled','AbortError'));
  dialog.addEventListener('cancel',()=>controller?.abort());
  dialog.addEventListener('close',()=>controller?.abort());
  const controls=()=>[...dialog.querySelectorAll('input,textarea,select,button')].filter(x=>x!==cancel);
  async function run(send) {
    if(controller)return;
    controller=new AbortController();const signal=controller.signal;
    const details=Object.fromEntries(new FormData(form));
    const previous=controls().map(x=>[x,x.disabled]);previous.forEach(([x])=>x.disabled=true);cancel.hidden=false;
    try {
      if(details['bot-field'])throw Error('Submission could not be accepted.');
      const overlay=maps.find(m=>m.id===select.value);
      const features=structuredClone(draw.getAll().features);
      const includeSlope=dialog.querySelector('#export-slope').checked||dialog.querySelector('#export-shade').checked;
      const shade=dialog.querySelector('#export-shade').checked;
      const includeDem=dialog.querySelector('#export-dem').checked;
      const key=JSON.stringify({details,features,map:overlay?.id,includeSlope,shade,includeDem});
      if(prepared?.key!==key){
        upload=null;
        const earthworks=map.getStyle()?.sources?.['road-earthworks-estimate']?.data?.features??[];
        const file=await buildPackage({overlay,features,tiles:includeSlope?slope?.snapshot():null,includeSlope,shade,includeDem,details,reference,earthworks:structuredClone(earthworks),signal,onProgress:t=>progress.textContent=t});
        prepared={key,file};
      }
      if(!send){downloadFile(prepared.file);progress.textContent=`Downloaded ${reference}.zip. ${(prepared.file.exportWarnings??[]).join(' ')}`;return;}
      progress.textContent='Uploading package…';
      const api=async(path,options={})=>{
        const response=await fetch('/.netlify/functions/design-packages'+path,{...options,signal});
        if(!response.ok)throw Error((await response.text()).slice(0,200)||'Upload failed. Retry or download locally.');return response.json();
      };
      upload??=await api('',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:prepared.file.name,size:prepared.file.size,reference})});
      for(let i=0;i<upload.count;i++) {
        progress.textContent=`Uploading ${i+1} / ${upload.count}…`;
        await api(`?token=${upload.token}&part=${i}`,{method:'PUT',body:prepared.file.slice(i*upload.chunkSize,(i+1)*upload.chunkSize)});
      }
      await api(`?token=${upload.token}`,{method:'POST'});
      const fields=new URLSearchParams({...details,'form-name':'design-portal-submission',reference,subject:`Design Portal — ${details.job_name} — ${reference}`,package_link:`${location.origin}/download.html#${upload.token}`});
      const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:fields,signal});
      if(!response.ok)throw Error('Package uploaded, but the form was not accepted. Retry with the same reference.');
      progress.textContent=`Submitted to Schroder Hill. Reference: ${reference}. Keep this reference for follow-up.`;
    }catch(error){progress.textContent=error.name==='AbortError'?'Cancelled. Your details are preserved.':error.message;}
    finally{previous.forEach(([x,disabled])=>x.disabled=disabled);cancel.hidden=true;controller=null;}
  }
  dialog.querySelector('#export-local').onclick=()=>run(false);
  form.onsubmit=e=>{e.preventDefault();run(true);};
}
