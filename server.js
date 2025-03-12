const WebSocket = require('ws');

// Создаем WebSocket-сервер на порту 8080
const wss = new WebSocket.Server({ port: 8080 });

// Хранилище состояния игры
let gameState = {
  items: {
    'item1': { position: { x: 10, y: 20 }, available: true },
    'item2': { position: { x: 30, y: 40 }, available: true }
  }
};

// Обработка подключения нового клиента
wss.on('connection', (ws) => {
  console.log('Новый клиент подключен');

  // Обработка сообщений от клиента
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    // Обработка действия "подбор предмета"
    if (data.type === 'pickup' && gameState.items[data.itemId].available) {
      gameState.items[data.itemId].available = false;

      // Отправка обновления всем подключенным клиентам
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'update', itemId: data.itemId, available: false }));
        }
      });
    }
  });

  // Обработка отключения клиента
  ws.on('close', () => {
    console.log('Клиент отключен');
  });
});

console.log('Сервер запущен на ws://localhost:8080');
