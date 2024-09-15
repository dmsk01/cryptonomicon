let workerInstance;

export function initializeWorker() {
  if (!workerInstance) {
    workerInstance = new SharedWorker("sharedWorker.js");
    workerInstance.port.start(); // Запускаем связь
  }
  return workerInstance;
}

export function sendMessageToWorker(message) {
  if (workerInstance) {
    workerInstance.port.postMessage(message);
  }
}

export function listenToWorkerMessages(callback) {
  if (workerInstance) {
    workerInstance.port.onmessage = callback;
  }
}
