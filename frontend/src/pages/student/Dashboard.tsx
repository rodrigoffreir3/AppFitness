// frontend/src/pages/student/Dashboard.tsx
import { useState, useEffect } from "react";
import StudentSidebar from "@/components/student/StudentSidebar";
import MyWorkoutsView from "@/components/student/MyWorkoutsView";
import StudentChatView from "@/components/student/StudentChatView";
import StudentAnnouncementsView from "@/components/student/StudentAnnouncementsView";
import api from '@/services/api';
// Linha removida 👇
// import { WorkoutResponse } from '@/types';

// A interface WorkoutResponse continua definida no final deste arquivo por enquanto

const StudentDashboard = () => {
  const [activeView, setActiveView] = useState("workouts");

  // --- Novos Estados para dados, loading e erro ---
  const [workouts, setWorkouts] = useState<WorkoutResponse[]>([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);
  const [errorWorkouts, setErrorWorkouts] = useState('');
  // --- Fim dos Novos Estados ---

  // --- useEffect para buscar os treinos ---
  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoadingWorkouts(true);
      setErrorWorkouts('');
      try {
        const response = await api.get<WorkoutResponse[]>('/students/me/workouts');
        setWorkouts(response.data);
      } catch (err) {
        console.error("Erro ao buscar treinos do aluno:", err);
        setErrorWorkouts('Não foi possível carregar seus treinos.');
      } finally {
        setLoadingWorkouts(false);
      }
    };

    fetchWorkouts();
  }, []); // Array vazio para executar apenas na montagem inicial
  // --- Fim do useEffect ---

  const renderView = () => {
    switch (activeView) {
      case "workouts":
        // Passa os dados, loading e erro para MyWorkoutsView
        return <MyWorkoutsView
                  workouts={workouts}
                  isLoading={loadingWorkouts}
                  error={errorWorkouts}
                />;
      case "chat":
        return <StudentChatView />; // Manter como está por enquanto
      case "announcements":
        return <StudentAnnouncementsView />; // Manter como está por enquanto
      default:
        return <MyWorkoutsView
                  workouts={workouts}
                  isLoading={loadingWorkouts}
                  error={errorWorkouts}
                />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar não precisa mudar */}
      <StudentSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default StudentDashboard;

// --- Definição do Tipo (mantida aqui por enquanto) ---
export interface WorkoutResponse {
  id: string;
  student_id: string;
  name: string;
  description: string;
  is_active: boolean;
}
// --- Fim da Definição do Tipo ---