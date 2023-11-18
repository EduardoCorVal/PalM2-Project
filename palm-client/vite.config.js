import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chatbot/chatting': {
        target: 'http://localhost:3333',
        changeOrigin: true
      }
    }
  }
})
