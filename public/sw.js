const CURRENT_CACHE = "shell-content1";
const cacheFiles = ["/"];
const regex = /socket.io/g;

self.addEventListener("activate", (evt) =>
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CURRENT_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  )
);

// on install we download the routes we want to cache for offline
self.addEventListener("install", (evt) =>
  evt.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  )
);

// fetch the resource from the network
const fromNetwork = (request, timeout) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
      update(request);
    }, reject);
  });

// fetch the resource from the browser cache
const fromCache = (request) =>
  caches
    .open(CURRENT_CACHE)
    .then((cache) => cache.match(request).then((matching) => matching || cache.match("/offline/")));

// cache the current page to make it available for offline
const update = (request) => {
  if (regex.test(request.url)) return;
  caches
    .open(CURRENT_CACHE)
    .then((cache) => fetch(request).then((response) => cache.put(request, response)));
};

// general strategy when making a request (eg if online try to fetch it
// from the network with a timeout, if something fails serve from cache)
self.addEventListener("fetch", (evt) => {
  evt.respondWith(fromNetwork(evt.request, 1500).catch(() => fromCache(evt.request)));
  evt.waitUntil(update(evt.request));
});
