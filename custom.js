const cachedFiles = [
	'./',
	'./index.html',
	'./custom.css',
	'./custom.js',
];

const workerStatus = document.querySelector('#worker-status');
const networkStatus = document.querySelector('#network-status');
const cachedFilesList = document.querySelector('#cached-files');
const refreshCacheButton = document.querySelector('#refresh-cache');

cachedFilesList.innerHTML = cachedFiles
	.map((file) => `<li><code>${file}</code></li>`)
	.join('');

function updateNetworkStatus() {
	networkStatus.textContent = navigator.onLine ? 'Online' : 'Offline';
}

async function registerServiceWorker() {
	if (!('serviceWorker' in navigator)) {
		workerStatus.textContent = 'Not supported in this browser';
		refreshCacheButton.disabled = true;
		return;
	}

	try {
		await navigator.serviceWorker.register('./service-worker.js');
		await navigator.serviceWorker.ready;
		workerStatus.textContent = 'Active and ready';
	} catch (error) {
		workerStatus.textContent = 'Registration failed';
		console.error('Service worker registration failed:', error);
	}
}

async function refreshCache() {
	refreshCacheButton.disabled = true;
	refreshCacheButton.textContent = 'Refreshing...';

	const registration = await navigator.serviceWorker.ready;
	registration.active.postMessage({ type: 'REFRESH_CACHE' });

	setTimeout(() => {
		refreshCacheButton.disabled = false;
		refreshCacheButton.textContent = 'Refresh cache';
		workerStatus.textContent = 'Cache refresh requested';
	}, 700);
}

window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);
navigator.serviceWorker?.addEventListener('controllerchange', () => {
	workerStatus.textContent = 'Active and ready';
});
refreshCacheButton.addEventListener('click', refreshCache);

updateNetworkStatus();
registerServiceWorker();
