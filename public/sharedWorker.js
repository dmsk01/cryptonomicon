let browserInstances = [];

onconnect = function (e) {
  const port = e.ports[0];

  browserInstances.push(port);

  port.onmessage = function (e) {
    browserInstances.map((instance) => {
      instance.postMessage(e.data);
    });
  };
};
