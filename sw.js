const CACHE_NAME = 'hablalo-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/registro.html',
  '/registro-paciente.html',
  '/registro-psicologo.html',
  '/login.html',
  '/dashboard-paciente.html',
  '/dashboard-psicologo.html',
  '/applogo.png'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché para uso rápido');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para cargar rápido
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Devuelve la versión guardada en el cel
        }
        return fetch(event.request); // Si no está guardada, la busca en internet
      })
  );
});
