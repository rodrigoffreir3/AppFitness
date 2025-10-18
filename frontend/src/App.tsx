import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider"; // Assumindo que você tem este componente
import { TooltipProvider } from "@/components/ui/tooltip"; // Assumindo que você tem este
import { Toaster } from "@/components/ui/sonner"; // Para notificações (já criamos)

// Cria uma instância do QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    // 1. Envolvemos com os Provedores necessários (Query, Tooltip, Tema)
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Usamos o ThemeProvider do seu protótipo */}
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> 
          {/* 2. Removemos o <Router> daqui */}
          {/* 3. Renderizamos o <Outlet /> para que as rotas filhas apareçam aqui */}
          <Outlet /> 
          {/* 4. Adicionamos o Toaster para notificações globais */}
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;