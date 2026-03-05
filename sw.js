// 清除所有快取並自我登出
self.addEventListener(‘install’,()=>self.skipWaiting());
self.addEventListener(‘activate’,e=>{
e.waitUntil(
caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k))))
.then(()=>self.clients.claim())
.then(()=>self.registration.unregister())
);
});