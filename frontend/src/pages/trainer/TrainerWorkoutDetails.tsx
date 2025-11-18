import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Interfaces para os dados (vamos precisar buscar o treino e os exercícios)
interface Workout {
  id: string;
  name: string;
  description: string;
  student_id: string;
  is_active: boolean;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest_period_seconds: number;
  notes: string;
}

const TrainerWorkoutDetails = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [] = useState<Exercise[]>([]); // Preparado para receber exercícios
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      if (!workoutId) return;
      
      setLoading(true);
      setError('');
      try {
        // 1. Buscar detalhes do treino (endpoint existente)
        const response = await api.get<Workout>(`/workouts/${workoutId}`);
        setWorkout(response.data);

        // 2. Futuramente: Buscar exercícios deste treino
        // const exercisesResponse = await api.get(`/workouts/${workoutId}/exercises`);
        // setExercises(exercisesResponse.data);

      } catch (err) {
        console.error("Erro ao buscar detalhes do treino:", err);
        setError("Não foi possível carregar os detalhes do treino.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [workoutId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center text-destructive bg-destructive/10 border border-destructive rounded-lg p-6">
        <AlertCircle className="h-8 w-8 mb-4" />
        <p className="font-semibold">Erro</p>
        <p className="text-sm">{error || "Treino não encontrado"}</p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link to="/trainer/dashboard/workouts">Voltar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho com Botão Voltar */}
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link to="/trainer/dashboard/workouts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{workout.name}</h1>
          <p className="text-muted-foreground">Gerenciar exercícios desta ficha</p>
        </div>
      </div>

      {/* Detalhes do Treino */}
      <Card>
        <CardHeader>
          <CardTitle>Informações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Descrição:</strong> {workout.description || "Sem descrição"}</p>
          <p><strong>Status:</strong> {workout.is_active ? "Ativo" : "Inativo"}</p>
        </CardContent>
      </Card>

      {/* Área de Exercícios (Placeholder para o próximo passo) */}
      <Card>
        <CardHeader>
          <CardTitle>Exercícios</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            A funcionalidade de adicionar exercícios será implementada a seguir.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerWorkoutDetails;
