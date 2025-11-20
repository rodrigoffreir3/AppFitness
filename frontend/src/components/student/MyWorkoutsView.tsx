import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertCircle, Loader2, Dumbbell } from "lucide-react";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import api from '@/services/api';

// Interface dos dados que vêm da API
interface WorkoutResponse {
  id: string;
  student_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

const MyWorkoutsView = () => {
  const navigate = useNavigate();
  
  // Estados Internos (o componente agora é autónomo)
  const [workouts, setWorkouts] = useState<WorkoutResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Buscar Dados
  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Endpoint: /students/me/workouts
        const response = await api.get<WorkoutResponse[]>('/students/me/workouts');
        setWorkouts(response.data);
      } catch (err) {
        console.error("Erro ao buscar treinos:", err);
        setError('Não foi possível carregar seus treinos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleViewDetails = (workoutId: string) => {
    navigate(`/student/workout/${workoutId}`);
  };

  // Renderização
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Carregando seus treinos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center text-destructive bg-destructive/10 border border-destructive rounded-lg p-6">
        <AlertCircle className="h-8 w-8 mb-4" />
        <p className="font-semibold">Erro ao carregar treinos</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Treinos</h1>
        <p className="text-muted-foreground">Acompanhe suas fichas de treino</p>
      </div>

      {workouts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {workouts.map((workout) => (
            <Card key={workout.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{workout.name}</CardTitle>
                {workout.description && (
                  <p className="text-sm text-muted-foreground pt-1">{workout.description}</p>
                )}
                <Badge variant="secondary" className="w-fit mt-2">
                    Ativo
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleViewDetails(workout.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalhes do Treino
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-12 border border-dashed rounded-lg">
           <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
           <h3 className="mt-2 text-sm font-semibold">Nenhum treino ativo encontrado</h3>
           <p className="mt-1 text-sm text-gray-500">Seu treinador ainda não adicionou treinos ativos para você.</p>
        </div>
      )}
    </div>
  );
};

export default MyWorkoutsView;