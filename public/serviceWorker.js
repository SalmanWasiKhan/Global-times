const cacheStatic = "globeTimes-v11";
const assets = [
  "/",
  "/index.html",
  "/static/js/main.chunk.js",
  "/static/js/1.chunk.js",
  "/static/js/bundle.js",
  "/logo144.png",
  "/logo96.png",
  "/manifest.json",
];

// Install service worker
self.addEventListener("install", (e) => {
  // console.log("Service worker installed");
  e.waitUntil(
    caches.open(cacheStatic).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// Activate service worker
self.addEventListener("activate", (e) => {
  console.log("Service worker activated");
});

// fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
