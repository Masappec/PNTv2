import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  resolve: {
    alias: {
      '@': '/src',
      '@domain': '/src/domain',
      '@components': '/src/components',
      '@infrastructure': '/src/infrastructure',
      '@interfaces': '/src/interfaces',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
    },
  },
})
