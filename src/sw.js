  
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const caching = new Promise((resolve,reject) => {
  if(workbox){
    console.log(workbox)
    resolve(workbox);
  }else{
    reject('workbox tidak ditemukan');
  }
})

caching.then((workbox) => {
  workbox.precaching.precacheAndRoute([
    { url: "/index.html", revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: "/bundle.js", revision: '1' },
    { url: "/src/img/banner/banner.png", revision: '1' },
    { url: "/src/img/banner/place.svg", revision: '1' },
    { url: "/src/img/icon/save.svg", revision: '1' },
    { url: "/src/img/icon/trash.svg", revision: '1' },
    { url: "/src/img/logo/icon.png", revision: '1' },
    { url: "/src/img/logo/logo.png", revision: '1' },
    { url: "/src/img/logo/splash.png", revision: '1' },
  ]);  

  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 15,
      cacheName: 'football-api'
    })
  )

  self.addEventListener('push', function(event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    let options = {
      body: body,
      icon: 'img/logo/logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
}).catch(error => {
  console.error(error);
})



