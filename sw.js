// Este nombre se genera solo con la fecha para forzar la actualización si es necesario
const CACHE_NAME = 'rofreicrc-' + new Date().getTime();
const assets = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
    // Elimina cachés viejos automáticamente para que no den error 404
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
