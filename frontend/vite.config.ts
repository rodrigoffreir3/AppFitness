import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente do arquivo .env (se existir)
  // Isso permite que você mude a URL da API sem mexer no código
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
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