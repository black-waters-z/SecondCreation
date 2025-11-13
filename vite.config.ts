import { defineConfig } from "vite";
import path from "path";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  publicDir: "static",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@vue/devtools-api": path.resolve(__dirname, "src/shims/devtools.ts"),
    },
  },
});
