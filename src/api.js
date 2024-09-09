const API_KEY = "62ff345cb19536a8e46e8e973cb0a9bd752c5000f4ae6145e57d09e5de3b97c9";
const searchParams = new URLSearchParams({
  api_key: API_KEY,
});
console.log(searchParams.toString());

const tickersHandlers = new Map();

export const loadTickers = () => {
  if (tickersHandlers.size === 0) {
    return;
  }

  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickersHandlers.keys()].join(
      ","
    )}&tsyms=USD&api_key=${API_KEY}`
  ).then((r) =>
    r.json().then((rawData) => {
      const updatedPrices = Object.fromEntries(Object.entries(rawData).map(([key, value]) => [key, value.USD]));
      Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
        const handlers = tickersHandlers.get(currency) ?? [];
        handlers.forEach((fn) => fn(newPrice));
      });
    })
  );
};

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);
};

export const unsubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);
};

setInterval(loadTickers, 5000);

window.tickers = tickersHandlers;
