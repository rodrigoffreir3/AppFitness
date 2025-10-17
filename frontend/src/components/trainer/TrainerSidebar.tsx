import { Users, Dumbbell, Library, MessageCircle, Megaphone, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TrainerSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const TrainerSidebar = ({ activeView, setActiveView }: TrainerSidebarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "students", label: "Alunos", icon: Users },
    { id: "workouts", label: "Fichas de Treino", icon: Dumbbell },
    { id: "exercises", label: "Exercícios", icon: Library },
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "announcements", label: "Avisos", icon: Megaphone },
    { id: "settings", label: "Personalizar", icon: Settings },
  ];

  const handleLogout = () => {
    // TODO: Limpar token do localStorage
    // localStorage.removeItem('trainer_token');
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Área do Treinador</p>
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

export default TrainerSidebar;
