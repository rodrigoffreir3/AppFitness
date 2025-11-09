import { useState, useEffect } from "react"; // Importar hooks
import { Plus, Search, Eye, Loader2, AlertCircle, Dumbbell } from "lucide-react"; // Importar ícones
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api"; // Importar API

// --- NOVO: Interface de Resposta ---
// Deve corresponder à struct WorkoutWithStudentResponse que criamos no backend
interface WorkoutWithStudent {
  id: string;
  student_id: string;
  student_name: string; // O nome do aluno que vem do JOIN
  name: string;
  description: string;
  is_active: boolean;
  // (exercises: 8) não vem da API, teremos que contar de outra forma no futuro
  // Por enquanto, vamos remover a contagem de exercícios.
}
// --- FIM NOVO ---

const WorkoutsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- ESTADOS CONECTADOS À API ---
  const [workouts, setWorkouts] = useState<WorkoutWithStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // --- FIM ESTADOS API ---

  // --- NOVO: useEffect para buscar dados ---
  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError("");
      try {
        // Chamada ao endpoint modificado (sem student_id)
        const response = await api.get<WorkoutWithStudent[]>('/workouts');
        setWorkouts(response.data);
      } catch (err) {
        console.error("Erro ao buscar fichas de treino:", err);
        setError("Não foi possível carregar as fichas de treino.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []); // Executa na montagem
  // --- FIM NOVO ---

  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- RENDERIZAÇÃO CONDICIONAL ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center text-destructive bg-destructive/10 border border-destructive rounded-lg p-6">
          <AlertCircle className="h-8 w-8 mb-4" />
          <p className="font-semibold">Erro ao carregar fichas</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }

    if (filteredWorkouts.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-12 border border-dashed rounded-lg">
          <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold">Nenhuma ficha de treino encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Tente um termo de busca diferente." : "Comece criando a primeira ficha de treino."}
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <Card key={workout.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{workout.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Agora exibimos o nome do aluno vindo da API */}
              <p className="text-sm text-muted-foreground">Aluno: {workout.student_name}</p>
              
              {/* Badge de Ativo/Inativo */}
              <Badge variant={workout.is_active ? "default" : "outline"} className={workout.is_active ? "" : "border-gray-400 text-gray-500"}>
                {workout.is_active ? "Ativo" : "Inativo"}
              </Badge>
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Eye className="mr-2 h-4 w-4" />
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  // --- FIM RENDERIZAÇÃO ---


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Fichas de Treino</h1>
          <p className="text-muted-foreground">Crie e gerencie treinos</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Ficha
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar fichas (por nome ou aluno)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default WorkoutsView;