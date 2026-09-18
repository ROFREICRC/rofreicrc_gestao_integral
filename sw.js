const CACHE_NAME = 'rofreicrc-v1';

const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './LOGO RCRC.jpg',
    './LOGO RCRC-192.jpg',
    './LOGO RCRC-512.jpg'
];


self.addEventListener('install', function(event) {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {

                return cache.addAll(ASSETS);

            })
    );

    self.skipWaiting();

});


self.addEventListener('activate', function(event) {

    event.waitUntil(
        caches.keys().then(function(keys) {

            return Promise.all(

                keys.map(function(key) {

                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }

                })

            );

        })
    );

    self.clients.claim();

});


self.addEventListener('fetch', function(event) {

    if (event.request.method !== 'GET') {
        return;
    }

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        fetch(event.request)
            .then(function(response) {

                return response;

            })
            .catch(function() {

                return caches.match(event.request);

            })

    );

});
