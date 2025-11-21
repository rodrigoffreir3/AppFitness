import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Dumbbell
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

const StudentSidebar = () => {
  const { logout, logoUrl } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Links de navegação do aluno
  const navLinks = [
    { to: "/student/dashboard", icon: LayoutDashboard, label: "Meus Treinos", end: true },
    { to: "/student/dashboard/chat", icon: MessageSquare, label: "Chat", end: false },
    { to: "/student/dashboard/announcements", icon: Bell, label: "Avisos", end: false },
  ];

  return (
    <aside
      className={cn(
        "relative hidden h-screen flex-col border-r bg-card md:flex transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Cabeçalho / Logo */}
      <div className="flex h-16 items-center border-b px-6 overflow-hidden">
        <div className={cn("flex items-center gap-2 font-semibold", isCollapsed && "justify-center w-full")}>
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className={cn("object-contain transition-all", isCollapsed ? "h-10 w-10" : "h-8")} />
          ) : (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                <Dumbbell className="h-5 w-5" />
              </div>
              {!isCollapsed && (
                <span className="text-lg font-bold text-primary">
                  AppFitness
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 space-y-2 overflow-x-hidden overflow-y-auto py-4 px-3">
        {navLinks.map((link) => {
          const isActive = link.end 
            ? location.pathname === link.to 
            : location.pathname.startsWith(link.to);

          return (
            <TooltipProvider key={link.to} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 mb-1",
                      isCollapsed && "justify-center px-2"
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

      {/* Rodapé */}
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

      {/* Botão Recolher */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 h-8 w-8 rounded-full shadow-md z-50 bg-background border-input"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </aside>
  );
};

export default StudentSidebar;