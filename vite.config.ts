import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/contacts-base/",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "~@": path.resolve(__dirname, "./src"),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#17ca13',  // измените это на ваш цвет
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: true,
  },
})