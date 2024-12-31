import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// استبدل 'rsar' باسم المستودع الخاص بك
const repoName = 'rsra-project'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:2003',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
