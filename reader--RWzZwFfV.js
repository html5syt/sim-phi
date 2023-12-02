import{r as e,s as t,a as s,b as n,m as i}from"./index--IJmBAb7.js";import"/utils/interact.js";import"/utils/aup.js";var o=Object.defineProperty,a=(e,t,s)=>{return a=s,(i="symbol"!=typeof t?t+"":t)in(n=e)?o(n,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[i]=a,s;var n,i,a};const r=[null,null,e=>Math.sin(e*Math.PI/2),e=>1-Math.cos(e*Math.PI/2),e=>1-(e-1)**2,e=>e**2,e=>(1-Math.cos(e*Math.PI))/2,e=>((e*=2)<1?e**2:-((e-2)**2-2))/2,e=>1+(e-1)**3,e=>e**3,e=>1-(e-1)**4,e=>e**4,e=>((e*=2)<1?e**3:(e-2)**3+2)/2,e=>((e*=2)<1?e**4:-((e-2)**4-2))/2,e=>1+(e-1)**5,e=>e**5,e=>1-2**(-10*e),e=>2**(10*(e-1)),e=>Math.sqrt(1-(e-1)**2),e=>1-Math.sqrt(1-e**2),e=>(2.70158*e-1)*(e-1)**2+1,e=>(2.70158*e-1.70158)*e**2,e=>((e*=2)<1?1-Math.sqrt(1-e**2):Math.sqrt(1-(e-2)**2)+1)/2,e=>e<.5?(14.379638*e-5.189819)*e**2:(14.379638*e-9.189819)*(e-1)**2+1,e=>1-2**(-10*e)*Math.cos(e*Math.PI/.15),e=>2**(10*(e-1))*Math.cos((e-1)*Math.PI/.15),e=>((e*=11)<4?e**2:e<8?(e-6)**2+12:e<10?(e-9)**2+15:(e-10.5)**2+15.75)/16,e=>1-r[26](1-e),e=>(e*=2)<1?r[26](e)/2:r[27](e-1)/2+.5,e=>e<.5?2**(20*e-11)*Math.sin((160*e+1)*Math.PI/18):1-2**(9-20*e)*Math.sin((160*e+1)*Math.PI/18)];function m(e){return e=Math.trunc(e),r[e]}class u{constructor(e){a(this,"baseBpm"),a(this,"accTime"),a(this,"list"),this.baseBpm=Number(e)||120,this.accTime=0,this.list=[]}push(e,t,s){const n=this.accTime;this.list.push({start:e,end:t,bpm:s,value:n}),this.accTime+=(t-e)/s}calc(e){let t=0;for(const s of this.list)if(!(e>s.end)){if(e<s.start)break;t=Math.round(((e-s.start)/s.bpm+s.value)*this.baseBpm*32)}return t}calc2(e){return this.calc(e[0]+e[1]/e[2])}}class d{constructor(e){a(this,"bpm"),a(this,"speedEvents"),a(this,"notes"),a(this,"alphaEvents"),a(this,"moveEvents"),a(this,"rotateEvents"),this.bpm=120,this.speedEvents=[],this.notes=[],this.alphaEvents=[],this.moveEvents=[],this.rotateEvents=[],isNaN(e)||(this.bpm=e)}pushNote(e,t,s,n,i,o,a){this.notes.push({type:e,time:t,positionX:s,holdTime:n,speed:i,isAbove:o,isFake:a})}pushSpeedEvent(e,t){this.speedEvents.push({time:e,value:t})}pushAlphaEvent(e,t,s,n){this.alphaEvents.push({startTime:e,endTime:t,value:s,motionType:n})}pushMoveEvent(e,t,s,n,i){this.moveEvents.push({startTime:e,endTime:t,value:s,value2:n,motionType:i})}pushRotateEvent(e,t,s,n){this.rotateEvents.push({startTime:e,endTime:t,value:s,motionType:n})}format(){const e=(e,t)=>e.time-t.time,t=(e,t)=>e.startTime-t.startTime+(e.endTime-t.endTime),s={formatVersion:3,offset:0,bpm:this.bpm,speedEvents:[],numOfNotes:0,numOfNotesAbove:0,numOfNotesBelow:0,notesAbove:[],notesBelow:[],judgeLineDisappearEvents:[],judgeLineMoveEvents:[],judgeLineRotateEvents:[]},n=(e,t,n,i)=>{s.judgeLineDisappearEvents.push({startTime:e,endTime:t,start:n,end:i,start2:0,end2:0})},i=(e,t,n,i,o,a)=>{s.judgeLineMoveEvents.push({startTime:e,endTime:t,start:n,end:i,start2:o,end2:a})},o=(e,t,n,i)=>{s.judgeLineRotateEvents.push({startTime:e,endTime:t,start:n,end:i,start2:0,end2:0})},a=this.speedEvents.sort(e);let r=0;for(let e=0;e<a.length;e++){const t=Math.max(a[e].time,0),n=e<a.length-1?a[e+1].time:1e9,{value:i}=a[e],o=r;r+=(n-t)*i/this.bpm*1.875,r=Math.fround(r),s.speedEvents.push({startTime:t,endTime:n,value:i,floorPosition:o})}for(const t of this.notes.sort(e)){const{time:e}=t;let n=0,i=0,o=0;for(const t of s.speedEvents)if(!(e>t.endTime)){if(e<t.startTime)break;n=t.floorPosition,i=t.value,o=e-t.startTime}const a={type:t.type,time:e+(t.isFake?1e9:0),positionX:t.positionX,holdTime:t.holdTime,speed:t.speed*(3===t.type?i:1),floorPosition:Math.fround(n+i*o/this.bpm*1.875)};if(t.isAbove){if(s.notesAbove.push(a),t.isFake)continue;s.numOfNotes++,s.numOfNotesAbove++}else{if(s.notesBelow.push(a),t.isFake)continue;s.numOfNotes++,s.numOfNotesBelow++}}let u=0,d=0;for(const e of this.alphaEvents.sort(t)){n(u,e.startTime,d,d);const t=m(e.motionType);if(null!=t){const s=e.value-d;let i=0,o=0;for(let a=e.startTime;a<e.endTime;a++)i=o,o=t((a+1-e.startTime)/(e.endTime-e.startTime)),n(a,a+1,d+i*s,d+o*s)}else e.motionType&&n(e.startTime,e.endTime,d,e.value);u=e.endTime,d=e.value}n(u,1e9,d,d);let h=0,f=0,l=0;for(const e of this.moveEvents.sort(t)){i(h,e.startTime,f,f,l,l);const t=m(e.motionType);if(null!=t){const s=e.value-f,n=e.value2-l;let o=0,a=0;for(let r=e.startTime;r<e.endTime;r++)o=a,a=t((r+1-e.startTime)/(e.endTime-e.startTime)),i(r,r+1,f+o*s,f+a*s,l+o*n,l+a*n)}else 1===e.motionType&&i(e.startTime,e.endTime,f,e.value,l,e.value2);h=e.endTime,f=e.value,l=e.value2}i(h,1e9,f,f,l,l);let p=0,c=0;for(const e of this.rotateEvents.sort(t)){o(p,e.startTime,c,c);const t=m(e.motionType);if(null!=t){const s=e.value-c;let n=0,i=0;for(let a=e.startTime;a<e.endTime;a++)n=i,i=t((a+1-e.startTime)/(e.endTime-e.startTime)),o(a,a+1,c+n*s,c+i*s)}else 1===e.motionType&&o(e.startTime,e.endTime,c,e.value);p=e.endTime,c=e.value}return o(p,1e9,c,c),s}}function h(e,t,s){const{start:n,end:i,bezier:o=0}=e;return 1===Math.floor(o)?function(){if(n===i)return{code:1};const{bezierPoints:[o,a,r,m]=[0,0,0,0]}=e;if(o===a&&r===m)return{code:1};const u=1/(s-t),d=i-n,h=function(e,t,s,n){const i=3*e-3*s+1,o=3*s-6*e,a=3*e,r=3*t-3*n+1,m=3*n-6*t,u=3*t;function d(e){return(3*i*e+2*o)*e+a}function h(e){return((i*e+o)*e+a)*e}return function(e){return t=function(e){let t,s,n=e;for(let i=0;i<8;i++){if(s=h(n)-e,Math.abs(s)<1e-6)return n;if(t=d(n),Math.abs(t)<1e-6)break;n-=s/t}let i=1,o=0;for(n=e;i>o;){if(s=h(n)-e,Math.abs(s)<1e-6)return n;s>0?i=n:o=n,n=(i+o)/2}return n}(e),((r*t+m)*t+u)*t;var t}}(o,a,r,m);return{code:0,fn:e=>h((e-t)*u)*d}}():function(){const{easingType:o,easingLeft:a=0,easingRight:r=1}=e;if(a===r)return{code:-1};if(n===i)return{code:1};const u=m(o);if(null==u)return{code:1===o?1:-2};const d=u(a),h=u(r),f=(r-a)/(s-t),l=(i-n)/(h-d);return isFinite(l)?{code:0,fn:e=>(u((e-t)*f+a)-d)*l}:{code:-3}}()}function f(e,t){const{startTime:s,endTime:n,start:i,end:o,easingFn:a}=t,r=(o-i)/(n-s);for(let t=e.length-1;t>=0;t--){const n=e[t];if(n.endTime<s){e[t+1]={startTime:n.endTime,endTime:s,start:n.end,end:n.end,delta:0};break}if(n.startTime===s){e.length=t;break}if(n.startTime<s){n.end=n.start+(s-n.startTime)*n.delta,n.endTime=s,n.delta=(n.end-n.start)/(s-n.startTime),e.length=t+1;break}}if(s>=n)e.push({startTime:s,endTime:s,start:o,end:o,delta:0});else if(null==a)e.push({startTime:s,endTime:n,start:i,end:o,delta:r});else{let t=0,o=0;for(let r=s;r<n;r++)t=o,o=a(r+1),e.push({startTime:r,endTime:r+1,start:i+t,end:i+o,delta:o-t})}}function l(e,t,s){var n,i;let o=null!==(n=null==(i=e[0])?void 0:i.start)&&void 0!==n?n:0;for(const n of e){const{startTime:e,endTime:i,start:a,end:r,delta:m}=n;if(t<e||s&&t===e)break;o=t>=i?r:a+(t-e)*m}return o}function p(e,t,s){var n,i,o,a;let r=null!==(n=null==(o=e[0])?void 0:o.start)&&void 0!==n?n:0,m=null!==(i=null==(a=e[0])?void 0:a.start2)&&void 0!==i?i:0;for(const n of e){const{startTime:e,endTime:i,start:o,end:a,start2:u,end2:d}=n;if(t<e||s&&t===e)break;t>=i?(r=a,m=d):(r=o+(t-e)*(a-o)/(i-e),m=u+(t-e)*(d-u)/(i-e))}return[r,m]}function c(e,t,s){var n,i;let o=null!==(n=null==(i=e[0])?void 0:i.start)&&void 0!==n?n:0;for(const n of e){const{startTime:e,endTime:i,start:a,end:r}=n;if(t<e||s&&t===e)break;o=t>=i?r:a+(t-e)*(r-a)/(i-e)}return o}function v(e){const t=[],s=[];for(const t of e)for(const e of t)s.push(e.startTime,e.endTime);s.sort(((e,t)=>e-t));for(let n=0;n<s.length-1;n++){const i=s[n],o=s[n+1];if(i===o)continue;const a=e.reduce(((e,t)=>e+l(t,i,!1)),0),r=e.reduce(((e,t)=>e+l(t,o,!0)),0);t.push({startTime:i,endTime:o,start:a,end:r,delta:(r-a)/(o-i)})}return t}class T{constructor(){a(this,"moveXEvents"),a(this,"moveYEvents"),a(this,"rotateEvents"),a(this,"alphaEvents"),a(this,"speedEvents"),this.moveXEvents=[],this.moveYEvents=[],this.rotateEvents=[],this.alphaEvents=[],this.speedEvents=[]}pushMoveXEvent(e,t,s,n,i){this.moveXEvents.push({startTime:e,endTime:t,start:s,end:n,easingFn:i})}pushMoveYEvent(e,t,s,n,i){this.moveYEvents.push({startTime:e,endTime:t,start:s,end:n,easingFn:i})}pushRotateEvent(e,t,s,n,i){this.rotateEvents.push({startTime:e,endTime:t,start:s,end:n,easingFn:i})}pushAlphaEvent(e,t,s,n,i){this.alphaEvents.push({startTime:e,endTime:t,start:s,end:n,easingFn:i})}pushSpeedEvent(e,t,s,n){this.speedEvents.push({startTime:e,endTime:t,start:s,end:n})}}class E{constructor(e){a(this,"bpm"),a(this,"notes"),a(this,"eventLayers"),a(this,"id"),a(this,"father"),a(this,"moveEvents"),a(this,"rotateEvents"),a(this,"alphaEvents"),a(this,"speedEvents"),a(this,"settled"),a(this,"merged"),this.bpm=120,this.notes=[],this.eventLayers=[],this.father=null,this.settled=!1,this.merged=!1,isNaN(e)||(this.bpm=e)}pushNote(e,t,s,n,i,o,a,r){this.notes.push({type:e,time:t,positionX:s,holdTime:n,speed:i,isAbove:o,isFake:a,isHidden:r})}setId(e=NaN){this.id=e}setFather(e){this.father=e}preset(){const e=(e,t)=>e.startTime-t.startTime,t=[];for(const s of this.eventLayers){const n=[],i=[],o=[],a=[],r=[];for(const t of s.moveXEvents.sort(e))f(n,t);for(const t of s.moveYEvents.sort(e))f(i,t);for(const t of s.rotateEvents.sort(e))f(o,t);for(const t of s.alphaEvents.sort(e))f(a,t);for(const t of s.speedEvents.sort(e))f(r,t);t.push({moveXEvents:n,moveYEvents:i,rotateEvents:o,alphaEvents:a,speedEvents:r})}const s=v(t.map((e=>e.moveXEvents))),n=v(t.map((e=>e.moveYEvents)));this.moveEvents=function(e,t){const s=[],n=[];for(const t of e)n.push(t.startTime,t.endTime);for(const e of t)n.push(e.startTime,e.endTime);n.sort(((e,t)=>e-t));for(let i=0;i<n.length-1;i++){const o=n[i],a=n[i+1];if(o===a)continue;const r=l(e,o,!1),m=l(e,a,!0),u=l(t,o,!1),d=l(t,a,!0);s.push({startTime:o,endTime:a,start:r,end:m,start2:u,end2:d})}return s}(s,n),this.rotateEvents=v(t.map((e=>e.rotateEvents))),this.alphaEvents=v(t.map((e=>e.alphaEvents))),this.speedEvents=function(e){const t=[];(!e.length||e[0].startTime>0)&&t.push({time:0,value:0});for(const s of e){const{startTime:e,endTime:n,start:i,end:o}=s;if(t.push({time:e,value:i}),i!==o){const s=(o-i)/(n-e);for(let o=e;o<n;o++){const n=o+.5-e;t.push({time:o,value:i+n*s})}t.push({time:n,value:o})}}return t}(v(t.map((e=>e.speedEvents)))),this.settled=!0}fitFather(e=[],t=console.warn){if(this.settled||this.preset(),e.includes(this))return t(`检测到循环继承：${e.concat(this).map((e=>e.id)).join("->")}(对应的father将被视为-1)`),void e.map((e=>e.setFather(null)));this.father&&this.father.fitFather(e.concat(this),t),this.father&&!this.merged&&(function(e,t){const s=[],n=[];for(const e of t.moveEvents)n.push(e.startTime,e.endTime);for(const e of t.rotateEvents)n.push(e.startTime,e.endTime);for(const t of e.moveEvents)n.push(t.startTime,t.endTime);n.sort(((e,t)=>e-t));for(let i=n[0];i<n[n.length-1];i++){const n=i,o=i+1;if(n===o)continue;const[a,r]=p(t.moveEvents,n,!1),m=c(t.rotateEvents,n,!1)*-Math.PI/180,[u,d]=p(t.moveEvents,o,!0),h=c(t.rotateEvents,o,!0)*-Math.PI/180,[f,l]=p(e.moveEvents,n,!1),[v,T]=p(e.moveEvents,o,!0),E=a+f*Math.cos(m)-l*Math.sin(m),g=u+v*Math.cos(h)-T*Math.sin(h),b=r+f*Math.sin(m)+l*Math.cos(m),y=d+v*Math.sin(h)+T*Math.cos(h);s.push({startTime:n,endTime:o,start:E,end:g,start2:b,end2:y})}e.moveEvents=s}(this,this.father),this.merged=!0)}format({onwarning:e=console.warn}={}){this.fitFather([],e);const t={bpm:this.bpm,speedEvents:[],numOfNotes:0,numOfNotesAbove:0,numOfNotesBelow:0,notesAbove:[],notesBelow:[],judgeLineDisappearEvents:[],judgeLineMoveEvents:[],judgeLineRotateEvents:[]};for(const e of this.moveEvents)t.judgeLineMoveEvents.push({startTime:e.startTime,endTime:e.endTime,start:(e.start+675)/1350,end:(e.end+675)/1350,start2:(e.start2+450)/900,end2:(e.end2+450)/900});for(const e of this.rotateEvents)t.judgeLineRotateEvents.push({startTime:e.startTime,endTime:e.endTime,start:-e.start,end:-e.end,start2:0,end2:0});for(const e of this.alphaEvents)t.judgeLineDisappearEvents.push({startTime:e.startTime,endTime:e.endTime,start:Math.max(0,e.start/255),end:Math.max(0,e.end/255),start2:0,end2:0});let s=0,n=0;const i=this.speedEvents;for(let e=0;e<i.length;e++){const o=Math.max(i[e].time,0),a=e<i.length-1?i[e+1].time:1e9,r=2*i[e].value/9;t.speedEvents.push({startTime:o,endTime:a,value:r,floorPosition:s,floorPositionMin:n}),s+=(a-o)*r/this.bpm*1.875,s=Math.fround(s),n=Math.min(n,s)}const o=(e,t)=>e.time-t.time,a=e=>{let s=0,n=0,i=0,o=0;for(const a of t.speedEvents)if(!(e>a.endTime)){if(e<a.startTime)break;s=a.floorPosition,n=a.value,i=e-a.startTime,o=a.floorPositionMin}return{v1:s,v4:n*i,vmin:o}},r=(e,t)=>{const s=a(e),n=a(e+t);return((n.v1-s.v1)/1.875*this.bpm+(n.v4-s.v4))/t};for(const e of this.notes.sort(o)){const{v1:s,v4:n,vmin:i}=a(e.time),o=3===e.type?r(e.time,e.holdTime):1,m=Math.fround(s+n/this.bpm*1.875),u={type:e.type,time:e.time+(e.isFake?1e9:0),positionX:e.positionX,holdTime:e.holdTime,speed:e.speed*o,floorPosition:m};if(e.isHidden&&(u.speed=0,u.floorPosition=Math.min(i,m)-1),e.isAbove){if(t.notesAbove.push(u),e.isFake)continue;t.numOfNotes++,t.numOfNotesAbove++}else{if(t.notesBelow.push(u),e.isFake)continue;t.numOfNotes++,t.numOfNotesBelow++}}return t}}function g(e){if(e.length){const t=e.reduce(((e,t)=>Math.max(e,t.endTime)),0);if(t<1e9){const{value:s}=e[e.length-1];e.push({startTime:t,endTime:1e9,value:s})}}else e.push({startTime:0,endTime:1e9,value:1})}function b(e){if(e.length){const t=e.reduce(((e,t)=>Math.max(e,t.endTime)),0);if(t<1e9){const{end:s,end2:n}=e[e.length-1];e.push({startTime:t,endTime:1e9,start:s,end:s,start2:n,end2:n})}}else e.push({startTime:0,endTime:1e9,start:0,end:0,start2:0,end2:0})}var y,N;(N=y||(y={})).parse=function(e,t){const s=function(e,t){var s,n;const i=e.split(/\s+/),o={offset:0,bpmList:[],notes:[],lines:[]},a={formatVersion:3,offset:0,numOfNotes:0,judgeLineList:[]},r=[];let m=0;for(o.offset=isNaN(Number(i[m]))?0:Number(i[m++]);m<i.length;){const e=i[m++];if(""!==e)if("bp"===e){const e=Number(i[m++]),t=Number(i[m++]);o.bpmList.push({time:e,bpm:t})}else if(e.startsWith("n")){if(!"1234".includes(e[1]))throw new Error(`Unsupported Command: ${e}`);const t={},s=e[1];t.type=Number(s),t.lineId=Number(i[m++]),t.time=Number(i[m++]),t.time2="2".includes(s)?Number(i[m++]):t.time,t.offsetX=Number(i[m++]),t.isAbove=Number(i[m++]),t.isFake=Number(i[m++]),t.text=`n${Object.values(t).join(" ")}`,t.speed=(i[m++]||"").startsWith("#")?Number(i[m++]):(m--,1),t.size=(i[m++]||"").startsWith("&")?Number(i[m++]):(m--,1),o.notes.push(t)}else{if(!e.startsWith("c"))throw new Error(`Unexpected Command: ${e}`);{if(!"vpdamrf".includes(e[1]))throw new Error(`Unsupported Command: ${e}`);const t={},s=e[1];t.type=s,t.lineId=Number(i[m++]),t.time=Number(i[m++]),"v".includes(s)&&(t.speed=Number(i[m++])),t.time2="mrf".includes(s)?Number(i[m++]):t.time,"pm".includes(s)&&(t.offsetX=Number(i[m++])),"pm".includes(s)&&(t.offsetY=Number(i[m++])),"dr".includes(s)&&(t.rotation=Number(i[m++])),"af".includes(s)&&(t.alpha=Number(i[m++])),"mr".includes(s)&&(t.motionType=Number(i[m++])),t.text=`c${Object.values(t).join(" ")}`,"pdaf".includes(s)&&(t.motionType=1),o.lines.push(t)}}}if(a.offset=o.offset/1e3-.175,!o.bpmList.length)throw new Error("Invalid pec file");const h=new u(o.bpmList[0].bpm);o.bpmList.sort(((e,t)=>e.time-t.time)).forEach(((e,t,s)=>{var n,i,o;(null==(i=s[t+1])?void 0:i.time)<=0||h.push(e.time<0?0:e.time,null!==(n=null==(o=s[t+1])?void 0:o.time)&&void 0!==n?n:1e9,e.bpm)}));const f=[];for(const e of o.notes){var l;const n=[0,1,4,2,3].indexOf(e.type),i=h.calc(e.time),o=h.calc(e.time2)-i,a=isNaN(e.speed)?1:e.speed;null!==(l=f[s=e.lineId])&&void 0!==l||(f[s]=new d(h.baseBpm)),f[e.lineId].pushNote(n,i,e.offsetX/115.2,o,a,1===e.isAbove,0!==e.isFake),0!==e.isFake&&r.push(`检测到FakeNote(可能无法正常显示)\n位于:"${e.text}"\n来自${t}`),1!==e.size&&r.push(`检测到异常Note(可能无法正常显示)\n位于:"${e.text}"\n来自${t}`)}const p=e=>{return t=e,!((t=Math.trunc(t))<2||t>29)||1===e;var t};for(const e of o.lines){var c;const s=h.calc(e.time),i=h.calc(e.time2);s>i?r.push(`检测到开始时间大于结束时间(将禁用此事件)\n位于:"${e.text}"\n来自${t}`):(null!==(c=f[n=e.lineId])&&void 0!==c||(f[n]=new d(h.baseBpm)),"v"===e.type&&f[e.lineId].pushSpeedEvent(s,e.speed/7),("a"===e.type||"f"===e.type)&&(f[e.lineId].pushAlphaEvent(s,i,Math.max(e.alpha/255,0),e.motionType),e.alpha<0&&r.push(`检测到负数Alpha:${e.alpha}(将被视为0)\n位于:"${e.text}"\n来自${t}`)),("p"===e.type||"m"===e.type)&&(f[e.lineId].pushMoveEvent(s,i,e.offsetX/2048,e.offsetY/1400,p(e.motionType)?e.motionType:1),p(e.motionType)||r.push(`未知的缓动类型:${e.motionType}(将被视为1)\n位于:"${e.text}"\n来自${t}`)),("d"===e.type||"r"===e.type)&&(f[e.lineId].pushRotateEvent(s,i,-e.rotation,p(e.motionType)?e.motionType:1),p(e.motionType)||r.push(`未知的缓动类型:${e.motionType}(将被视为1)\n位于:"${e.text}"\n来自${t}`)))}for(const e of f){const t=e.format();a.judgeLineList.push(t),a.numOfNotes+=t.numOfNotes}return{data:a,messages:r,format:"PEC"}}(e,t);for(const e of s.data.judgeLineList)g(e.speedEvents),b(e.judgeLineDisappearEvents),b(e.judgeLineMoveEvents),b(e.judgeLineRotateEvents);return s},N.parseRPE=function(e,t){const s=function(e,t){const s=JSON.parse(e),n=s.META||s;if(null==n||!n.RPEVersion)throw new Error("Invalid rpe file");const i={formatVersion:3,offset:0,numOfNotes:0,judgeLineList:[]},o=[],a=(e,s,n)=>o.push({host:"RPE2JSON",code:e,name:s,message:n,target:t});a(0,"RPEVersionNotice",`RPE谱面兼容建设中...\n检测到RPE版本:${n.RPEVersion}`);const r=`RPE(${n.RPEVersion})`,m={};m.Chart=t,m.Music=n.song,m.Image=n.background,m.Name=n.name,m.Artist=n.composer,m.Charter=n.charter,m.Level=n.level,i.offset=n.offset/1e3;const d=[];s.judgeLineList.forEach(((e,s)=>{e.LineId=s;const n=String(e.Texture).replace(/\0/g,"");if("line.png"===n)return;const{extended:i}=e,o=null!=i&&i.scaleXEvents?i.scaleXEvents[i.scaleXEvents.length-1].end:1,a=null!=i&&i.scaleYEvents?i.scaleYEvents[i.scaleYEvents.length-1].end:1;d.push({Chart:t,LineId:s.toString(),Image:n,Scale:a.toString(),Aspect:(o/a).toString(),UseBackgroundDim:"0",UseLineColor:"1",UseLineScale:"1"})}));const f=new u(s.BPMList[0].bpm);for(const e of s.BPMList)e.time=e.startTime[0]+e.startTime[1]/e.startTime[2];s.BPMList.sort(((e,t)=>e.time-t.time)).forEach(((e,t,s)=>{var n,i,o;(null==(i=s[t+1])?void 0:i.time)<=0||f.push(e.time<0?0:e.time,null!==(n=null==(o=s[t+1])?void 0:o.time)&&void 0!==n?n:1e9,e.bpm)}));for(const e of s.judgeLineList){void 0===e.zOrder&&(e.zOrder=0),void 0===e.bpmfactor&&(e.bpmfactor=1),void 0===e.father&&(e.father=-1),1!==e.isCover&&a(1,"ImplementionWarning",`未兼容isCover=${e.isCover}(可能无法正常显示)\n位于${e.LineId}号判定线`),0!==e.zOrder&&a(1,"ImplementionWarning",`未兼容zOrder=${e.zOrder}(可能无法正常显示)\n位于${e.LineId}号判定线`),1!==e.bpmfactor&&a(1,"ImplementionWarning",`未兼容bpmfactor=${e.bpmfactor}(可能无法正常显示)\n位于${e.LineId}号判定线`);const t=new E(f.baseBpm);if(t.setId(e.LineId),e.notes)for(const s of e.notes){void 0===s.alpha&&(s.alpha=255),1!==s.above&&2!==s.above&&a(1,"NoteSideWarning",`检测到非法方向:${s.above}(将被视为2)\n位于:"${JSON.stringify(s)}"`),0!==s.isFake&&a(1,"NoteFakeWarning",`检测到FakeNote(可能无法正常显示)\n位于:"${JSON.stringify(s)}"`),1!==s.size&&a(1,"ImplementionWarning",`未兼容size=${s.size}(可能无法正常显示)\n位于:"${JSON.stringify(s)}"`),0!==s.yOffset&&a(1,"ImplementionWarning",`未兼容yOffset=${s.yOffset}(可能无法正常显示)\n位于:"${JSON.stringify(s)}"`),999999!==s.visibleTime&&a(1,"ImplementionWarning",`未兼容visibleTime=${s.visibleTime}(可能无法正常显示)\n位于:"${JSON.stringify(s)}"`),255!==s.alpha&&0!==s.alpha&&a(1,"ImplementionWarning",`未兼容alpha=${s.alpha}(可能无法正常显示)\n位于:"${JSON.stringify(s)}"`);const e=[0,1,4,2,3].indexOf(s.type),n=f.calc2(s.startTime),i=f.calc2(s.endTime)-n,{speed:o}=s,r=s.positionX/75.375;t.pushNote(e,n,r,i,o,1===s.above,0!==s.isFake,0===s.alpha)}for(const s of e.eventLayers){if(!s)continue;const e=new T;for(const t of s.moveXEvents||[]){const s=f.calc2(t.startTime),n=f.calc2(t.endTime),{fn:i,code:o}=h(t,s,n);l(o,t),e.pushMoveXEvent(s,n,t.start,t.end,i)}for(const t of s.moveYEvents||[]){const s=f.calc2(t.startTime),n=f.calc2(t.endTime),{fn:i,code:o}=h(t,s,n);l(o,t),e.pushMoveYEvent(s,n,t.start,t.end,i)}for(const t of s.rotateEvents||[]){const s=f.calc2(t.startTime),n=f.calc2(t.endTime),{fn:i,code:o}=h(t,s,n);l(o,t),e.pushRotateEvent(s,n,t.start,t.end,i)}for(const t of s.alphaEvents||[]){const s=f.calc2(t.startTime),n=f.calc2(t.endTime),{fn:i,code:o}=h(t,s,n);l(o,t),e.pushAlphaEvent(s,n,t.start,t.end,i)}for(const t of s.speedEvents||[]){const s=f.calc2(t.startTime),n=f.calc2(t.endTime);e.pushSpeedEvent(s,n,t.start,t.end)}t.eventLayers.push(e)}e.judgeLineRPE=t}for(const e of s.judgeLineList){const t=e.judgeLineRPE,n=s.judgeLineList[e.father];t.setFather(null==n?void 0:n.judgeLineRPE)}for(const e of s.judgeLineList){const t=e.judgeLineRPE.format({onwarning:e=>a(1,"OtherWarning",`${e}`)});i.judgeLineList.push(t),i.numOfNotes+=t.numOfNotes}return{data:i,messages:o,info:m,line:d,format:r};function l(e,t){-2===e&&a(1,"EasingTypeWarning",`未知的缓动类型:${t.easingType}(将被视为1)\n位于:"${JSON.stringify(t)}"`),-1===e&&a(1,"EasingClipWarning",`检测到easingLeft等于easingRight(将被视为线性)\n位于:"${JSON.stringify(t)}"`),-3===e&&a(1,"EasingClipWarning",`非法的缓动函数(将被视为线性)\n位于:"${JSON.stringify(t)}"`)}}(e,t);for(const e of s.data.judgeLineList)g(e.speedEvents),b(e.judgeLineDisappearEvents),b(e.judgeLineMoveEvents),b(e.judgeLineRotateEvents);return s},N.readInfo=function(e){const t=String(e).split(/\r?\n/),s=[];let n={};for(const e of t)if(e.startsWith("#"))Object.keys(n).length&&s.push(n),n={};else{let[t,s]=e.split(/:(.+)/).map((e=>e.trim()));"Song"===t&&(t="Music"),"Picture"===t&&(t="Image"),t&&(n[t]=s)}return Object.keys(n).length&&s.push(n),s};const M=y;e.use({pattern:/\.(json|pec)$/i,type:"json",read(e,o){const a=M.parseRPE(e.text,e.name),{data:r,messages:m}=t(a.data,e.name),u=s([a.info],o),d=n(a.line,o),{messages:h,format:f}=a;return m.push(...h),{type:"chart",name:e.name,md5:i(e.text),data:r,msg:m,info:u,line:d,format:f}}}),e.use({pattern:/\.pec$/i,type:"text",read(e){const s=M.parse(e.text,e.name),{data:n,messages:o}=t(s.data,e.name),{messages:a,format:r}=s;return o.push(...a),{type:"chart",name:e.name,md5:i(e.text),data:n,msg:o,format:r}}}),e.use({pattern:/^(Settings|info)\.txt$/i,type:"text",mustMatch:!0,read(e,t){const n=e.text;return{type:"info",data:s(M.readInfo(n),t)}}}),Object.hasOwn(self,"webp")&&e.use({pattern:/\.webp$/i,type:"binary",async read(e){var t;const s=await(null==(t=Object.getOwnPropertyDescriptor(self,"webp"))?void 0:t.value.default)(e.buffer),n=await createImageBitmap(s);return{type:"image",name:e.name,data:n}}});
//# sourceMappingURL=reader--RWzZwFfV.js.map
