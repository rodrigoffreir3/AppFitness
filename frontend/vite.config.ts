import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // --- ADICIONAR ESTA SECÇÃO 'server' ---
  server: {
    proxy: {
      // Diz ao Vite dev server (porta 5173):
      // Se vir um pedido para /api...
      '/api': {
        // ...reencaminhe-o para o nosso backend Go (porta 8080)
        target: 'http://localhost:8080', 
        changeOrigin: true,
      },
    }
  },
  // --- FIM DA ADIÇÃO ---

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      manifest: {
        name: 'AppFitness - Plataforma White Label',
        short_name: 'AppFitness',
        description: 'A plataforma white label completa para personal trainers.',
        theme_color: '#8B5CF6', 
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
        ],
      },
      includeAssets: ['favicon.ico', 'robots.txt'],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})