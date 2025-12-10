// public/sw.js

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `vacunas-static-${CACHE_VERSION}`;
const API_CACHE = `vacunas-api-${CACHE_VERSION}`;
const IMAGE_CACHE = `vacunas-images-${CACHE_VERSION}`;

// Recursos estáticos para cachear en instalación
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Rutas de API que queremos cachear
const API_ROUTES = [
  '/api/temperature',
  '/api/humidity',
  '/api/statistics',
  '/statistics'  // Tu endpoint actual
];

// ================ INSTALACIÓN ================
self.addEventListener('install', (event) => {
  console.log('[SW] 📦 Instalando Service Worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] ✅ Cacheando recursos estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('[SW] ❌ Error en instalación:', error);
      })
  );
  
  // Activar inmediatamente
  self.skipWaiting();
});

// ================ ACTIVACIÓN ================
self.addEventListener('activate', (event) => {
  console.log('[SW] 🔄 Activando Service Worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eliminar cachés antiguos
          if (cacheName.startsWith('vacunas-') && 
              cacheName !== STATIC_CACHE && 
              cacheName !== API_CACHE &&
              cacheName !== IMAGE_CACHE) {
            console.log('[SW] 🗑️ Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] ✅ Service Worker activado');
      return self.clients.claim();
    })
  );
});

// ================ FETCH - ESTRATEGIAS DE CACHÉ ================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requests de otros orígenes (excepto APIs conocidas)
  if (url.origin !== self.location.origin && !url.pathname.includes('/api/')) {
    return;
  }

  // Ignorar requests de Chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // 1. API REQUESTS - Network First con fallback a caché
  if (isAPIRequest(url.pathname)) {
    event.respondWith(networkFirstAPI(request));
    return;
  }

  // 2. IMÁGENES - Cache First
  if (request.destination === 'image') {
    event.respondWith(cacheFirstImages(request));
    return;
  }

  // 3. RECURSOS ESTÁTICOS (JS, CSS) - Stale While Revalidate
  if (request.destination === 'script' || 
      request.destination === 'style' ||
      request.destination === 'font') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // 4. NAVEGACIÓN - Network First
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // 5. DEFAULT - Network First
  event.respondWith(networkFirst(request));
});

// ================ ESTRATEGIAS DE CACHÉ ================

/**
 * Network First para API - Ideal para datos dinámicos
 * Intenta red primero, si falla usa caché
 */
async function networkFirstAPI(request) {
  const cache = await caches.open(API_CACHE);

  try {
    console.log('[SW] 🌐 Fetching API:', request.url);
    
    // Timeout de 5 segundos para APIs
    const fetchPromise = fetch(request);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 5000)
    );

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (response.ok) {
      // Solo cachear respuestas exitosas
      console.log('[SW] ✅ API response OK, cacheando');
      cache.put(request, response.clone());
      return response;
    } else {
      throw new Error(`HTTP ${response.status}`);
    }

  } catch (error) {
    console.log('[SW] ⚠️ Network failed, buscando en caché:', error.message);
    
    const cached = await cache.match(request);
    
    if (cached) {
      console.log('[SW] ✅ Sirviendo datos de caché (offline)');
      
      // Agregar header para indicar que es caché
      const cachedResponse = cached.clone();
      const headers = new Headers(cachedResponse.headers);
      headers.append('X-From-Cache', 'true');
      
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: headers
      });
    }

    console.error('[SW] ❌ No hay datos en caché para:', request.url);
    
    // Retornar respuesta de error amigable
    return new Response(
      JSON.stringify({
        error: 'No hay conexión y no hay datos en caché',
        offline: true,
        url: request.url
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Cache First para imágenes
 */
async function cacheFirstImages(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    console.log('[SW] ⚡ Imagen desde caché:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] ❌ Error cargando imagen:', error);
    // Podrías retornar una imagen placeholder aquí
    return new Response('', { status: 404 });
  }
}

/**
 * Stale While Revalidate
 * Devuelve caché inmediatamente, actualiza en background
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  // Actualizar en background
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(error => {
    console.log('[SW] ⚠️ Error en fetch background:', error);
  });

  // Devolver caché inmediatamente si existe
  return cached || fetchPromise;
}

/**
 * Network First genérico
 */
async function networkFirst(request) {
  const cache = await caches.open(STATIC_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// ================ HELPERS ================

/**
 * Verifica si una URL es una petición de API
 */
function isAPIRequest(pathname) {
  return API_ROUTES.some(route => pathname.includes(route)) ||
         pathname.includes('/api/') ||
         pathname.includes('/statistics') ||
         pathname.includes('/temperature') ||
         pathname.includes('/humidity');
}

// ================ MENSAJES ================
self.addEventListener('message', (event) => {
  console.log('[SW] 📨 Mensaje recibido:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith('vacunas-')) {
              console.log('[SW] 🗑️ Limpiando caché:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  }

  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    event.waitUntil(
      getCacheInfo().then(info => {
        event.ports[0].postMessage(info);
      })
    );
  }
});

/**
 * Obtiene información sobre el caché
 */
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const info = {
    caches: [],
    totalSize: 0
  };

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    info.caches.push({
      name: cacheName,
      urls: keys.length
    });
  }

  return info;
}

// ================ BACKGROUND SYNC (opcional) ================
self.addEventListener('sync', (event) => {
  console.log('[SW] 🔄 Background Sync event:', event.tag);

  if (event.tag === 'sync-data') {
    event.waitUntil(syncPendingData());
  }
});

async function syncPendingData() {
  console.log('[SW] 📤 Sincronizando datos pendientes...');
  // Implementar lógica de sincronización aquí si es necesario
}

console.log('[SW] 🚀 Service Worker cargado (Versión:', CACHE_VERSION, ')');