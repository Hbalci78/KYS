const CACHE='khsl-kys-v1';
const SHELL=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icons/kys-icon-192.png','./icons/kys-icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.hostname.includes('googleapis.com')||url.hostname.includes('google.com')||url.hostname.includes('script.google.com')) return;
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok&&url.origin===location.origin){const clone=res.clone();caches.open(CACHE).then(c=>c.put(req,clone));}return res;}).catch(()=>cached)));
});
