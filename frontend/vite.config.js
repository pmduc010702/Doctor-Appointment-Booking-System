import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Import Tailwind CSS Plugin

export default defineConfig({
  plugins: [react(), tailwindcss()],// Sử dụng plugin Tailwind CSS
  server: {port:5173}
})

