import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'lunar': ['lunar-javascript'],
          'vendor': ['react', 'react-dom'],
          'ui': ['lucide-react']
        }
      }
    }
  }
})
