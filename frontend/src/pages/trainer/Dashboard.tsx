import { useTrainerLayout } from "@/components/layout/TrainerLayout"; // Hook do nosso layout
import DashboardHomeView from "@/components/trainer/DashboardHomeView";
import StudentsView from "@/components/trainer/StudentsView";
import WorkoutsView from "@/components/trainer/WorkoutsView";
import ExercisesView from "@/components/trainer/ExercisesView";
import ChatView from "@/components/trainer/ChatView";
import AnnouncementsView from "@/components/trainer/AnnouncementsView";
import WhiteLabelSettings from "@/components/trainer/WhiteLabelSettings";

export default function TrainerDashboard() {
  // 1. Obter o estado de visualização ativa do layout pai (TrainerLayout)
  const { activeView } = useTrainerLayout();

  // 2. Renderizar o componente correto com base no activeView
  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardHomeView />;
      case 'students':
        return <StudentsView />; // Este componente será conectado
      case 'workouts':
        return <WorkoutsView />; // Usando o placeholder por enquanto
      case 'exercises':
        return <ExercisesView />; // Usando o placeholder por enquanto
      case 'chat':
        return <ChatView />; // Usando o placeholder por enquanto
      case 'announcements':
        return <AnnouncementsView />; // Usando o placeholder por enquanto
      case 'settings':
        return <WhiteLabelSettings />; // Usando o placeholder por enquanto
      default:
        return <DashboardHomeView />;
    }
  };

  return (
    <>
      {renderView()}
    </>
  );
}