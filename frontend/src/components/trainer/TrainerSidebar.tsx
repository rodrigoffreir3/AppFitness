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
import { NavLink } from "react-router-dom";

const TrainerSidebar = () => {
  const { logout, logoUrl } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { to: "/trainer/dashboard", icon: LayoutDashboard, label: "Início", end: true },
    { to: "/trainer/dashboard/students", icon: Users, label: "Alunos", end: false },
    { to: "/trainer/dashboard/workouts", icon: Dumbbell, label: "Fichas de Treino", end: false },
    { to: "/trainer/dashboard/exercises", icon: BookCopy, label: "Exercícios", end: false },
    { to: "/trainer/dashboard/chat", icon: MessageSquare, label: "Chat", end: false },
    { to: "/trainer/dashboard/announcements", icon: Bell, label: "Avisos", end: false },
    { to: "/trainer/dashboard/settings", icon: Settings, label: "Personalizar", end: false },
  ];

  const SidebarLink = ({ to, icon: Icon, label, end }: (typeof navLinks)[0]) => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                // CORREÇÃO: Usando text-slate-600 para garantir contraste
                "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition-all hover:bg-primary/10 hover:text-primary",
                isCollapsed && "justify-center",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              )
            }
          >
            <Icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
            {!isCollapsed && <span className="font-medium">{label}</span>}
            <span className="sr-only">{label}</span>
          </NavLink>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <aside
      className={cn(
        "relative hidden h-screen flex-col border-r bg-card md:flex",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <NavLink to="/trainer/dashboard" className={cn("flex items-center gap-2 font-semibold", isCollapsed && "justify-center")}>
          {logoUrl ? (
             <img src={logoUrl} alt="Logo" className={cn("object-contain transition-all", isCollapsed ? "h-10 w-10" : "h-8")} />
          ) : (
            <div className="flex items-center gap-2">
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
           <span className="sr-only">AppFitness</span>
        </NavLink>
      </div>
      <nav className="flex-1 space-y-2 overflow-auto py-4 px-4">
        {navLinks.map((link) => (
          <SidebarLink key={link.to} {...link} />
        ))}
      </nav>
      <div className="mt-auto border-t p-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={logout}
                className={cn(
                  "w-full justify-start gap-3 text-slate-600 hover:text-destructive hover:bg-destructive/10",
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
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 h-8 w-8 rounded-full bg-background border shadow-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </aside>
  );
};

export default TrainerSidebar;