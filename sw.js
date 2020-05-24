console.log('Я service worker');

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map((cacheName) => {
        return caches.delete(cacheName);
      }))
    })
  );
});

const socket = new WebSocket("ws://localhost:8080");

socket.onopen = function() {
  console.log("Соединение установлено.");
  socket.send("Привет server");
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения'); // например, "убит" процесс сервера
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onmessage = function(event) {
  console.log(event.data);
  self.clients.matchAll({
    includeUncontrolled: true,
    type: 'window',
  }).then((clients) => {
    if (clients && clients.length) {
      clients[0].postMessage(event.data);
    }
  });
};

socket.onerror = function(error) {
  console.log("Ошибка " + error.message);
};


