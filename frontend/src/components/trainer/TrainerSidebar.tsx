import {
  LayoutDashboard,
  Users,
  Dumbbell,
  BookCopy,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink, useLocation } from "react-router-dom";

const TrainerSidebar = () => {
  const { logout, logoUrl } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Para saber qual rota está ativa

  const navLinks = [
    { to: "/trainer/dashboard", icon: LayoutDashboard, label: "Início", end: true },
    { to: "/trainer/dashboard/students", icon: Users, label: "Alunos", end: false },
    { to: "/trainer/dashboard/workouts", icon: Dumbbell, label: "Fichas de Treino", end: false },
    { to: "/trainer/dashboard/exercises", icon: BookCopy, label: "Exercícios", end: false },
    { to: "/trainer/dashboard/chat", icon: MessageSquare, label: "Chat", end: false },
    { to: "/trainer/dashboard/announcements", icon: Bell, label: "Avisos", end: false },
    { to: "/trainer/dashboard/settings", icon: Settings, label: "Personalizar", end: false },
  ];

  return (
    <aside
      className={cn(
        "relative hidden h-screen flex-col border-r bg-card md:flex",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Cabeçalho da Sidebar */}
      <div className="flex h-16 items-center border-b px-6 overflow-hidden">
        <NavLink to="/trainer/dashboard" className={cn("flex items-center gap-2 font-semibold", isCollapsed && "justify-center w-full")}>
          {logoUrl ? (
             <img src={logoUrl} alt="Logo" className={cn("object-contain transition-all", isCollapsed ? "h-10 w-10" : "h-8")} />
          ) : (
            <div className="flex items-center gap-2 whitespace-nowrap">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                 <Dumbbell className="h-5 w-5" />
               </div>
               {!isCollapsed && (
                 <span className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                   AppFitness
                 </span>
               )}
             </div>
          )}
           <span className="sr-only">AppFitness</span>
        </NavLink>
      </div>

      {/* Navegação */}
      <nav className="flex-1 space-y-2 overflow-x-hidden overflow-y-auto py-4 px-4">
        {navLinks.map((link) => {
          // Verifica se a rota está ativa
          const isActive = link.end 
            ? location.pathname === link.to 
            : location.pathname.startsWith(link.to);

          return (
            <TooltipProvider key={link.to} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* USANDO O COMPONENTE BUTTON COM asChild */}
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 transition-all", // Garante alinhamento e espaçamento
                      isCollapsed && "justify-center px-2", // Ajuste fino quando fechado
                      !isActive && "text-muted-foreground hover:text-primary" // Cor do texto inativo
                    )}
                    asChild
                  >
                    <NavLink to={link.to}>
                      <link.icon className={cn("h-4 w-4 shrink-0", isCollapsed && "h-5 w-5")} />
                      {!isCollapsed && <span>{link.label}</span>}
                      <span className="sr-only">{link.label}</span>
                    </NavLink>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">{link.label}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>

      {/* Rodapé (Logout) */}
      <div className="mt-auto border-t p-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={logout}
                className={cn(
                  "w-full justify-start gap-3 text-muted-foreground hover:text-destructive",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <LogOut className={cn("h-4 w-4 shrink-0", isCollapsed && "h-5 w-5")} />
                {!isCollapsed && <span>Sair</span>}
                <span className="sr-only">Sair</span>
              </Button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Sair</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Botão de Colapsar */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 h-8 w-8 rounded-full shadow-md z-50 bg-background border-border"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </aside>
  );
};

export default TrainerSidebar;