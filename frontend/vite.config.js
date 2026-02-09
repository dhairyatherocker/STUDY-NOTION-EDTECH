import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
     tailwindcss(),
    react()],
    server: {
  port: 3000,
   open: true,
    hmr: {
    protocol: 'ws',
    host: 'localhost',
    overlay: false,
  }
},
 optimizeDeps: {
    include: ['react-rating-stars-component'],
  },
   
})
