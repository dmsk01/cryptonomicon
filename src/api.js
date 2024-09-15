import { initializeWorker, sendMessageToWorker } from "./sharedWorkerService";
initializeWorker();

const API_KEY = "62ff345cb19536a8e46e8e973cb0a9bd752c5000f4ae6145e57d09e5de3b97c9";
const AGGREGATE_INDEX = "5";
const searchParams = new URLSearchParams({
  api_key: API_KEY,
}).toString();
const WS_URL = `wss://streamer.cryptocompare.com/v2?${searchParams}`;

const tickersHandlers = new Map();

function sendToWebSocket(message) {
  const stringifiedMessage = JSON.stringify(message);
  const socket = new WebSocket(WS_URL);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );

  socket.addEventListener("message", (e) => {
    const { TYPE: type, FROMSYMBOL: currency, PRICE: newPrice } = JSON.parse(e.data);
    if (type !== AGGREGATE_INDEX || newPrice === undefined) {
      return;
    }

    sendMessageToWorker({ currency, newPrice });

    const handlers = tickersHandlers.get(currency) ?? [];
    handlers.forEach((fn) => fn(newPrice, currency));
  });
}

function subscribeToTickerOnWS(ticker) {
  const message = {
    action: "SubAdd",
    subs: [
      `${AGGREGATE_INDEX}~CCCAGG~${ticker}~USD`,
      `${AGGREGATE_INDEX}~CCCAGG~BTC~USD`,
      `${AGGREGATE_INDEX}~CCCAGG~TON~USD`,
    ],
  };
  sendToWebSocket(message);
}

function unsubscribeToTickerOnWS(ticker) {
  const message = {
    action: "SubRemove",
    subs: [
      `${AGGREGATE_INDEX}~CCCAGG~${ticker}~USD`,
      `${AGGREGATE_INDEX}~CCCAGG~BTC~USD`,
      `${AGGREGATE_INDEX}~CCCAGG~TON~USD`,
    ],
  };
  sendToWebSocket(message);
}

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
  subscribeToTickerOnWS(ticker);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
  unsubscribeToTickerOnWS(ticker);
};
