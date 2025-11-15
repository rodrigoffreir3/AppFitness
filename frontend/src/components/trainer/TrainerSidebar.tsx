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
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// 1. Importar NavLink em vez de Link
import { NavLink } from "react-router-dom";

// 2. Remover as props { activeView, setActiveView }
const TrainerSidebar = () => {
  const { logout, logoUrl } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 3. Definir os links de navegação
  // O 'end: true' no Início é crucial
  const navLinks = [
    { to: "/trainer/dashboard", icon: LayoutDashboard, label: "Início", end: true },
    { to: "/trainer/dashboard/students", icon: Users, label: "Alunos", end: false },
    { to: "/trainer/dashboard/workouts", icon: Dumbbell, label: "Fichas de Treino", end: false },
    { to: "/trainer/dashboard/exercises", icon: BookCopy, label: "Exercícios", end: false },
    { to: "/trainer/dashboard/chat", icon: MessageSquare, label: "Chat", end: false },
    { to: "/trainer/dashboard/announcements", icon: Bell, label: "Avisos", end: false },
    { to: "/trainer/dashboard/settings", icon: Settings, label: "Personalizar", end: false },
  ];

  const SidebarLink = ({ to, icon: Icon, label, end }: typeof navLinks[0]) => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* 4. Usar NavLink em vez de Button */}
          <NavLink
            to={to}
            end={end} // Importante para o "Início"
            // 5. 'className' agora recebe uma função que nos dá o 'isActive'
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                isCollapsed && "justify-center px-0",
                isActive && "bg-primary text-primary-foreground" // Estilo ativo
              )
            }
          >
            <Icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
            {!isCollapsed && <span>{label}</span>}
            <span className="sr-only">{label}</span>
          </NavLink>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <aside className={cn(
      "hidden md:flex flex-col h-full bg-card border-r transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* ... (Logo/Branding - sem alterações) ... */}
      <div className={cn("flex items-center h-16 border-b px-6", isCollapsed && "justify-center px-0")}>
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className={cn("h-8 object-contain transition-all", isCollapsed ? "h-8" : "h-8")} />
        ) : (
          <div className={cn("flex items-center gap-2", isCollapsed && "gap-0")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                AppFitness
              </span>
            )}
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-auto py-6 px-4 space-y-2">
        {navLinks.map((link) => (
          <SidebarLink key={link.to} {...link} />
        ))}
      </nav>

      <div className="mt-auto p-4 border-t">
        {/* ... (Botão de Logout - sem alterações) ... */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={logout}
                className={cn(
                  "w-full justify-start gap-3 text-muted-foreground hover:text-destructive",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <LogOut className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
                {!isCollapsed && <span>Sair</span>}
                <span className="sr-only">Sair</span>
              </Button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Sair</TooltipContent>}
          </Tooltip>
        </TooltipProvider>

        {/* Botão de Colapsar */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 top-20"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
};

export default TrainerSidebar;