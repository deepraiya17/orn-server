import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import Router from "./router/index";

createApp(App).use(Router).mount("#app");
