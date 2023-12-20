import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@domain': '/src/domain',
      '@components': '/src/components',
      '@infrastructure': '/src/infrastructure',
      '@interfaces': '/src/interfaces',
    },
  },
})
