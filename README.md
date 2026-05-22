# Service Worker Cache Demo

A simple service worker demo that pre-caches local assets and keeps a static page available offline.

## Overview

This project demonstrates the basics of using a service worker as a programmable browser cache. After the page loads, it registers a service worker that saves the app shell files to the Cache API. When the network is unavailable, the service worker responds with the cached versions so the page can still load.

The demo also includes a small status UI for checking service worker support, network state, and the list of files being cached.

## What It Demonstrates

- Registering a service worker from client-side JavaScript
- Pre-caching local HTML, CSS, and JavaScript files during installation
- Cleaning up old cache versions during activation
- Serving cached responses for `GET` requests
- Refreshing the cache from the page with `postMessage`
- Detecting online and offline network status in the UI

## Files

```text
.
├── index.html
├── custom.css
├── custom.js
└── service-worker.js
```

| File | Purpose |
| --- | --- |
| `index.html` | Main demo page and UI markup |
| `custom.css` | Styling for the page layout, status panel, cards, and button |
| `custom.js` | Registers the service worker and updates the UI |
| `service-worker.js` | Handles caching, activation cleanup, fetch responses, and cache refresh messages |

## Getting Started

Service workers require a secure context, which means the page should be served from `localhost` or HTTPS. Opening `index.html` directly from the file system will not reliably register the service worker.

Start a local static server from the project folder:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Testing Offline Support

1. Load the page once while online.
2. Confirm the service worker status says `Active and ready`.
3. Open your browser DevTools.
4. Switch the network mode to offline, or disconnect your network.
5. Refresh the page.

The page should still load because these files were cached:

- `./`
- `./index.html`
- `./custom.css`
- `./custom.js`

## Cache Refresh

The **Refresh cache** button sends a message from the page to the active service worker. The service worker responds by re-running the app shell caching logic and updating the cached files.

## Notes

- This is intentionally a small learning project, not a production-ready offline strategy.
- The current fetch handler uses a cache-first approach: it returns a cached response when one exists, otherwise it falls back to the network.
- The cache name is versioned in `service-worker.js`. Updating `CACHE_NAME` allows the service worker to create a new cache and remove older versions during activation.

# service-worker-caching-demo
