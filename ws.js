if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

navigator.serviceWorker.onmessage = (event) => {
  sendNotification(event.data);
};

function sendNotification(msg) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
// Проверка разрешения на отправку уведомлений
  else if (Notification.permission === "granted") {
    // Если разрешено, то создаем уведомление
    new Notification(msg);
  }

// В противном случае, запрашиваем разрешение
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Если пользователь разрешил, то создаем уведомление
      if (permission === "granted") {
        new Notification(msg);
      }
    });
  }
}

