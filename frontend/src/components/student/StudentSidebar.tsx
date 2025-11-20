import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Dumbbell // Adicionado ícone para o logo
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom"; // Importar NavLink

const StudentSidebar = () => {
  const { logout, logoUrl } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Links de navegação baseados na URL
  const navLinks = [
    { to: "/student/dashboard", icon: LayoutDashboard, label: "Meus Treinos", end: true },
    { to: "/student/dashboard/chat", icon: MessageSquare, label: "Chat", end: false },
    { to: "/student/dashboard/announcements", icon: Bell, label: "Avisos", end: false },
  ];

  const SidebarLink = ({ to, icon: Icon, label, end }: typeof navLinks[0]) => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                isCollapsed && "justify-center px-0",
                isActive && "bg-primary text-primary-foreground"
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
      {/* Logo / Branding */}
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

export default StudentSidebar;