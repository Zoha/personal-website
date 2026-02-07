const CACHE_NAME = 'zoha-portfolio-v1';
const STATIC_ASSETS = [
  '/',
  '/fonts/inter-latin.woff2',
  '/fonts/jetbrains-mono-latin.woff2',
  '/face.jpg',
  '/vite.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/fonts/') || 
      event.request.url.includes('/assets/') ||
      event.request.url.endsWith('.jpg') ||
      event.request.url.endsWith('.svg')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
    );
  }
});
