import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, ArrowLeft, ListChecks, Clock, Info, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// --- DEFINIÇÃO DE TIPOS ---
interface WorkoutResponse {
  id: string;
  student_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

interface WorkoutExerciseResponse {
  id: string;
  exercise_id: string;
  exercise_name: string;
  video_url?: string;
  sets: number;
  reps: string;
  rest_period_seconds: number;
  order: number;
  notes: string;
  execution_details: string;
}

interface WorkoutDetailsData {
  workout: WorkoutResponse;
  exercises: WorkoutExerciseResponse[];
}

// --- SUB-COMPONENTE: CARD DO EXERCÍCIO (Com lógica de vídeo inteligente) ---
const StudentExerciseCard = ({ exercise }: { exercise: WorkoutExerciseResponse }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lógica de Mouse (Desktop)
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Opcional: Voltar ao início ao tirar o mouse
      setIsPlaying(false);
    }
  };

  // Lógica de Toque/Clique (Mobile e Desktop)
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <Card className="overflow-hidden border shadow-sm transition-all hover:shadow-md">
      {/* Área do Vídeo - Centralizada e contida */}
      {exercise.video_url && (
        <div className="pt-6 pb-2 px-4 flex justify-center">
          <div 
            className="relative w-full max-w-[85%] sm:max-w-[400px] aspect-video rounded-xl overflow-hidden bg-black/5 border cursor-pointer group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay} // Permite clique para mobile
          >
            <video 
              ref={videoRef}
              src={exercise.video_url} 
              className="w-full h-full object-cover"
              muted 
              loop 
              playsInline // Essencial para não abrir em tela cheia no iPhone
            />
            
            {/* Overlay de Ícone (Play/Pause) */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <div className="bg-black/40 p-3 rounded-full backdrop-blur-sm border border-white/20">
                 {isPlaying ? (
                   <Pause className="h-6 w-6 text-white fill-current" />
                 ) : (
                   <Play className="h-6 w-6 text-white fill-current ml-1" />
                 )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className={exercise.video_url ? "pt-2 pb-2" : ""}>
        <div className="flex items-center justify-between">
           <CardTitle className="text-xl font-bold text-foreground">
             {exercise.exercise_name}
           </CardTitle>
           <Badge variant="secondary" className="text-muted-foreground font-mono">
             #{exercise.order}
           </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* Detalhes Principais */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col bg-primary/5 p-3 rounded-lg border border-primary/10">
            <div className="flex items-center gap-2 mb-1 text-primary">
              <ListChecks className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Carga</span>
            </div>
            <p className="font-medium text-sm text-foreground">
              <span className="text-lg font-bold">{exercise.sets}</span> séries <span className="text-muted-foreground">x</span> <span className="text-lg font-bold">{exercise.reps}</span> reps
            </p>
          </div>

          <div className="flex flex-col bg-primary/5 p-3 rounded-lg border border-primary/10">
            <div className="flex items-center gap-2 mb-1 text-primary">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Descanso</span>
            </div>
            <p className="font-medium text-sm text-foreground">
              <span className="text-lg font-bold">{exercise.rest_period_seconds}</span> <span className="text-xs text-muted-foreground">segundos</span>
            </p>
          </div>
        </div>

        {/* Detalhes da Execução (Colapsável ou visualmente distinto) */}
        {exercise.execution_details && (
          <div className="text-sm bg-muted/30 p-3 rounded-md border border-border/50">
            <h4 className="font-medium mb-1 flex items-center gap-1.5 text-foreground/80">
              <Info className="h-3.5 w-3.5" /> Técnica
            </h4>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {exercise.execution_details}
            </p>
          </div>
        )}

        {/* Observações do Treinador */}
        {exercise.notes && (
          <div className="text-sm bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-md border border-yellow-200/50 dark:border-yellow-900/50">
            <h4 className="font-medium mb-1 text-yellow-700 dark:text-yellow-500">Observações</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {exercise.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// --- COMPONENTE PRINCIPAL ---
const WorkoutDetails = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  
  const [data, setData] = useState<WorkoutDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
  }, [workoutId]);

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

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-10">
      {/* Botão de Voltar */}
      <Button asChild variant="ghost" size="sm" className="w-fit -ml-2 text-muted-foreground hover:text-foreground">
        <Link to="/student/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Meus Treinos
        </Link>
      </Button>

      {/* Cabeçalho do Treino */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{data.workout.name}</h1>
        {data.workout.description && (
          <p className="text-muted-foreground text-lg">{data.workout.description}</p>
        )}
      </div>

      {/* Lista de Exercícios usando o novo componente */}
      <div className="space-y-6">
        {data.exercises.length > 0 ? (
          data.exercises.map((exercise) => (
            <StudentExerciseCard key={exercise.id} exercise={exercise} />
          ))
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
            <p className="text-muted-foreground">Nenhum exercício foi adicionado a este treino ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetails;