const cacheStatic = "globeTimes-v12";
const assets = [
  "/",
  "/index.html",
  "/static/js/main.dd4be5df.chunk.js",
  "/static/js/2.96f06ac5.chunk.js",
  "/static/css/main.539f00e2.chunk.css",
  "/logo144.png",
  "/logo96.png",
  "/manifest.json",
  "/serviceWorker.js",
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
self.addEventListener("activate", function (event) {
  var cacheAllowlist = [cacheStatic];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
