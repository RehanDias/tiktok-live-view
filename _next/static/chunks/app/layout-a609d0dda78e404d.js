(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{6435:function(e,t,n){"use strict";n.d(t,{F:function(){return u},f:function(){return c}});var r=n(2265);let l=["light","dark"],o="(prefers-color-scheme: dark)",a="undefined"==typeof window,i=(0,r.createContext)(void 0),s={setTheme:e=>{},themes:[]},u=()=>{var e;return null!==(e=(0,r.useContext)(i))&&void 0!==e?e:s},c=e=>(0,r.useContext)(i)?r.createElement(r.Fragment,null,e.children):r.createElement(f,e),d=["light","dark"],f=({forcedTheme:e,disableTransitionOnChange:t=!1,enableSystem:n=!0,enableColorScheme:a=!0,storageKey:s="theme",themes:u=d,defaultTheme:c=n?"system":"light",attribute:f="data-theme",value:b,children:v,nonce:_})=>{let[g,E]=(0,r.useState)(()=>h(s,c)),[S,w]=(0,r.useState)(()=>h(s)),C=b?Object.values(b):u,O=(0,r.useCallback)(e=>{let r=e;if(!r)return;"system"===e&&n&&(r=y());let o=b?b[r]:r,i=t?p():null,s=document.documentElement;if("class"===f?(s.classList.remove(...C),o&&s.classList.add(o)):o?s.setAttribute(f,o):s.removeAttribute(f),a){let e=l.includes(c)?c:null,t=l.includes(r)?r:e;s.style.colorScheme=t}null==i||i()},[]),k=(0,r.useCallback)(e=>{E(e);try{localStorage.setItem(s,e)}catch(e){}},[e]),I=(0,r.useCallback)(t=>{let r=y(t);w(r),"system"===g&&n&&!e&&O("system")},[g,e]);(0,r.useEffect)(()=>{let e=window.matchMedia(o);return e.addListener(I),I(e),()=>e.removeListener(I)},[I]),(0,r.useEffect)(()=>{let e=e=>{e.key===s&&k(e.newValue||c)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[k]),(0,r.useEffect)(()=>{O(null!=e?e:g)},[e,g]);let T=(0,r.useMemo)(()=>({theme:g,setTheme:k,forcedTheme:e,resolvedTheme:"system"===g?S:g,themes:n?[...u,"system"]:u,systemTheme:n?S:void 0}),[g,k,e,S,n,u]);return r.createElement(i.Provider,{value:T},r.createElement(m,{forcedTheme:e,disableTransitionOnChange:t,enableSystem:n,enableColorScheme:a,storageKey:s,themes:u,defaultTheme:c,attribute:f,value:b,children:v,attrs:C,nonce:_}),v)},m=(0,r.memo)(({forcedTheme:e,storageKey:t,attribute:n,enableSystem:a,enableColorScheme:i,defaultTheme:s,value:u,attrs:c,nonce:d})=>{let f="system"===s,m="class"===n?`var d=document.documentElement,c=d.classList;c.remove(${c.map(e=>`'${e}'`).join(",")});`:`var d=document.documentElement,n='${n}',s='setAttribute';`,h=i?l.includes(s)&&s?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${s}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",p=(e,t=!1,r=!0)=>{let o=u?u[e]:e,a=t?e+"|| ''":`'${o}'`,s="";return i&&r&&!t&&l.includes(e)&&(s+=`d.style.colorScheme = '${e}';`),"class"===n?s+=t||o?`c.add(${a})`:"null":o&&(s+=`d[s](n,${a})`),s},y=e?`!function(){${m}${p(e)}}()`:a?`!function(){try{${m}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${f})){var t='${o}',m=window.matchMedia(t);if(m.media!==t||m.matches){${p("dark")}}else{${p("light")}}}else if(e){${u?`var x=${JSON.stringify(u)};`:""}${p(u?"x[e]":"e",!0)}}${f?"":"else{"+p(s,!1,!1)+"}"}${h}}catch(e){}}()`:`!function(){try{${m}var e=localStorage.getItem('${t}');if(e){${u?`var x=${JSON.stringify(u)};`:""}${p(u?"x[e]":"e",!0)}}else{${p(s,!1,!1)};}${h}}catch(t){}}();`;return r.createElement("script",{nonce:d,dangerouslySetInnerHTML:{__html:y}})},()=>!0),h=(e,t)=>{let n;if(!a){try{n=localStorage.getItem(e)||void 0}catch(e){}return n||t}},p=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},y=e=>(e||(e=window.matchMedia(o)),e.matches?"dark":"light")},3129:function(e,t,n){Promise.resolve().then(n.t.bind(n,8877,23)),Promise.resolve().then(n.bind(n,4657)),Promise.resolve().then(n.t.bind(n,4244,23)),Promise.resolve().then(n.t.bind(n,936,23))},4657:function(e,t,n){"use strict";n.r(t),n.d(t,{ThemeProvider:function(){return o}});var r=n(7437);n(2265);var l=n(6435);function o(e){let{children:t,...n}=e;return(0,r.jsx)(l.f,{...n,children:t})}},3443:function(e,t){"use strict";let n;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{DOMAttributeNames:function(){return r},isEqualNode:function(){return o},default:function(){return a}});let r={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv",noModule:"noModule"};function l(e){let{type:t,props:n}=e,l=document.createElement(t);for(let e in n){if(!n.hasOwnProperty(e)||"children"===e||"dangerouslySetInnerHTML"===e||void 0===n[e])continue;let o=r[e]||e.toLowerCase();"script"===t&&("async"===o||"defer"===o||"noModule"===o)?l[o]=!!n[e]:l.setAttribute(o,n[e])}let{children:o,dangerouslySetInnerHTML:a}=n;return a?l.innerHTML=a.__html||"":o&&(l.textContent="string"==typeof o?o:Array.isArray(o)?o.join(""):""),l}function o(e,t){if(e instanceof HTMLElement&&t instanceof HTMLElement){let n=t.getAttribute("nonce");if(n&&!e.getAttribute("nonce")){let r=t.cloneNode(!0);return r.setAttribute("nonce",""),r.nonce=n,n===e.nonce&&e.isEqualNode(r)}}return e.isEqualNode(t)}function a(){return{mountedInstances:new Set,updateHead:e=>{let t={};e.forEach(e=>{if("link"===e.type&&e.props["data-optimized-fonts"]){if(document.querySelector('style[data-href="'+e.props["data-href"]+'"]'))return;e.props.href=e.props["data-href"],e.props["data-href"]=void 0}let n=t[e.type]||[];n.push(e),t[e.type]=n});let r=t.title?t.title[0]:null,l="";if(r){let{children:e}=r.props;l="string"==typeof e?e:Array.isArray(e)?e.join(""):""}l!==document.title&&(document.title=l),["meta","base","link","style","script"].forEach(e=>{n(e,t[e]||[])})}}}n=(e,t)=>{let n=document.getElementsByTagName("head")[0],r=n.querySelector("meta[name=next-head-count]"),a=Number(r.content),i=[];for(let t=0,n=r.previousElementSibling;t<a;t++,n=(null==n?void 0:n.previousElementSibling)||null){var s;(null==n?void 0:null==(s=n.tagName)?void 0:s.toLowerCase())===e&&i.push(n)}let u=t.map(l).filter(e=>{for(let t=0,n=i.length;t<n;t++){let n=i[t];if(o(n,e))return i.splice(t,1),!1}return!0});i.forEach(e=>{var t;return null==(t=e.parentNode)?void 0:t.removeChild(e)}),u.forEach(e=>n.insertBefore(e,r)),r.content=(a-i.length+u.length).toString()},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4913:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{requestIdleCallback:function(){return n},cancelIdleCallback:function(){return r}});let n="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},r="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4244:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{handleClientScriptLoad:function(){return p},initScriptLoader:function(){return y},default:function(){return v}});let r=n(1024),l=n(8533),o=r._(n(4887)),a=l._(n(2265)),i=n(3305),s=n(3443),u=n(4913),c=new Map,d=new Set,f=["onLoad","onReady","dangerouslySetInnerHTML","children","onError","strategy","stylesheets"],m=e=>{if(o.default.preinit){e.forEach(e=>{o.default.preinit(e,{as:"style"})});return}{let t=document.head;e.forEach(e=>{let n=document.createElement("link");n.type="text/css",n.rel="stylesheet",n.href=e,t.appendChild(n)})}},h=e=>{let{src:t,id:n,onLoad:r=()=>{},onReady:l=null,dangerouslySetInnerHTML:o,children:a="",strategy:i="afterInteractive",onError:u,stylesheets:h}=e,p=n||t;if(p&&d.has(p))return;if(c.has(t)){d.add(p),c.get(t).then(r,u);return}let y=()=>{l&&l(),d.add(p)},b=document.createElement("script"),v=new Promise((e,t)=>{b.addEventListener("load",function(t){e(),r&&r.call(this,t),y()}),b.addEventListener("error",function(e){t(e)})}).catch(function(e){u&&u(e)});for(let[n,r]of(o?(b.innerHTML=o.__html||"",y()):a?(b.textContent="string"==typeof a?a:Array.isArray(a)?a.join(""):"",y()):t&&(b.src=t,c.set(t,v)),Object.entries(e))){if(void 0===r||f.includes(n))continue;let e=s.DOMAttributeNames[n]||n.toLowerCase();b.setAttribute(e,r)}"worker"===i&&b.setAttribute("type","text/partytown"),b.setAttribute("data-nscript",i),h&&m(h),document.body.appendChild(b)};function p(e){let{strategy:t="afterInteractive"}=e;"lazyOnload"===t?window.addEventListener("load",()=>{(0,u.requestIdleCallback)(()=>h(e))}):h(e)}function y(e){e.forEach(p),function(){let e=[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')];e.forEach(e=>{let t=e.id||e.getAttribute("src");d.add(t)})}()}function b(e){let{id:t,src:n="",onLoad:r=()=>{},onReady:l=null,strategy:s="afterInteractive",onError:c,stylesheets:f,...m}=e,{updateScripts:p,scripts:y,getIsSsr:b,appDir:v,nonce:_}=(0,a.useContext)(i.HeadManagerContext),g=(0,a.useRef)(!1);(0,a.useEffect)(()=>{let e=t||n;g.current||(l&&e&&d.has(e)&&l(),g.current=!0)},[l,t,n]);let E=(0,a.useRef)(!1);if((0,a.useEffect)(()=>{!E.current&&("afterInteractive"===s?h(e):"lazyOnload"===s&&("complete"===document.readyState?(0,u.requestIdleCallback)(()=>h(e)):window.addEventListener("load",()=>{(0,u.requestIdleCallback)(()=>h(e))})),E.current=!0)},[e,s]),("beforeInteractive"===s||"worker"===s)&&(p?(y[s]=(y[s]||[]).concat([{id:t,src:n,onLoad:r,onReady:l,onError:c,...m}]),p(y)):b&&b()?d.add(t||n):b&&!b()&&h(e)),v){if(f&&f.forEach(e=>{o.default.preinit(e,{as:"style"})}),"beforeInteractive"===s)return n?(o.default.preload(n,m.integrity?{as:"script",integrity:m.integrity}:{as:"script"}),a.default.createElement("script",{nonce:_,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([n])+")"}})):(m.dangerouslySetInnerHTML&&(m.children=m.dangerouslySetInnerHTML.__html,delete m.dangerouslySetInnerHTML),a.default.createElement("script",{nonce:_,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([0,{...m}])+")"}}));"afterInteractive"===s&&n&&o.default.preload(n,m.integrity?{as:"script",integrity:m.integrity}:{as:"script"})}return null}Object.defineProperty(b,"__nextScript",{value:!0});let v=b;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8877:function(){},936:function(e){e.exports={style:{fontFamily:"'__Inter_c122b2', '__Inter_Fallback_c122b2'",fontStyle:"normal"},className:"__className_c122b2"}},622:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(2265),l=Symbol.for("react.element"),o=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,i=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,n){var r,o={},u=null,c=null;for(r in void 0!==n&&(u=""+n),void 0!==t.key&&(u=""+t.key),void 0!==t.ref&&(c=t.ref),t)a.call(t,r)&&!s.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:l,type:e,key:u,ref:c,props:o,_owner:i.current}}t.Fragment=o,t.jsx=u,t.jsxs=u},7437:function(e,t,n){"use strict";e.exports=n(622)}},function(e){e.O(0,[971,864,744],function(){return e(e.s=3129)}),_N_E=e.O()}]);