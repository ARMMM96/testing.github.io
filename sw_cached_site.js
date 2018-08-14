const cacheName = 'v2';

/* const cacheAssets = [

]; */

// Call install Event
self.addEventListener('install', e => {
    console.log('Service Worker:Installed');

});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker:Activated');
    // Remove unwatned caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log("Service Worker: Clearing Old Cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call Fetch EVent
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
        .then(res => {
            /// Make copy/clone of response
            const resClone = res.clone();
            // Open cahce   
            caches 
            .open(cacheName)
            .then(cache => {
                // Add response to chace
                cahce.put(e.request, resClone);
            });
            return res;
        }).catche(err => caches.match(e.request).then(res => res))
    );
})
