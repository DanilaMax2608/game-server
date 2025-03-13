const WebSocket = require('ws');

// Создаем WebSocket-сервер
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

// Обработка подключения нового клиента
wss.on('connection', (ws) => {
    console.log('Новый клиент подключен');

    // Обработка сообщений от клиента
    ws.on('message', (message) => {
        // Декодирование сообщения
        const decodedMessage = message.toString();
        console.log('Получено сообщение:', decodedMessage);

        // Здесь можно добавить обработку сообщений
        // Например, отправить ответ обратно клиенту
        ws.send(JSON.stringify({ type: 'response', message: 'Hello, Client!' }));
    });

    // Обработка отключения клиента
    ws.on('close', () => {
        console.log('Клиент отключен');
    });

    // Обработка ошибок
    ws.on('error', (error) => {
        console.error('Ошибка WebSocket:', error);
    });
});

console.log('Сервер запущен на порту', process.env.PORT || 8080);
