import path from "path"
import react from "@vitejs/plugin-react" // <<< Garanta que está importando '@vitejs/plugin-react'
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()], // <<< Garanta que está usando 'react()' aqui
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})