const CACHE_NAME = 'service-worker-cache-demo-v1';
const FILES_TO_CACHE = [
	'./',
	'./index.html',
	'./custom.css',
	'./custom.js',
];

async function cacheAppShell() {
	const cache = await caches.open(CACHE_NAME);
	await cache.addAll(FILES_TO_CACHE);
}

self.addEventListener('install', (event) => {
	event.waitUntil(cacheAppShell());
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		Promise.all([
			caches.keys().then((cacheNames) => Promise.all(
				cacheNames
					.filter((cacheName) => cacheName !== CACHE_NAME)
					.map((cacheName) => caches.delete(cacheName))
			)),
			self.clients.claim(),
		])
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') {
		return;
	}

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			return cachedResponse || fetch(event.request);
		})
	);
});

self.addEventListener('message', (event) => {
	if (event.data?.type === 'REFRESH_CACHE') {
		event.waitUntil(cacheAppShell());
	}
});
