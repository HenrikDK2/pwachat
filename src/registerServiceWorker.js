export function registerServiceWorkers() {
  // eslint-disable-next-line
  if ("serviceWorker" in navigator) {
    // eslint-disable-next-line
    navigator.serviceWorker.register("sw.js");
  }
}

export function unregisterServiceWorkers() {
  // eslint-disable-next-line
  if ("serviceWorker" in navigator) {
    // eslint-disable-next-line
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}

export function initializeServiceWorkers() {
  registerServiceWorkers();
}
