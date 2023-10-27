import{c as e}from"./index-c7d6bd67.js";import{w as t}from"./waitForElementById-46893270.js";import"/utils/interact.js";import{audio as a}from"/utils/aup.js";const o=hook.define({name:"Skin",description:"Customize skin",contents:[{type:"command",meta:["/skin",function(){const o=`skin${Date.now()}`,i=[],r=new hook.ZipReader({handler:e=>i.push(e)});r.addEventListener("loadstart",(()=>hook.sendText("加载zip组件..."))),r.addEventListener("read",(()=>hook.handleFile(o,r.total,null,l)));const d=Utils.randomUUID(),g=hook.toast(`<a id="${d}" href="#">点击此处打开文件选择器</a>`),c=Object.assign(document.createElement("input"),{type:"file",accept:"",onchange(){if(!this.files)return;const e=this.files[0],t=new FileReader;t.readAsArrayBuffer(e),t.onload=t=>{!t.target||!(t.target.result instanceof ArrayBuffer)||(r.read({name:e.name,buffer:t.target.result,path:e.webkitRelativePath||e.name}),g.dispatchEvent(new Event("custom-done")))}}});async function l(){console.log(i);const t=Object.create(await function(t=[]){const a=t.find((e=>String(e.name).endsWith("config.txt")));if(a)return n(e(a.buffer),/;?\r?\n/);const o=t.find((e=>String(e.name).endsWith("info.yml")));return o?n(e(o.buffer)):(hook.sendError("未找到config.txt或info.yml"),{})}(i)),o={Tap:["Tap.png","click.png"],TapHL:["TapHL.png","click_mh.png"],Drag:["Drag.png","drag.png"],DragHL:["DragHL.png","drag_mh.png"],Hold:["Hold.png","hold.png"],HoldHL:["HoldHL.png","hold_mh.png"],Flick:["Flick.png","flick.png"],FlickHL:["FlickHL.png","flick_mh.png"],HitFX:["HitFX.png","hit_fx.png"],HitSong0:["HitSong0.ogg","Tap.ogg","click.ogg"],HitSong1:["HitSong1.ogg","Drag.ogg","drag.ogg"],HitSong2:["HitSong2.ogg","Flick.ogg","flick.ogg"]},r=new Map;for(const[e,t]of Object.entries(o))for(const a of t){const t=i.find((e=>String(e.name).endsWith(a)));if(t){r.set(e,t);break}}if(r.has("Tap")){const e=await createImageBitmap(new Blob([r.get("Tap").buffer])),t=1089/e.width;hook.noteRender.update("Tap",e,t),r.has("TapHL")?hook.noteRender.update("TapHL",await createImageBitmap(new Blob([r.get("TapHL").buffer])),t):hook.noteRender.update("TapHL",e,t)}if(r.has("Drag")){const e=await createImageBitmap(new Blob([r.get("Drag").buffer])),t=1089/e.width;hook.noteRender.update("Drag",e,t),r.has("DragHL")?hook.noteRender.update("DragHL",await createImageBitmap(new Blob([r.get("DragHL").buffer])),t):hook.noteRender.update("DragHL",e,t)}if(r.has("Hold")){const e=await createImageBitmap(new Blob([r.get("Hold").buffer])),a=1089/e.width,[o,n]=t.holdAtlas,i=o?await createImageBitmap(e,0,0,e.width,o):hook.res.NoImageBlack,d=await createImageBitmap(e,0,o,e.width,e.height-o-n),g=n?await createImageBitmap(e,0,e.height-n,e.width,n):hook.res.NoImageBlack,c=t.holdCompact;if(hook.noteRender.update("HoldEnd",i,a,c),hook.noteRender.update("Hold",d,a,c),hook.noteRender.update("HoldHead",g,a,c),r.has("HoldHL")){const e=await createImageBitmap(new Blob([r.get("HoldHL").buffer])),[o,n]=t.holdAtlasHL||t.holdAtlasMH||t.holdAtlas,i=o?await createImageBitmap(e,0,0,e.width,o):hook.res.NoImageBlack,d=await createImageBitmap(e,0,o,e.width,e.height-o-n),g=n?await createImageBitmap(e,0,e.height-n,e.width,n):hook.res.NoImageBlack;hook.noteRender.update("HoldEndHL",i,a,c),hook.noteRender.update("HoldHL",d,a,c),hook.noteRender.update("HoldHeadHL",g,a,c)}else hook.noteRender.update("HoldEndHL",i,a,c),hook.noteRender.update("HoldHL",d,a,c),hook.noteRender.update("HoldHeadHL",g,a,c)}if(r.has("Flick")){const e=await createImageBitmap(new Blob([r.get("Flick").buffer])),t=1089/e.width;hook.noteRender.update("Flick",e,t),r.has("FlickHL")?hook.noteRender.update("FlickHL",await createImageBitmap(new Blob([r.get("FlickHL").buffer])),t):hook.noteRender.update("FlickHL",e,t)}if(r.has("HitFX")){const e=await createImageBitmap(new Blob([r.get("HitFX").buffer])),[a,o]=t.hitFx,n=(t.hitFxScale||1)/(e.width/a/256),i=t.hideParticles||!1,d=1e3*t.hitFxDuration||500;hook.noteRender.updateFX(e,n,e.width/a,e.height/o,i,d)}r.has("HitSong0")&&(hook.res.HitSong0=await a.decode(r.get("HitSong0").buffer.slice(0))),r.has("HitSong1")&&(hook.res.HitSong1=await a.decode(r.get("HitSong1").buffer.slice(0))),r.has("HitSong2")&&(hook.res.HitSong2=await a.decode(r.get("HitSong2").buffer.slice(0))),console.log(t,r)}t(d,(e=>{e.addEventListener("click",(()=>c.click()))}))}]}]});function n(e="",t=/\r?\n/){return e.split(t).reduce(((e,t)=>{const[a,o]=t.split(/:(.+)/).map((e=>e.trim()));return a&&(e[a]=(e=>{try{return JSON.parse(e)}catch{return e}})(o)),"True"===e[a]&&(e[a]=!0),"False"===e[a]&&(e[a]=!1),e}),Object.create(null))}export{o as default};
//# sourceMappingURL=skin-52753088.js.map
