import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";

// if (typeof SharedWorker !== "undefined") {
//   const worker = new SharedWorker("/sharedWorker.js", { type: "module" });
//   worker.port.start();
//   Vue.prototype.$sharedWorker = worker;
// } else {
//   console.warn("SharedWorker is not supported in your browser.");
// }

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
