import {buildPackage} from './package.js';

export function downloadFile(file) {
  const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
export function initialiseExport({button,map,draw,getMaps}) {
  const dialog=document.createElement('dialog');dialog.className='design-export';
  dialog.innerHTML=`<form method="dialog"><button class="export-close" aria-label="Close export">×</button></form><h2>Export design</h2>
    <label id="export-map-label">Map<select id="export-map"></select></label>
    <p id="export-contents">Roads and pads are included. Maps under 5 MB attach automatically.</p>
    <button type="button" id="export-local">Download locally</button>
    <form id="portal-submit-form"><h3>Send to Schroder Hill</h3>
    <label>Email *<input name="email" type="email" autocomplete="email" required maxlength="200"></label>
    <label>Company name <span>(optional)</span><input name="company" autocomplete="organization" maxlength="150"></label>
    <fieldset><legend>Please select one</legend>
    <label class="export-check"><input type="radio" name="request_type" value="Please send me a quote" required> Please send me a quote</label>
    <label class="export-check"><input type="radio" name="request_type" value="I am happy to proceed"> I am happy to proceed</label></fieldset>
    <label>Design description *<textarea name="design_details" required maxlength="3000" rows="3" placeholder="Max grade, road width, vehicle use — a brief overview of your project"></textarea></label>
    <div hidden aria-hidden="true"><input name="bot-field" tabindex="-1" autocomplete="off"></div>
    <button type="submit" class="export-send">Send design</button></form>
    <button type="button" id="export-cancel" hidden>Cancel</button>
    <p id="export-progress" role="status" aria-live="polite"></p>`;
  const style=document.createElement('style');style.textContent=`.design-export{box-sizing:border-box;width:min(480px,94vw);max-height:92vh;overflow:auto;border:0;border-radius:10px;padding:24px;color:#26332a;font:14px/1.4 system-ui;box-shadow:0 12px 60px #0005}.design-export::backdrop{background:#0007}.design-export h2{margin:0 0 12px;font-size:21px}.design-export h3{font-size:16px;margin:0 0 12px}.design-export label{display:block;margin:10px 0}.design-export input:not([type=checkbox]):not([type=radio]),.design-export textarea,.design-export select{box-sizing:border-box;width:100%;padding:9px;margin-top:4px;border:1px solid #bdc8bf;border-radius:4px;font:inherit}.design-export textarea{resize:vertical}.design-export button{padding:10px 14px;border:0;border-radius:5px;background:#294632;color:white;cursor:pointer}.design-export button:disabled{opacity:.5;cursor:wait}.design-export .export-close{float:right;background:transparent;color:#526257;padding:0 4px;font-size:24px}.design-export p,.design-export span{font-size:12px;color:#526257}.design-export fieldset{border:0;padding:0;margin:14px 0}.design-export legend{font-size:12px;color:#526257}.design-export .export-check{display:flex;align-items:center;gap:8px}.design-export #portal-submit-form{border-top:1px solid #dde3de;margin-top:18px;padding-top:18px}.design-export .export-send{width:100%}.design-export #export-local{background:#eef2ef;color:#294632}.design-export [hidden]{display:none!important}`;
  document.head.append(style);document.body.append(dialog);
  style.textContent+=' .design-export [hidden]{display:none!important}';
  const select=dialog.querySelector('#export-map'),progress=dialog.querySelector('#export-progress'),form=dialog.querySelector('#portal-submit-form'),cancel=dialog.querySelector('#export-cancel');
  let controller=null,maps=[],prepared=null,upload=null,reference=null;
  button.addEventListener('click',()=>{
    maps=getMaps();select.replaceChildren();
    for(const overlay of maps)select.add(new Option(overlay.name,overlay.id));
    if(!maps.length)select.add(new Option('Geometry only — no imported map',''));
    dialog.querySelector("#export-contents").textContent=maps.length?"Roads and pads are included. Maps under 5 MB attach automatically.":"Your drawn roads and pads are included.";
    select.disabled=maps.length<2;
    dialog.querySelector("#export-map-label").hidden=maps.length<2;
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
      const key=JSON.stringify({details,features,map:overlay?.id});
      if(prepared?.key!==key){
        upload=null;
        const earthworks=map.getStyle()?.sources?.['road-earthworks-estimate']?.data?.features??[];
        const file=await buildPackage({overlay,features,details,reference,earthworks:structuredClone(earthworks),signal,onProgress:t=>progress.textContent=t});
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
      const fields=new URLSearchParams({...details,'form-name':'design-portal-submission',reference,subject:`Design Portal — ${overlay?.name??'Design submission'} — ${reference}`,package_link:`${location.origin}/download.html#${upload.token}`});
      const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:fields,signal});
      if(!response.ok)throw Error('Package uploaded, but the form was not accepted. Retry with the same reference.');
      progress.textContent=`Submitted to Schroder Hill. Reference: ${reference}. ${(prepared.file.exportWarnings??[]).join(" ")}`;
    }catch(error){progress.textContent=error.name==='AbortError'?'Cancelled. Your details are preserved.':error.message;}
    finally{previous.forEach(([x,disabled])=>x.disabled=disabled);cancel.hidden=true;controller=null;}
  }
  dialog.querySelector('#export-local').onclick=()=>run(false);
  form.onsubmit=e=>{e.preventDefault();run(true);};
}
