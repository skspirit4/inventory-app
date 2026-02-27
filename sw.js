const CACHE_NAME = 'inventory-v5';

self.addEventListener('install', (e) => {
  self.skipWaiting(); // 强制跳过等待，立即安装
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key))); // 清除旧缓存
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
