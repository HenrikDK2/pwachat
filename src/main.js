import { createApp } from "vue";
import App from "./App.vue";
import { initializeServiceWorkers } from "./registerServiceWorker";
initializeServiceWorkers();
createApp(App).mount("#app");
