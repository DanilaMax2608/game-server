const WebSocket = require('ws');

// Создаем WebSocket-сервер
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

// Обработка подключения нового клиента
wss.on('connection', (ws) => {
    console.log('Новый клиент подключен');

    // Обработка сообщений от клиента
    ws.on('message', (message) => {
        console.log('Получено сообщение:', message);
        // Здесь можно добавить обработку сообщений
    });

    // Обработка отключения клиента
    ws.on('close', () => {
        console.log('Клиент отключен');
    });
});

console.log('Сервер запущен');
