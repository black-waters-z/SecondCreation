import { defineConfig } from 'vite';
import path from 'path';
import uni from '@dcloudio/vite-plugin-uni';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  publicDir: 'static',
  server: {
    // host: '192.168.43.15',
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      // '/api': {
      //   target: 'http://192.168.43.15:8080',
      //   changeOrigin: true,
      // },
      // '/api': {
      //   target: 'http://ar903201qs86.vicp.fun:8080',
      //   changeOrigin: true,
      // },
    },
  },
  resolve: {
    alias: {
      '@vue/devtools-api': path.resolve(__dirname, 'src/shims/devtools.ts'),
    },
  },
  base: '/',
  outDir: 'dist',
  assetsDir: 'static',
  configureWebpack: {
    pluginOptions: {
      uniApp: {
        // 全局配置微信小程序自定义组件的 options
        weapp: {
          componentOptions: {
            virtualHost: true,
            styleIsolation: 'isolated', // 全局样式隔离
            multipleSlots: true, // 全局启用多 slot
            addGlobalClass: true, // 允许页面样式影响组件
          },
        },
      },
    },
  },
});
