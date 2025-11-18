import { Dumbbell, MessageCircle, Megaphone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const StudentSidebar = () => {
  const { logout, logoUrl } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { to: "/student/dashboard", label: "Meus Treinos", icon: Dumbbell, end: true },
    { to: "/student/dashboard/chat", label: "Mensagens", icon: MessageCircle, end: false },
    { to: "/student/dashboard/announcements", label: "Avisos", icon: Megaphone, end: false },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login/student");
  };

  return (
    <aside className="hidden w-64 bg-card border-r border-border md:flex flex-col">
      <div className="p-6 border-b border-border flex items-center gap-3">
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="h-10 w-10 object-contain rounded-md" />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-primary-foreground" />
          </div>
        )}
        <div>
          <h1 className="text-lg font-bold text-primary">{'AppFitness'}</h1>
          <p className="text-sm text-muted-foreground">Área do Aluno</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              )
            }
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
