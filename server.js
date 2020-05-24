const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Connection on port 8080');
  ws.on('message', function(message) {
    console.log('received: %s', message);
  });

  setInterval(() => {
    ws.send('Сообщение от Node.js WebSocket сервера через ServiceWorker');
  }, 10000)
});
