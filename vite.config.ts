import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/smart-city-cockpit/',
  plugins: [vue()],
  server: { port: 5182 }
})
