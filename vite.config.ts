import { defineConfig } from 'vite';
import path from 'path';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  publicDir: 'static',
  server: {
    host: '192.168.43.15',
    port: 3000,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      // },
      '/api': {
        target: 'http://192.168.43.15:8080',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@vue/devtools-api': path.resolve(__dirname, 'src/shims/devtools.ts'),
    },
  },
});
