/*self.addEventListener("install", () => {
    console.log("Service Worker instalado");
});

self.addEventListener("activate", () => {
    console.log("Service Worker activado");
});

const cacheName = 'mi-app-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js'
];

// Instalación de la app web en el movil
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// Activación
self.addEventListener('activate', e => {
  console.log('Service Worker activado');
});

// Interceptar requests
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});

// Ir a la app al hacer click en notificacion
self.addEventListener("notificationclick", event => {
    event.notification.close();

    const url = "https://nicocormar13.github.io/Button/";

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true })
            .then(clientList => {
                // Si ya hay una ventana abierta, enfocarla
                for (const client of clientList) {
                    if (client.url.includes(url) && "focus" in client) {
                        return client.focus();
                    }
                }
                // Si no, abrir una nueva
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});
*/

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification?.data?.url || "./index.html";

  event.waitUntil(
    clients.openWindow(url)
  );
});
