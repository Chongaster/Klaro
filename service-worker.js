// Nom du cache
const CACHE_NAME = 'klaro-cache-v1';

// Fichiers à mettre en cache. Mettez ici le chemin vers votre fichier HTML principal.
// Si votre fichier s'appelle index.html, '/' est correct.
const urlsToCache = [
  '/',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est dans le cache, on la retourne
        if (response) {
          return response;
        }
        // Sinon, on la récupère sur le réseau
        return fetch(event.request);
      })
  );
});
