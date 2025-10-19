import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Adicionado Dumbbell aqui 👇
import { Eye, AlertCircle, Loader2, Dumbbell } from "lucide-react";
// Assumindo que a interface será mantida no Dashboard por enquanto, ou movida para @/types se existir
import { WorkoutResponse } from '@/pages/student/Dashboard';

// 1. Definir as props que o componente receberá
interface MyWorkoutsViewProps {
  workouts: WorkoutResponse[];
  isLoading: boolean;
  error: string;
}

const MyWorkoutsView = ({ workouts, isLoading, error }: MyWorkoutsViewProps) => {

  // 2. Lógica de renderização condicional baseada nas props

  // Estado de Carregamento
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Carregando seus treinos...</p>
      </div>
    );
  }

  // Estado de Erro
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center text-destructive bg-destructive/10 border border-destructive rounded-lg p-6">
        <AlertCircle className="h-8 w-8 mb-4" />
        <p className="font-semibold">Erro ao carregar treinos</p>
        <p className="text-sm">{error}</p>
        {/* Poderia adicionar um botão de tentar novamente aqui */}
      </div>
    );
  }

  // Estado Normal (com ou sem treinos)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Treinos</h1>
        <p className="text-muted-foreground">Acompanhe suas fichas de treino</p>
      </div>

      {workouts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {/* 3. Mapear o array 'workouts' recebido via props */}
          {workouts.map((workout) => (
            <Card key={workout.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{workout.name}</CardTitle>
                {/* Usar a descrição se houver */}
                {workout.description && (
                  <p className="text-sm text-muted-foreground pt-1">{workout.description}</p>
                )}
                {/* Exemplo: Badge para indicar se está ativo (assumindo que a API só retorna ativos) */}
                <Badge variant="secondary" className="w-fit mt-2">
                    Ativo
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* A API /students/me/workouts não retorna os exercícios,
                   então vamos remover a prévia dos exercícios daqui por enquanto.
                   O aluno precisará clicar para ver os detalhes. */}
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalhes do Treino
                  {/* Este botão precisará navegar para a página de detalhes do treino */}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // 4. Mensagem para quando não há treinos
        <div className="text-center text-muted-foreground py-12 border border-dashed rounded-lg">
           <Dumbbell className="mx-auto h-12 w-12 text-gray-400" /> {/* Agora a importação existe */}
           <h3 className="mt-2 text-sm font-semibold">Nenhum treino ativo encontrado</h3>
           <p className="mt-1 text-sm text-gray-500">Seu treinador ainda não adicionou treinos ativos para você.</p>
        </div>
      )}
    </div>
  );
};

export default MyWorkoutsView;