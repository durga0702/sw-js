const cacheName = 'v5';
const cacheAssets = [
    'index.html',
    'about.html',
    'app.css',
    '/js/app.js',
]

// Service worker - Install
self.addEventListener('install', (e)=>{
    console.log('sw: installed');
    e.waitUntill(
        caches
        .open(cacheName)
        .then(cache=>{
            console.log('caching all files');
            cache.addAll(cacheAssets);
        })
        .then(()=>
            self.skipWaiting()
        )
    )
});

// Service worker - Activate
self.addEventListener('activate', (e)=>{
    console.log('sw: activated');
    e.waitUntill(
        caches.keys().then(cacheNames=>{
            console.log(cacheNames)
            return Promise.all(cacheNames.filter(cache=>{
                if(cache !== cacheName){
                    console.log('Clearing old caches');
                    return caches.delete(cache);
                }
            }))
        })
    )
})

// Service worker - Fetch
self.addEventListener('fetch', (e)=>{
    console.log('sw: fetching');
    e.respondWith(
        fetch(e.request).catch(()=>caches.match(e.request))
    )
})
