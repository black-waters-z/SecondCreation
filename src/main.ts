import { createSSRApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

// #ifdef H5
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// #endif
import uViewPlus from "uview-plus";
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(uViewPlus);
  // #ifdef H5
  app.use(ElementPlus);
  // #endif
  app.use(pinia);
  return {
    app,
  };
}
