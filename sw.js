if(!self.define){let e,i={};const r=(r,n)=>(r=new URL(r+".js",n).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(n,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let d={};const t=e=>r(e,o),l={module:{uri:o},exports:d,require:t};i[o]=Promise.all(n.map((e=>l[e]||t(e)))).then((e=>(s(...e),d)))}}define(["./workbox-f78b6354"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"404.html",revision:"9edae3e1d90f4e82282eb8862747ec0a"},{url:"assets/index-b0b4340a.js",revision:null},{url:"assets/index-cc140268.css",revision:null},{url:"index.html",revision:"f5b6ed4b4dc44974b114c33bdd4c8732"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"android-chrome-192x192.png",revision:"822dbac169f8fa2bad434b6f9bb0a724"},{url:"android-chrome-512x512.png",revision:"a207fe136295a9171743c004d21d7b41"},{url:"manifest.webmanifest",revision:"420356d46db044e85435b8ba981049be"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
