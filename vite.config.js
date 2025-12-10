import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        try {
          copyFileSync('_redirects', 'dist/_redirects')
        } catch (err) {
          console.warn('Could not copy _redirects file:', err.message)
        }
      }
    }
  ],
})
