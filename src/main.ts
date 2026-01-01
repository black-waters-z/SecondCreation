import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

// #ifdef H5
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import uView from "uview-plus";
// #endif
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  // #ifdef H5
  app.use(ElementPlus);
  app.use(uView);
  // #endif
  app.use(pinia);
  return {
    app,
  };
}
