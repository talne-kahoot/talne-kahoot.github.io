if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const d=e=>n(e,o),t={module:{uri:o},exports:c,require:d};i[o]=Promise.all(r.map((e=>t[e]||d(e)))).then((e=>(s(...e),c)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"4ec50faab9cc392ae024cd202872d103"},{url:"assets/index-8da5135f.css",revision:null},{url:"assets/index-bdab4adb.js",revision:null},{url:"index.html",revision:"4b87ed1570ec89af8c3738458eea9bd6"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"android-chrome-192x192.png",revision:"e734fb3af0892b85d693aea2245a46e8"},{url:"android-chrome-512x512.png",revision:"07dfb7d7fdf9e7eccb7a07987c2852a1"},{url:"favicon.ico",revision:"33c4624b310cc88f6a2898449ff23d99"},{url:"apple-touch-icon.png",revision:"c43659bc11f87b88316d29e7d5484b78"},{url:"manifest.webmanifest",revision:"aae144867f0e50bf9c93c49cd4a9d6e0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
