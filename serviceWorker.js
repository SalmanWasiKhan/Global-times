const cacheStatic = "globeTimes-v12";
const assets = [
  "/Global-times/",
  "/Global-times/index.html",
  "/Global-times/static/js/main.dd4be5df.chunk.js",
  "/Global-times/static/js/2.96f06ac5.chunk.js",
  "/Global-times/static/css/main.539f00e2.chunk.css",
  "/Global-times/logo144.png",
  "/Global-times/logo96.png",
  "/Global-times/manifest.json",
  "/Global-times/serviceWorker.js",
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
