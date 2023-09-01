const e=hook.define({name:"PhiZone",description:"PhiZone API",contents:[{type:"command",meta:["/pz",async function(e){const t=e||b("请输入歌曲ID");if(""===t||null===t)return void i("未输入歌曲ID，已取消操作");const c=await async function(e){a.sendMessage("等待服务器响应...");const t=await fetch(n(0|e));if(!t.ok)throw new Error(`${t.status} ${t.statusText}`);const c=((await t.json()).data||[])[0];if(!c)return{charts:[]};const s=await fetch(o(c.id));if(!s.ok)throw new Error(`${s.status} ${s.statusText}`);return u(((await s.json()).data||[]).filter((e=>e.file)),c)}(t).catch((e=>{i(`无法连接至服务器\n错误代码：${e.message}`),a.sendMessage("无法连接至服务器")}));if(console.log(c),c){if(!c.charts.length)return void i(`歌曲ID ${t} 对应的谱面不存在`);await l(c)}}]},{type:"command",meta:["/pzc",async function(e){const t=e||b("请输入谱面ID");if(""===t||null===t)return void i("未输入谱面ID，已取消操作");const c=await async function(e){a.sendMessage("等待服务器响应...");const t=await fetch(r(0|e));if(!t.ok)throw new Error(`${t.status} ${t.statusText}`);const c=((await t.json()).data||[])[0];if(!c||!c.file)return{charts:[]};const n=await fetch(s(c.songId));if(!n.ok)throw new Error(`${n.status} ${n.statusText}`);const o=(await n.json()).data;return u([c],o)}(t).catch((e=>{i(`无法连接至服务器\n错误代码：${e.message}`),a.sendMessage("无法连接至服务器")}));if(console.log(c),c){if(!c.charts.length)return void i(`谱面ID ${t} 对应的谱面不存在`);await l(c)}}]},{type:"command",meta:["/random",async function(){const e=await async function(){a.sendMessage("等待服务器响应...");const e=await fetch(f());if(!e.ok)throw new Error(`${e.status} ${e.statusText}`);const t=(await e.json()).data,c=await fetch(s(t.songId));if(!c.ok)throw new Error(`${c.status} ${c.statusText}`);const n=(await c.json()).data;return u([t],n)}().catch((e=>i(`无法连接至服务器\n错误代码：${e.message}`)));if(console.log(e),e){if(!e.charts.length)return void i("歌曲ID <random> 对应的谱面不存在");await l(e)}}]}]}),{msgHandler:a,uploader:t}=hook,c="https://api.phizone.cn",s=(e="")=>`${c}/songs/${e}/`,n=(e=0)=>`${c}/songs/?perpage=1&page=${e}`,r=(e=0)=>`${c}/charts/?perpage=1&page=${e}`,o=(e="")=>`${c}/songs/${e}/charts/`,f=()=>`${c}/charts/random/?rangeFormat=0&rangeFormat=1`,d="PhiZone API v0.8.0",b=e=>prompt(`${d}\n${e}`),i=e=>hook.toast(`${d}\n${e}`);function u(e,a){return console.log("getData::base",...e),console.log("getData::song",a),{charts:e.map((e=>({id:e.id,chart:e.file,level:`${e.level} Lv.${0|e.difficulty}`,charter:e.authorName.replace(/\[PZUser:\d+:([^\]]+?)(:PZRT)?\]/g,"$1"),assets:e.assets}))),composer:a.authorName,illustration:a.illustration,illustrator:a.illustrator,name:a.title,song:a.file}}async function l(e){const{charts:c}=e,s=[e.song,e.illustration];for(const e of c)e.chart&&s.push(e.chart),e.assets&&s.push(e.assets);const n=new h,r=e=>decodeURIComponent(e.match(/[^/]+$/)[0]);a.sendMessage("获取资源列表..."),await n.add(s,(({url:e,status:a,statusText:t})=>{i(`资源 '${r(e)}' 加载失败\n错误代码：${a} ${t}`)})),await n.start(t.fireProgress.bind(t));const o=async(e,a)=>{const c=await n.getData(e)||new ArrayBuffer(0);t.fireLoad({name:a},c)};await o(e.song,r(e.song)),await o(e.illustration,r(e.illustration));for(let a=0;a<c.length;a++){const s=c[a];s.assets&&await o(s.assets,r(s.assets)),await o(s.chart,r(s.chart));const n=new TextEncoder,f=w(s.id),d=`\n      #\n      Name: ${e.name}\n      Song: ${r(e.song)}\n      Picture: ${r(e.illustration)}\n      Chart: ${r(s.chart)}\n      Level: ${s.level}\n      Composer: ${e.composer}\n      Charter: ${s.charter}\n      Illustrator: ${e.illustrator}\n      Offset: ${f}\n    `,b=n.encode(d);t.fireLoad({name:"info.txt"},b.buffer)}}function h(){this.xhrs=Object.create(null)}function w(e){return"c816f8cf-c9b1-492d-a00e-305baae23529"===e?200:"0c811469-4645-40f7-88a1-fa7503febbb3"===e?-50:"026c8905-6f24-421c-a594-e5f9bf1d053a"===e?150:"71acb2d4-225e-4b0a-989c-660f4c075542"===e?175:"165119b8-7074-4106-bb23-27a8fb99c0c6"===e?150:"ff014085-2845-49dd-837b-b6541a0cc8d0"===e?50:"8c4d638a-a1aa-4e29-a0d2-2f3a2cb7e69c"===e?300:"f0b1e2eb-f7f8-42ec-bcb3-6a717147ad4e"===e?225:"18686678-cd3b-493e-accb-c6ca0bc304c5"===e?-50:"0ebddbc4-ff08-4484-8f21-bd0295526bdc"===e?50:"430a4ff2-e9e2-4add-9ee4-fbc172367e5d"===e?200:"260d12cf-847a-4773-aaf0-b754753f5596"===e?75:"fb716191-ffb4-462b-b92d-85c86f94833e"===e?-200:"b15f2eb5-d9c1-40f7-9bc8-4ccbc69229c6"===e?200:"710750c5-3728-46b8-bfb2-f895f1f909c0"===e?350:"0108b4f0-d3ee-47a0-b6a1-bddcfad8f54d"===e?400:"7be304a2-74cc-48a7-80bb-98de40cd814d"===e?-25:"8747c9b5-9029-499d-b1d5-59bd46e2522f"===e?150:"5201e181-b5d1-4931-9785-e78cbed0758e"===e?50:"0ada5f8d-7f1d-426e-b53d-747d4489e255"===e?100:"ccf6522f-d746-4b76-9b3b-09d6534fd99e"===e?50:"5d17fa22-51da-48e3-b56d-29ed782d830b"===e?175:"e15c5743-fbb1-4d36-9821-43208a75bf07"===e?100:"846587d2-0ff2-40ca-b42b-3568cef08e48"===e?250:"67b8c0fd-4879-41e3-af04-6dc8f41ddcd1"===e?-500:"2eb9e940-4350-4509-a244-068abd937f44"===e?50:"74585cab-6b6f-4633-9c3d-4dfa9900cafd"===e?-100:"f2398611-f145-45f5-b4f9-78be5f97fa86"===e?175:"1476dcb7-37c8-4f97-b039-7e07a8583078"===e?50:"4be75ae5-af61-4e2b-a23c-7171d063c391"===e?300:"9d01431f-7c81-4fb5-a9a4-5f5ef4e07cd3"===e?175:"a7b12a21-cb2c-4e79-9260-2cc3323752df"===e?-400:"e7ab7d3b-1be4-4300-b9d6-63814faa381c"===e?150:"2b8217af-3c7b-44b2-a9c9-fe869ea17c07"===e?50:"cfab519d-794d-4791-8881-969b00c60b46"===e||"5230368a-0764-4d17-8673-23c3b5a995d8"===e?150:"cb3a921a-9b7c-4653-87e8-692534d9c87d"===e?200:"108254a0-a756-4200-8391-1f47bb7707aa"===e||"e4307062-420a-49a2-8515-b22375e7f6c4"===e?-50:"e29e6b87-796f-4518-ac33-d9db79bbc103"===e?200:"c4dc62c4-7bed-4f39-b6ed-451ecdcb9b6b"===e?250:"7457a0a7-5d50-4e5e-b5a5-6049100a168e"===e?200:"af635f4b-df9c-42ad-9f8d-e20c0e2aebad"===e?400:"53e2ca24-2212-4795-be30-1a80cebbc339"===e?250:"d7ad0802-22e1-4efc-8bba-4cfe074d2a95"===e?200:"acab357e-ac69-4e8c-88b4-f8a080560c52"===e?-400:"ed0d5555-7573-4b9d-a491-b22aeab66da7"===e||"918a8854-04be-47e3-bfae-62699d193fee"===e?200:"232ec440-647e-4319-96c2-17e97f4ea55d"===e?150:"11eae627-ff9e-48fe-8c9f-2d49d6e34221"===e?-100:"79a029ad-1579-44d2-8ed2-f2c7cc8c6589"===e?-200:"20bec844-02b8-49e3-8c60-8bf8b8a36a96"===e?200:"e5e9021d-9254-408d-8629-795849f51732"===e?75:"39a834ed-7310-46ac-99e4-577cde527a84"===e?-150:"da8533af-9767-47b0-87c0-c12684e02980"===e?-1450:"97e22151-1cb8-4c48-8af4-c3419ed6b9ce"===e?175:"8d3c6775-9091-45bd-b6ff-d556cf36e85f"===e?-350:"b788d213-58e1-448f-8412-cebe8c8df12a"===e?50:"336b6099-61c1-403b-b226-483afc4a7bec"===e?25:"04181380-bdcf-40f3-8ec7-68a23ad84ba3"===e?50:"920506fb-2c52-4d17-b7e7-d8f1fe6afde5"===e?225:"594e3208-8459-48ae-88e8-b11823e5c2ad"===e?250:"84f0ce5f-b894-4db6-b042-b31232c62d0c"===e?-150:"70c543f8-97c5-4a2d-82ff-17efc484d52f"===e?400:"d12f18e4-ca64-4781-97ee-a7d922c831cf"===e?50:"a837eea9-b4a3-4c77-b7e5-757f4e940307"===e?150:"e59e5ef8-d444-4dc6-aebe-44bfd4891a94"===e?-50:"0a42b7b5-8a25-4438-b221-c9c0e585f27c"===e||"fbd4ca74-40c3-4c9f-9415-729f47d537fb"===e?-25:"c2006c12-e1c2-47ba-8292-c6c00b37dfbf"===e||"2b0338d9-e71a-40fe-8d79-dc8f6dec48da"===e?50:0}h.prototype.add=function(e=[],a=(e=>{})){return Promise.all(e.filter((e=>!this.xhrs[e])).map((async e=>{try{const a=await async function(e){try{const a=await fetch(e,{method:"HEAD"}).catch((()=>{throw Object.assign(new Error,{url:e,status:0,statusText:"Network Error"})})),t=a.headers.get("content-length");if(null==t)throw new Error("No Content-Length Header");if(a.ok)return Number(t)}catch{const a=await fetch(e,{method:"GET"}).catch((()=>{throw Object.assign(new Error,{url:e,status:0,statusText:"Network Error"})}));if(a.body.cancel(),!a.ok)throw Object.assign(new Error,{url:e,status:a.status,statusText:a.statusText});return Number(a.headers.get("content-length"))||0}throw Object.assign(new Error,{url:e,status:0,statusText:"Unknown Error"})}(e);this.xhrs[e]={event:{loaded:0,total:a}}}catch(e){a(e)}})))},h.prototype.start=function(e=((...e)=>{})){const a=Object.entries(this.xhrs);return Promise.all(a.map((([a,t])=>function(e,a=(e=>{})){return new Promise(((t,c)=>{const s=new XMLHttpRequest;s.open("GET",e,!0),s.responseType="arraybuffer",s.onprogress=a,s.onload=e=>(200===s.status?t:c)(e),s.onerror=c,s.send()}))}(a,(a=>{t.event=a,e(this.loaded,this.total)})).then((e=>t.event=e)).catch((e=>t.event=e)))))},h.prototype.getData=function(e){if(!this.xhrs[e])return null;const{event:a}=this.xhrs[e];return a.loaded>=a.total?a.target.response:null},Object.defineProperty(h.prototype,"loaded",{get(){return Object.values(this.xhrs).reduce(((e,a)=>e+a.event.loaded),0)}}),Object.defineProperty(h.prototype,"total",{get(){return Object.values(this.xhrs).reduce(((e,a)=>e+Math.max(a.event.loaded,a.event.total)),0)}});export{e as default};
//# sourceMappingURL=phizone-eae3a936.js.map