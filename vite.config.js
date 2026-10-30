import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 相对路径基准，确保在 GitHub Pages 顶级域名或仓库子路径下都能正常访问静态资源
  base: './',
  server: {
    port: 5173,
    open: true
  }
})
