const CACHE_NAME = 'electropro-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  '/static/js/bundle.js',
  '/static/css/main.chunk.css',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Always fetch from network for API calls
  if (event.request.url.includes('supabase')) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0a0a0f" />
    <meta name="description" content="Najib Cell Management System" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Najib Cell</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

{
  "short_name": "Najib Cell",
  "name": "Najib Cell Management",
  "description": "Manage your business — invoices, inventory, clients, suppliers",
  "icons": [
    { "src": "icon-192.png", "type": "image/png", "sizes": "192x192", "purpose": "any maskable" },
    { "src": "icon-512.png", "type": "image/png", "sizes": "512x512", "purpose": "any maskable" }
  ],
  "start_url": ".",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#00e5ff",
  "background_color": "#0a0a0f",
  "categories": ["business", "finance"]
}
