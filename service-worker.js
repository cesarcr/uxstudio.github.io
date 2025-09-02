
const CACHE = 'uxstudio-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './assets/img/hero.jpg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  // CDNs no se cachean aquí; el navegador lo gestiona.
];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (e)=>{
  const req = e.request;
  // Estrategia: network-first para HTML, cache-first para estáticos locales
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('/index.html')));
  } else if (ASSETS.some(p=>req.url.endsWith(p))) {
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
  }
});
