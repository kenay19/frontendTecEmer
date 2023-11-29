"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9209],{9209:(X,j,y)=>{y.d(j,{c:()=>ce});var a=y(5861);typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"&&global;var g=function(o){return o.Unimplemented="UNIMPLEMENTED",o.Unavailable="UNAVAILABLE",o}(g||{});class _ extends Error{constructor(e,t,r){super(e),this.message=e,this.code=t,this.data=r}}const N=o=>{var e,t,r,s,n;const d=o.CapacitorCustomPlatform||null,i=o.Capacitor||{},u=i.Plugins=i.Plugins||{},l=o.CapacitorPlatforms,O=(null===(e=null==l?void 0:l.currentPlatform)||void 0===e?void 0:e.getPlatform)||(()=>null!==d?d.name:(o=>{var e,t;return null!=o&&o.androidBridge?"android":null!==(t=null===(e=null==o?void 0:o.webkit)||void 0===e?void 0:e.messageHandlers)&&void 0!==t&&t.bridge?"ios":"web"})(o)),de=(null===(t=null==l?void 0:l.currentPlatform)||void 0===t?void 0:t.isNativePlatform)||(()=>"web"!==O()),ue=(null===(r=null==l?void 0:l.currentPlatform)||void 0===r?void 0:r.isPluginAvailable)||(f=>{const p=D.get(f);return!!(null!=p&&p.platforms.has(O())||J(f))}),J=(null===(s=null==l?void 0:l.currentPlatform)||void 0===s?void 0:s.getPluginHeader)||(f=>{var p;return null===(p=i.PluginHeaders)||void 0===p?void 0:p.find(A=>A.name===f)}),D=new Map,ge=(null===(n=null==l?void 0:l.currentPlatform)||void 0===n?void 0:n.registerPlugin)||((f,p={})=>{const A=D.get(f);if(A)return console.warn(`Capacitor plugin "${f}" already registered. Cannot register plugins twice.`),A.proxy;const L=O(),$=J(f);let w;const ve=function(){var h=(0,a.Z)(function*(){return!w&&L in p?w=w="function"==typeof p[L]?yield p[L]():p[L]:null!==d&&!w&&"web"in p&&(w=w="function"==typeof p.web?yield p.web():p.web),w});return function(){return h.apply(this,arguments)}}(),I=h=>{let m;const P=(...C)=>{const k=ve().then(v=>{const E=((h,m)=>{var P,C;if(!$){if(h)return null===(C=h[m])||void 0===C?void 0:C.bind(h);throw new _(`"${f}" plugin is not implemented on ${L}`,g.Unimplemented)}{const k=null==$?void 0:$.methods.find(v=>m===v.name);if(k)return"promise"===k.rtype?v=>i.nativePromise(f,m.toString(),v):(v,E)=>i.nativeCallback(f,m.toString(),v,E);if(h)return null===(P=h[m])||void 0===P?void 0:P.bind(h)}})(v,h);if(E){const x=E(...C);return m=null==x?void 0:x.remove,x}throw new _(`"${f}.${h}()" is not implemented on ${L}`,g.Unimplemented)});return"addListener"===h&&(k.remove=(0,a.Z)(function*(){return m()})),k};return P.toString=()=>`${h.toString()}() { [capacitor code] }`,Object.defineProperty(P,"name",{value:h,writable:!1,configurable:!1}),P},Y=I("addListener"),Q=I("removeListener"),be=(h,m)=>{const P=Y({eventName:h},m),C=function(){var v=(0,a.Z)(function*(){const E=yield P;Q({eventName:h,callbackId:E},m)});return function(){return v.apply(this,arguments)}}(),k=new Promise(v=>P.then(()=>v({remove:C})));return k.remove=(0,a.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield C()}),k},H=new Proxy({},{get(h,m){switch(m){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return $?be:Y;case"removeListener":return Q;default:return I(m)}}});return u[f]=H,D.set(f,{name:f,proxy:H,platforms:new Set([...Object.keys(p),...$?[L]:[]])}),H});return i.convertFileSrc||(i.convertFileSrc=f=>f),i.getPlatform=O,i.handleError=f=>o.console.error(f),i.isNativePlatform=de,i.isPluginAvailable=ue,i.pluginMethodNoop=(f,p,A)=>Promise.reject(`${A} does not have an implementation of "${p}".`),i.registerPlugin=ge,i.Exception=_,i.DEBUG=!!i.DEBUG,i.isLoggingEnabled=!!i.isLoggingEnabled,i.platform=i.getPlatform(),i.isNative=i.isNativePlatform(),i},R=(o=>o.Capacitor=N(o))(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),G=R.registerPlugin,ee=R.Plugins;class K{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){var r=this;this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n);const d=function(){var u=(0,a.Z)(function*(){return r.removeListener(e,t)});return function(){return u.apply(this,arguments)}}(),i=Promise.resolve({remove:d});return Object.defineProperty(i,"remove",{value:(u=(0,a.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield d()}),function(){return u.apply(this,arguments)})}),i;var u}removeAllListeners(){var e=this;return(0,a.Z)(function*(){e.listeners={};for(const t in e.windowListeners)e.removeWindowListener(e.windowListeners[t]);e.windowListeners={}})()}notifyListeners(e,t){const r=this.listeners[e];r&&r.forEach(s=>s(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:r=>{this.notifyListeners(t,r)}}}unimplemented(e="not implemented"){return new R.Exception(e,g.Unimplemented)}unavailable(e="not available"){return new R.Exception(e,g.Unavailable)}removeListener(e,t){var r=this;return(0,a.Z)(function*(){const s=r.listeners[e];if(!s)return;const n=s.indexOf(t);r.listeners[e].splice(n,1),r.listeners[e].length||r.removeWindowListener(r.windowListeners[e])})()}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const V=o=>encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),z=o=>o.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class te extends K{getCookies(){return(0,a.Z)(function*(){const e=document.cookie,t={};return e.split(";").forEach(r=>{if(r.length<=0)return;let[s,n]=r.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=z(s).trim(),n=z(n).trim(),t[s]=n}),t})()}setCookie(e){return(0,a.Z)(function*(){try{const t=V(e.key),r=V(e.value),s=`; expires=${(e.expires||"").replace("expires=","")}`,n=(e.path||"/").replace("path=",""),d=null!=e.url&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${r||""}${s}; path=${n}; ${d};`}catch(t){return Promise.reject(t)}})()}deleteCookie(e){return(0,a.Z)(function*(){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}})()}clearCookies(){return(0,a.Z)(function*(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(e){return Promise.reject(e)}})()}clearAllCookies(){var e=this;return(0,a.Z)(function*(){try{yield e.clearCookies()}catch(t){return Promise.reject(t)}})()}}G("CapacitorCookies",{web:()=>new te});const re=function(){var o=(0,a.Z)(function*(e){return new Promise((t,r)=>{const s=new FileReader;s.onload=()=>{const n=s.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},s.onerror=n=>r(n),s.readAsDataURL(e)})});return function(t){return o.apply(this,arguments)}}();class ie extends K{request(e){return(0,a.Z)(function*(){const t=((o,e={})=>{const t=Object.assign({method:o.method||"GET",headers:o.headers},e),s=((o={})=>{const e=Object.keys(o);return Object.keys(o).map(s=>s.toLocaleLowerCase()).reduce((s,n,d)=>(s[n]=o[e[d]],s),{})})(o.headers)["content-type"]||"";if("string"==typeof o.data)t.body=o.data;else if(s.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[d,i]of Object.entries(o.data||{}))n.set(d,i);t.body=n.toString()}else if(s.includes("multipart/form-data")){const n=new FormData;if(o.data instanceof FormData)o.data.forEach((i,u)=>{n.append(u,i)});else for(const i of Object.keys(o.data))n.append(i,o.data[i]);t.body=n;const d=new Headers(t.headers);d.delete("content-type"),t.headers=d}else(s.includes("application/json")||"object"==typeof o.data)&&(t.body=JSON.stringify(o.data));return t})(e,e.webFetchExtra),r=((o,e=!0)=>o?Object.entries(o).reduce((r,s)=>{const[n,d]=s;let i,u;return Array.isArray(d)?(u="",d.forEach(l=>{i=e?encodeURIComponent(l):l,u+=`${n}=${i}&`}),u.slice(0,-1)):(i=e?encodeURIComponent(d):d,u=`${n}=${i}`),`${r}&${u}`},"").substr(1):null)(e.params,e.shouldEncodeUrlParams),s=r?`${e.url}?${r}`:e.url,n=yield fetch(s,t),d=n.headers.get("content-type")||"";let u,l,{responseType:i="text"}=n.ok?e:{};switch(d.includes("application/json")&&(i="json"),i){case"arraybuffer":case"blob":l=yield n.blob(),u=yield re(l);break;case"json":u=yield n.json();break;default:u=yield n.text()}const Z={};return n.headers.forEach((O,W)=>{Z[W]=O}),{data:u,headers:Z,status:n.status,url:n.url}})()}get(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"GET"}))})()}post(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"POST"}))})()}put(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PUT"}))})()}patch(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PATCH"}))})()}delete(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"DELETE"}))})()}}G("CapacitorHttp",{web:()=>new ie});var q=y(6689),ae=y(151);const{CapacitorAudio:M}=ee;let ce=(()=>{var o;class e{constructor(r){this.products=r,this.chunks=[],this.datos=" "}startRecord(){var r=this;return(0,a.Z)(function*(){return r.datos="",r.stream=yield navigator.mediaDevices.getUserMedia({audio:{sampleRate:48e3}}),r.stream.getAudioTracks(),r.mediaRecorder=new MediaRecorder(r.stream),new Promise((n,d)=>{r.mediaRecorder.ondataavailable=i=>{r.chunks.push(i.data)},r.mediaRecorder.onstop=(0,a.Z)(function*(){const i=new Blob(r.chunks,{type:"audio/wav"});try{r.datos=yield r.products.getTranscription(i).toPromise(),n(r.datos)}catch(u){d(u)}}),r.mediaRecorder.start()})})()}stopRecord(){var r=this;return(0,a.Z)(function*(){return new Promise(function(){var s=(0,a.Z)(function*(n){r.mediaRecorder&&"inactive"!==r.mediaRecorder.state&&(yield r.mediaRecorder.stop(),r.stream.getTracks().forEach(d=>d.stop())),n(r.datos)});return function(n){return s.apply(this,arguments)}}())})()}startRecording(r=48e3){var s=this;return(0,a.Z)(function*(){if(!R.isPluginAvailable("CapacitorAudio"))throw new Error("El plugin Capacitor Audio no est\xe1 disponible en este dispositivo.");try{if((yield M.requestPermissions()).granted)return s.audioRecorder=yield M.startRecording(),s.audioRecorder;throw new Error("Permiso denegado para acceder al micr\xf3fono.")}catch(n){throw new Error("Error al iniciar la grabaci\xf3n: "+n)}})()}stopRecording(){var r=this;return(0,a.Z)(function*(){if(r.audioRecorder)try{const s=yield M.stopRecording();return r.audioRecorder=null,s.path}catch(s){throw new Error("Error al detener la grabaci\xf3n: "+s)}})()}}return(o=e).\u0275fac=function(r){return new(r||o)(q.LFG(ae.s))},o.\u0275prov=q.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),e})()},151:(X,j,y)=>{y.d(j,{s:()=>B});var a=y(9862),U=y(6689);let B=(()=>{var b;class T{constructor(c){this.product=c}getProductsids(c){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProductsIds",{idVendedor:c})}getProducts(c){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProducts",{idVendedor:c})}getProduct(c){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProduct",{idProduct:c})}getImageProducts(c){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getImageProducts",c,{responseType:"blob"})}updateProduct(c){return this.product.put("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/updateProduct",c)}deleteProduct(c){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/deleteProduct",{idEquipoMedico:c})}getProductsDonador(){return this.product.get("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProductsDonador")}findProduct(c){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/findProduct",[c])}getCoordenates(c){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getCoordenates",{idVendedor:c})}compraVenta(c,g){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/compraVenta",{idEquipoMedico:c,idUsuario:g})}getProductsSolicitante(){return this.product.get("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getProductsSolicitante")}donacionAsignada(c,g){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/DonacionAsignada",{idEquipoMedico:c,idSolicitante:g})}getDonacionesAsignadas(c){return this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/getDonacionesAsignadas",{idSolicitante:c})}getTranscription(c){const g=new a.WM;g.append("Content-Type","multipar/form-data");const _=new FormData;return _.append("audioBlob",c,"audio.wav"),this.product.post("https://saludonlinehub-4215a7ac39d8.herokuapp.com/medictools/transcribe",_,{headers:g})}}return(b=T).\u0275fac=function(c){return new(c||b)(U.LFG(a.eN))},b.\u0275prov=U.Yz7({token:b,factory:b.\u0275fac,providedIn:"root"}),T})()}}]);