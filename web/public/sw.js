/*
 * Service worker for the AYUSH kiosk.
 *
 * Clinics on the target deployment routinely lose connectivity mid-session, and
 * a half-finished patient intake is not something to lose to a dropped link.
 * Navigations use network-first so a redeploy is picked up promptly, falling
 * back to the cached shell when the network is gone. Build assets are
 * content-hashed by Next.js, so they are safe to serve cache-first.
 */

const CACHE = "ayush-kiosk-v1";
const OFFLINE_FALLBACK = "index.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(["./", OFFLINE_FALLBACK, "./manifest.webmanifest"]))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Never cache API traffic: a stale OPD queue or a replayed intake submission
  // would be worse than an honest failure the UI can report.
  if (request.method !== "GET" || new URL(request.url).pathname.includes("/api/")) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((hit) => hit ?? caches.match(OFFLINE_FALLBACK))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ??
        fetch(request).then((response) => {
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
