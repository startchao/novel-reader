const CACHE=‘novel-reader-v9’;
self.addEventListener(‘install’,e=>{
self.skipWaiting();
e.waitUntil(caches.open(CACHE).then(c=>c.addAll([’./’,’./index.html’])));
});
self.addEventListener(‘activate’,e=>{
e.waitUntil(
caches.keys().then(ks=>Promise.all(
ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))
))
);
self.clients.claim();
});
self.addEventListener(‘fetch’,e=>{
// 永遠先嘗試網路，失敗才用快取
e.respondWith(
fetch(e.request).then(r=>{
const clone=r.clone();
caches.open(CACHE).then(c=>c.put(e.request,clone));
return r;
}).catch(()=>caches.match(e.request))
);
});