import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa' // 1. Importar o plugin

export default defineConfig({
  plugins: [
    react(),
    
    // 2. Adicionar o plugin PWA com a configuração
    VitePWA({
      registerType: 'autoUpdate', // Atualiza o Service Worker automaticamente
      
      // 3. Configurar o "manifest" (o que define a app)
      manifest: {
        name: 'AppFitness - Plataforma White Label',
        short_name: 'AppFitness',
        description: 'A plataforma white label completa para personal trainers.',
        theme_color: '#8B5CF6', // Cor primária (roxa) do seu index.css
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon.ico', // Usando o ícone existente
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          // NOTA: Para uma PWA de produção, precisaremos adicionar
          // ícones PNG de 192x192 e 512x512 aqui.
        ],
      },
      
      // 4. O que incluir no cache (Service Worker)
      includeAssets: ['favicon.ico', 'robots.txt'], //
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})