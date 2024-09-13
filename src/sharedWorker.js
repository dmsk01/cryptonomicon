// import { createNanoEvents } from "nanoevents";

// const API_KEY = "62ff345cb19536a8e46e8e973cb0a9bd752c5000f4ae6145e57d09e5de3b97c9";
// const AGGREGATE_INDEX = "5";
// const searchParams = new URLSearchParams({
//   api_key: API_KEY,
// }).toString();
// const WS_URL = `wss://streamer.cryptocompare.com/v2?${searchParams}`;

// const emitter = createNanoEvents();

// let connections = []; // Массив для хранения подключенных вкладок

// // Создание WebSocket для получения данных о криптовалюте
// const ws = new WebSocket(WS_URL);

// const message = {
//   action: "SubAdd",
//   subs: [`${AGGREGATE_INDEX}~CCCAGG~BTC~USD`],
// };

// // Открываем соединение и слушаем обновления курса
// ws.onopen = () => {
//   console.log("WebSocket соединение установлено");
//   () => {
//     const stringifiedMessage = JSON.stringify(message);
//     ws.send(stringifiedMessage);
//   },
//     { once: true };
// };

// ws.onmessage = (event) => {
//   const data = JSON.parse(event.data);
//   // Emit событие с обновленными данными
//   emitter.emit("cryptoPriceUpdate", data);
// };

// // Функция для отправки данных во все вкладки
// function broadcastDataToClients(data) {
//   connections.forEach((port) => port.postMessage(data));
// }

// // Подписываемся на событие изменения курса
// emitter.on("cryptoPriceUpdate", (data) => {
//   broadcastDataToClients(data);
// });

// // Обрабатываем подключения новых вкладок
// self.onconnect = (event) => {
//   const port = event.ports[0];
//   connections.push(port);

//   // Обрабатываем сообщения от вкладок
//   port.onmessage = (event) => {
//     if (event.data === "disconnect") {
//       connections = connections.filter((p) => p !== port);
//     }
//   };

//   // Отправляем текущее состояние новому клиенту
//   port.start();
// };
