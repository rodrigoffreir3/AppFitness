import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, AlertCircle, ArrowLeft, ListChecks, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- DEFINIÇÃO DE TIPOS ---
// Baseado no students_handler.go e types.go
// Interface do Treino (a mesma do StudentDashboard)
interface WorkoutResponse {
  id: string;
  student_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

// Interface do Exercício Detalhado (de types.go)
interface WorkoutExerciseResponse {
  id: string;
  exercise_id: string;
  exercise_name: string;
  video_url?: string; // <--- CAMPO ADICIONADO
  sets: number;
  reps: string;
  rest_period_seconds: number;
  order: number;
  notes: string;
  execution_details: string;
}

// Interface para os dados completos que a API retorna
interface WorkoutDetailsData {
  workout: WorkoutResponse;
  exercises: WorkoutExerciseResponse[];
}
// --- FIM DOS TIPOS ---

const WorkoutDetails = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  
  // --- ESTADOS ---
  const [data, setData] = useState<WorkoutDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // --- FIM DOS ESTADOS ---

  // --- useEffect PARA BUSCAR OS DADOS ---
  useEffect(() => {
    if (!workoutId) return;

    const fetchWorkoutDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get<WorkoutDetailsData>(`/students/me/workouts/${workoutId}`);
        setData(response.data);
      } catch (err: any) {
        console.error("Erro ao buscar detalhes do treino:", err);
        setError('Não foi possível carregar os detalhes deste treino.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [workoutId]); // Depende do workoutId da URL
  // --- FIM DO useEffect ---

  // --- RENDERIZAÇÃO DE LOADING E ERRO ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center text-destructive bg-destructive/10 border border-destructive rounded-lg p-6">
        <AlertCircle className="h-8 w-8 mb-4" />
        <p className="font-semibold">Erro ao carregar</p>
        <p className="text-sm">{error}</p>
        <Link to="/student/dashboard" className="mt-4 text-sm text-primary underline">
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-muted-foreground py-12">
        Nenhum dado encontrado para este treino.
      </div>
    );
  }

  // --- RENDERIZAÇÃO DE SUCESSO ---
  return (
    <div className="space-y-6">
      {/* Botão de Voltar */}
      <Button asChild variant="outline" size="sm" className="w-fit">
        <Link to="/student/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Meus Treinos
        </Link>
      </Button>

      {/* Cabeçalho do Treino */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{data.workout.name}</CardTitle>
          {data.workout.description && (
            <CardDescription className="text-base pt-1">{data.workout.description}</CardDescription>
          )}
        </CardHeader>
      </Card>

      {/* Lista de Exercícios */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Exercícios</h2>
        {data.exercises.length > 0 ? (
          data.exercises.map((exercise) => (
            <Card key={exercise.id} className="overflow-hidden">
              {/* CORREÇÃO: Renderização do Vídeo no Topo do Card */}
              {exercise.video_url && (
                <div className="w-full aspect-video bg-black">
                   <video 
                      src={exercise.video_url} 
                      className="w-full h-full object-contain"
                      controls
                      playsInline
                      poster="/placeholder.svg" // Opcional: poster se quiser
                    />
                </div>
              )}
              
              <CardHeader className={exercise.video_url ? "pt-4" : ""}>
                <CardTitle className="text-xl flex items-center justify-between">
                   <span>{exercise.exercise_name}</span>
                   <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded">#{exercise.order}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Detalhes: Séries, Reps, Descanso */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Séries & Reps</p>
                      <p className="font-medium">{exercise.sets}x {exercise.reps}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Descanso</p>
                      <p className="font-medium">{exercise.rest_period_seconds} seg</p>
                    </div>
                  </div>
                </div>

                {/* Notas de Execução */}
                {exercise.execution_details && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      Detalhes da Execução
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md whitespace-pre-wrap">
                      {exercise.execution_details}
                    </p>
                  </div>
                )}

                {/* Observações */}
                {exercise.notes && (
                  <div>
                    <h4 className="font-semibold mb-2">Observações</h4>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md whitespace-pre-wrap">
                      {exercise.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">Nenhum exercício foi adicionado a este treino ainda.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetails;