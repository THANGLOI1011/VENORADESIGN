import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // ← quan trọng để hoạt động đúng trên domain gốc
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000 
  }
})
