import { Dumbbell, MessageCircle, Megaphone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface StudentSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const StudentSidebar = ({ activeView, setActiveView }: StudentSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "workouts", label: "Meus Treinos", icon: Dumbbell },
    { id: "chat", label: "Mensagens", icon: MessageCircle },
    { id: "announcements", label: "Avisos", icon: Megaphone },
  ];

  const handleLogout = () => {
    // TODO: Limpar token do localStorage
    // localStorage.removeItem('student_token');
    navigate("/student/login");
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Meu Painel</h1>
        <p className="text-sm text-muted-foreground mt-1">Área do Aluno</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveView(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
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
