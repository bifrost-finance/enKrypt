import"./modulepreload-polyfill.b7f2da20.js";import{b as d,u as P,c as C,s as U}from"./vendor.1d56efb5.js";var W=Object.defineProperty,A=Object.defineProperties,F=Object.getOwnPropertyDescriptors,D=Object.getOwnPropertySymbols,B=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable,L=(e,t,n)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,$=(e,t)=>{for(var n in t||(t={}))B.call(t,n)&&L(e,n,t[n]);if(D)for(var n of D(t))z.call(t,n)&&L(e,n,t[n]);return e},S=(e,t)=>A(e,F(t)),H=/^((?:background$)|devtools|popup|options|content-script|window)(?:@(\d+)(?:\.(\d+))?)?$/,N=e=>{const[,t,n,o]=e.match(H)||[];return{context:t,tabId:+n,frameId:o?+o:void 0}},_=e=>d[e],Q=()=>{var e,t,n;const o=d.runtime.getManifest();if(typeof window=="undefined")return"background";const c=((e=o.browser_action)==null?void 0:e.default_popup)||((t=o.action)==null?void 0:t.default_popup);return c&&new URL(d.runtime.getURL(c)).pathname===window.location.pathname?"popup":((n=o.options_ui)==null?void 0:n.page)&&new URL(d.runtime.getURL(o.options_ui.page)).pathname===window.location.pathname?"options":"background"},s=_("devtools")?"devtools":_("tabs")?Q():_("extension")?"content-script":typeof document!="undefined"?"window":null,O=P(),b=new Map,j=new Map,h=new Set,v=new Map,l=null,g,R,V=async e=>{const{transactionId:t,messageID:n,messageType:o}=e,c=()=>{const a=b.get(t);if(a){const{err:i,data:p}=e;if(i){const u=i,E=self[u.name],k=new(typeof E=="function"?E:Error)(u.message);Object.keys(u).forEach(T=>{k[T]=u[T]}),a.reject(k)}else a.resolve(p);b.delete(t)}},r=async()=>{let a,i,p=!1;try{const u=j.get(n);if(typeof u=="function")a=await u({sender:e.origin,id:n,data:e.data,timestamp:e.timestamp});else throw p=!0,new Error(`[webext-bridge] No handler registered in '${s}' to accept messages with id '${n}'`)}catch(u){i=u}finally{if(i&&(e.err=U(i)),f(S($({},e),{messageType:"reply",data:a,origin:{context:s,tabId:null},destination:e.origin,hops:[]})),i&&!p)throw a}};switch(o){case"reply":return c();case"message":return r();default:throw new Error("unknown message type")}},G=()=>{if(s===null)throw new Error("Unable to detect runtime context i.e webext-bridge can't figure out what to do");if((s==="window"||s==="content-script")&&window.addEventListener("message",J),s==="content-script"&&top===window&&(l=d.runtime.connect(),l.onMessage.addListener(e=>{f(e)})),s==="content-script"&&top!==window&&(l=d.runtime.connect(),l.onMessage.addListener(e=>{f(e)})),s==="devtools"){const{tabId:e}=d.devtools.inspectedWindow,t=`devtools@${e}`;l=d.runtime.connect(void 0,{name:t}),l.onMessage.addListener(n=>{f(n)}),l.onDisconnect.addListener(()=>{l=null})}if(s==="popup"||s==="options"){const e=`${s}`;l=d.runtime.connect(void 0,{name:e}),l.onMessage.addListener(t=>{f(t)}),l.onDisconnect.addListener(()=>{l=null})}s==="background"&&d.runtime.onConnect.addListener(e=>{let t=e.name||`content-script@${e.sender.tab.id}`;const n=e.sender.frameId;n&&(t=`${t}.${n}`);const{context:o,tabId:c}=N(t);!c&&o!=="popup"&&o!=="options"||(v.set(t,e),h.forEach(r=>{r.resolvedDestination===t&&(e.postMessage(r.message),h.delete(r))}),e.onDisconnect.addListener(()=>{v.delete(t)}),e.onMessage.addListener(r=>{var a;((a=r==null?void 0:r.origin)==null?void 0:a.context)&&(r.origin.tabId=c,f(r))}))})};G();var f=e=>{const{origin:t,destination:n}=e;if(!e.hops.includes(O)&&(e.hops.push(O),!(s==="content-script"&&[n,t].some(o=>(o==null?void 0:o.context)==="window")&&!R))){if(!n){V(e);return}if(n.context){if(s==="window")y(window,e);else if(s==="content-script"&&n.context==="window")e.destination=null,y(window,e);else if(["devtools","content-script","popup","options"].includes(s))n.context==="background"&&(e.destination=null),l.postMessage(e);else if(s==="background"){const{context:o,tabId:c,frameId:r}=n,{tabId:a}=t;o!=="window"?e.destination=null:e.destination.tabId=null;let i=["popup","options"].includes(o)?o:`${o==="window"?"content-script":o}@${c||a}`;r&&(i=`${i}.${r}`);const p=v.get(i);p?p.postMessage(e):h.add({resolvedDestination:i,message:e})}}}};async function J({data:e,ports:t}){if(!(s==="content-script"&&!R)){if(e.cmd==="__crx_bridge_verify_listening"&&e.scope===g&&e.context!==s)t[0].postMessage(!0);else if(e.cmd==="__crx_bridge_route_message"&&e.scope===g&&e.context!==s){const{payload:n}=e;s==="content-script"&&(n.origin={context:"window",tabId:null}),f(n)}}}var y=(e,t)=>{K();const n=new MessageChannel,o=setTimeout(()=>{n.port1.onmessage=null,y(e,t)},300);n.port1.onmessage=()=>{clearTimeout(o),e.postMessage({cmd:"__crx_bridge_route_message",scope:g,context:s,payload:t},"*")},e.postMessage({cmd:"__crx_bridge_verify_listening",scope:g,context:s},"*",[n.port2])};function K(){throw new Error(`webext-bridge uses window.postMessage to talk with other "window"(s), for message routing and stuff,which is global/conflicting operation in case there are other scripts using webext-bridge. Call Bridge#setNamespace(nsps) to isolate your app. Example: setNamespace('com.facebook.react-devtools'). Make sure to use same namespace across all your scripts whereever window.postMessage is likely to be used\``)}function x(e,t){j.set(e,t)}async function I(e,t,n="background"){const o=typeof n=="string"?N(n):n,c="Bridge#sendMessage ->";if(!o.context)throw new TypeError(`${c} Destination must be any one of known destinations`);if(s==="background"){const{context:r,tabId:a}=o;if(r!=="background"&&!a)throw new TypeError(`${c} When sending messages from background page, use @tabId syntax to target specific tab`)}return new Promise((r,a)=>{const i={messageID:e,data:t,destination:o,messageType:"message",transactionId:P(),origin:{context:s,tabId:null},hops:[],timestamp:Date.now()};b.set(i.transactionId,{resolve:r,reject:a}),f(i)})}var w=class{constructor(e){this.handleStreamClose=()=>{this.isClosed||(this.isClosed=!0,this.emitter.emit("closed",!0),this.emitter.events={})},this.internalInfo=e,this.emitter=C(),this.isClosed=!1,w.initDone||(x("__crx_bridge_stream_transfer__",t=>{const{streamId:n,streamTransfer:o,action:c}=t.data,r=w.openStreams.get(n);r&&!r.isClosed&&(c==="transfer"&&r.emitter.emit("message",o),c==="close"&&(w.openStreams.delete(n),r.handleStreamClose()))}),w.initDone=!0),w.openStreams.set(e.streamId,this)}get info(){return this.internalInfo}send(e){if(this.isClosed)throw new Error("Attempting to send a message over closed stream. Use stream.onClose(<callback>) to keep an eye on stream status");I("__crx_bridge_stream_transfer__",{streamId:this.internalInfo.streamId,streamTransfer:e,action:"transfer"},this.internalInfo.endpoint)}close(e){e&&this.send(e),this.handleStreamClose(),I("__crx_bridge_stream_transfer__",{streamId:this.internalInfo.streamId,streamTransfer:null,action:"close"},this.internalInfo.endpoint)}onMessage(e){return this.getDisposable("message",e)}onClose(e){return this.getDisposable("closed",e)}getDisposable(e,t){const n=this.emitter.on(e,t);return Object.assign(n,{dispose:n,close:n})}},M=w;M.initDone=!1;M.openStreams=new Map;var X=new Map,Y=C();x("__crx_bridge_stream_open__",e=>new Promise(t=>{const{sender:n,data:o}=e,{channel:c}=o;let r=!1,a;const i=()=>{const p=X.get(c);typeof p=="function"?(p(new M(S($({},o),{endpoint:n}))),r&&a(),t(!0)):r||(r=!0,a=Y.on("did-change-stream-callbacks",i))};i()}));d.runtime.onInstalled.addListener(()=>{console.log("Extension installed")});let m=0;d.tabs.onActivated.addListener(async({tabId:e})=>{if(!m){m=e;return}let t;try{t=await d.tabs.get(m),m=e}catch{return}console.log("previous tab",t),I("tab-prev",{title:t.title},{context:"content-script",tabId:e})});x("get-current-tab",async()=>{try{const e=await d.tabs.get(m);return{title:e==null?void 0:e.title}}catch{return{title:void 0}}});