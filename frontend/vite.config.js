import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'src/pages')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf('node_modules') !== -1) {
            const basic = id.toString().split('node_modules/')[1]
            const sub1 = basic.split('/')[0].toString()
            if (sub1 !== '.pnpm') {
              return sub1
            }
            const sub2 = basic.split('/')[1]
            return sub2.split('@')[sub2[0] === '@' ? 1 : 0].toString()
          }
        }
      }
    }
  }
})
