import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
// MUDANÇA AQUI: Trocamos o 'sonner' pelo 'toaster' padrão para casar com o use-toast
import { Toaster } from "@/components/ui/toaster"; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="vite-ui-theme"
        >
          <Outlet />
          {/* O componente visual que exibe as mensagens */}
          <Toaster />
        </NextThemesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;