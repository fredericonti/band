import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import tailwindcss from "@tailwindcss/vite";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), react(),
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

