const C='predicacion-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.add('./')).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith('http')||new URL(e.request.url).hostname==='api.github.com')return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match('./'))));
});
