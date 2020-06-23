const username = prompt('What is your username?', 'drihu');
const ws = new WebSocket('ws://localhost:3000');
const log = document.querySelector('#log');
const controls = document.querySelector('#controls');

const generateDate = () => {
  return new Date().toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });
};

ws.onopen = () => {
  ws.send(JSON.stringify({ username, firstConnection: true }));
};

ws.onmessage = (event) => {
  const server = JSON.parse(event.data);

  if (server.notification) {
    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') new Notification(server.notification);
    });
  } else {
    log.innerHTML += `${generateDate()} ${server.username}: ${server.message} <br>`;
  }
};

ws.onerror = (error) => {
  console.log('Server error message: ', error.message);
};

controls.onsubmit = (e) => {
  e.preventDefault();
  let text = e.target.text.value;
  ws.send(JSON.stringify({ username, message: text }));
  log.innerHTML += `${generateDate()} me: ${text}<br>`;
  e.target.text.value = '';
};
