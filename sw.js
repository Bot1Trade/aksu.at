/* aksu.at Service Worker – offline spielbar, Updates kommen automatisch */
const CACHE = 'aksu-v7';
const CORE = ['/', '/index.html', '/style.css?v=5', '/app.js', '/common.js?v=2', '/404.html',
  '/tetris.html', '/breakout.html', '/memory.html', '/minesweeper.html', '/snake.html', '/2048.html', '/tictactoe.html',
  '/icon-192.png', '/font-inter-400.woff2', '/font-inter-500.woff2', '/font-inter-600.woff2', '/font-inter-700.woff2',
  '/font-space-grotesk-500.woff2', '/font-space-grotesk-600.woff2', '/font-space-grotesk-700.woff2', '/font-jetbrains-mono-400.woff2', '/font-jetbrains-mono-500.woff2', '/icon-512.png', '/manifest.webmanifest'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  if (!sameOrigin) return; // Wetter, Formular usw. immer live
  if (req.mode === 'navigate') {
    // Seiten: zuerst Netz (immer aktuell), offline aus dem Cache
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('/index.html'))));
    return;
  }
  // Dateien: sofort aus dem Cache, im Hintergrund aktualisieren
  e.respondWith(caches.match(req).then(cached => {
    const net = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => cached);
    return cached || net;
  }));
});
