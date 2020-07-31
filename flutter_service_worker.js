'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "2a7e450da3896da3fa53929e4aebcfa1",
"/": "2a7e450da3896da3fa53929e4aebcfa1",
"main.dart.js": "4b7319a3d72c8aeafd4dc78601905cc8",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "0ef26dabb86c4749c7df45a3522cac08",
"assets/AssetManifest.json": "e138d3ecd456b1421d8bdc99b13fb75c",
"assets/NOTICES": "cf3e425eaf9a574740320ac017581252",
"assets/FontManifest.json": "dbd4605c6a42efd80ea30342856ca3b3",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/flutter_markdown/assets/logo.png": "67642a0b80f3d50277c44cde8f450e50",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/svg/cash.svg": "b9ad0c5f1dffaab8e8a854306fb7a909",
"assets/assets/svg/pos.svg": "65b77d179707743666dfa257f5f09d52",
"assets/assets/svg/calculator.svg": "f6f7ccb84f4f3a81713d9e9a30c6f3c1",
"assets/assets/doc.xlsx": "a997c8ce5c34a6ce3581209dfbcb9ebc",
"assets/assets/collecte_doublon.xlsx": "257aaaa9e582a9f3e4b3484f78e3f79f",
"assets/assets/weebi_logo.png": "8ae47d786ed66518a4205ada196942b2",
"assets/assets/weebi_logo.jpg": "7afecbc75aa4c41261208aebee20625c",
"assets/assets/sounds/aqua.mp3": "968489cdfdc845e6076597a2a291ac98",
"assets/assets/ldb_logo.jpg": "78444af1a98946a1416a983c66e6901b",
"assets/assets/photos/cola_x100.jpg": "919f94d1f62b2d4164f80725a39bd2c6",
"assets/assets/photos/cola_x1.jpg": "3c6063f796b7ea079a38913eee594bfc",
"assets/assets/photos/caipirinha.jpg": "26e1d465a293fb9f70fb7ddefe06c77c",
"assets/assets/photos/nepes.jpg": "f84db228d7a327b90fb89db198701374",
"assets/assets/photos/paille.jpg": "b8aa55cb1f2a9640b26207325d0de628",
"assets/assets/photos/nma.jpg": "8202d1909f50ed88a6defeaf153182d9",
"assets/assets/photos/cola_x6.jpg": "08a86508478aef67d27e077d09e7f504",
"assets/assets/photos/tourteau.jpg": "02f045d2cf255d9c191f78967465e94d",
"assets/assets/photos/scotch.jpg": "3cec0296587c76b24b0e67e757459e13",
"assets/assets/photos/cup%2520of%2520tea.jpg": "82fbb312b72a1d54675dc10b046ae0f7",
"assets/assets/fonts/Roboto/Roboto-Medium.ttf": "d08840599e05db7345652d3d417574a9",
"assets/assets/fonts/Roboto/Roboto-Light.ttf": "fc84e998bc29b297ea20321e4c90b6ed",
"assets/assets/fonts/Roboto/Roboto-Regular.ttf": "3e1af3ef546b9e6ecef9f3ba197bf7d2",
"assets/assets/fonts/Roboto/Roboto-Bold.ttf": "ee7b96fa85d8fdb8c126409326ac2d2b",
"assets/assets/fonts/Roboto/Roboto-Thin.ttf": "89e2666c24d37055bcb60e9d2d9f7e35",
"assets/assets/fonts/Roboto/Roboto-Black.ttf": "ec4c9962ba54eb91787aa93d361c10a8",
"assets/assets/collecte.xlsx": "257aaaa9e582a9f3e4b3484f78e3f79f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a no-cache param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'no-cache'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');

      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }

      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'no-cache'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
