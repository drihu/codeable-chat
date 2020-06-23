const PORT = process.env.PORT || 3000;
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Connection opened 🚀');
  ws.send(JSON.stringify({
    username: 'SERVER',
    message: 'Codeable\'s chat connected 🚀'
  }));

  ws.on('message', (message) => {
    console.log(message);
    const user = JSON.parse(message);

    wss.clients.forEach((client) => {
      if (client != ws) {
        if (user.firstConnection) {
          client.send(JSON.stringify({ notification: `${user.username} connected` }));
        } else {
          client.send(message);
        }
      }
    });
  });

  ws.on('close', () => {
    console.log('Connection closed 💀');
  });
});
