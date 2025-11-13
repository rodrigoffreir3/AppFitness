import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Por enquanto, esta página é um placeholder.
// O próximo passo será ligá-la aos endpoints
// GET /api/workouts/{id} e GET /api/workouts/{id}/exercises
const TrainerWorkoutDetails = () => {
  const { workoutId } = useParams<{ workoutId: string }>();

  return (
    <div className="space-y-6">
      <Button asChild variant="outline" size="sm" className="w-fit">
        <Link to="/trainer/dashboard"> {/* Ajuste: O Link deve apontar para /trainer/dashboard */}
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Fichas
        </Link>
      </Button>

      <h1 className="text-3xl font-bold">Editar Ficha de Treino</h1>
      <p className="text-muted-foreground mt-2">
        Editando o treino com ID: {workoutId}
      </p>
      
      {/* Aqui entrará:
        1. Formulário para editar Nome/Descrição (PUT /api/workouts/{id})
        2. Lista de exercícios (GET /api/workouts/{id}/exercises)
        3. Formulário para adicionar exercícios (POST /api/workouts/{id}/exercises)
      */}
    </div>
  );
};

export default TrainerWorkoutDetails;