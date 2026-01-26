import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { VitePWA } from 'vite-plugin-pwa' // <-- 1. Adicionamos a importação do PWA

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente do arquivo .env (se existir)
  // Isso permite que você mude a URL da API sem mexer no código
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      // <-- 2. Adicionamos o Motor do PWA aqui dentro dos plugins
      VitePWA({
        registerType: 'autoUpdate', // O app atualiza sozinho no celular quando houver código novo
        includeAssets: ['favicon.ico', 'icon-192x192.png', 'icon-512x512.png'],
        manifest: false // Mantemos 'false' porque já criamos o arquivo na mão na pasta public
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // O Proxy é OBRIGATÓRIO para o login funcionar em dev
    server: {
      proxy: {
        '/api': {
          // MELHORIA: Lê do .env ou usa o padrão localhost:8080 se não encontrar
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})