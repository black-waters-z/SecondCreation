import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(ElementPlus);

  app.use(pinia);
  return {
    app,
  };
}
