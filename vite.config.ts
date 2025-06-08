import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ui-kit': resolve(__dirname, './packages/ui-kit/src'),
      '@form-generator': resolve(__dirname, './packages/form-generator/src'),
      '@table-engine': resolve(__dirname, './packages/table-engine/src'),
      '@app-shell': resolve(__dirname, './packages/app-shell/src')
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@emotion/react', '@emotion/styled']
        }
      }
    }
  }
}); 