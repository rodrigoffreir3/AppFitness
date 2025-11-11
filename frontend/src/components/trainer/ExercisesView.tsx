import { useState, useEffect } from "react";
import { Plus, Search, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";

// --- NOVO: Interface de Resposta ---
// Baseado no handler exercises_handler.go
interface ExerciseResponse {
  id: string;
  name: string;
  muscle_group: string;
  equipment: string;
}
// --- FIM NOVO ---

const ExercisesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- ESTADOS CONECTADOS À API ---
  const [exercises, setExercises] = useState<ExerciseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // --- FIM ESTADOS API ---

  // --- NOVO: useEffect para buscar dados ---
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setError("");
      try {
        //
        const response = await api.get<ExerciseResponse[]>('/exercises'); 
        setExercises(response.data);
      } catch (err) {
        console.error("Erro ao buscar biblioteca de exercícios:", err);
        setError("Não foi possível carregar os exercícios.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []); // Executa na montagem
  // --- FIM NOVO ---

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscle_group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase())
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
          <p className="font-semibold">Erro ao carregar exercícios</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }

    if (filteredExercises.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-12">
          <h3 className="mt-2 text-sm font-semibold">Nenhum exercício encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Tente um termo de busca diferente." : "A biblioteca de exercícios está vazia."}
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle className="text-lg">{exercise.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge>{exercise.muscle_group}</Badge>
              <Badge variant="secondary">{exercise.equipment}</Badge>
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
          <h1 className="text-3xl font-bold">Biblioteca de Exercícios</h1>
          <p className="text-muted-foreground">Gerencie sua biblioteca</p>
        </div>
        
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Novo Exercício
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar exercícios (nome, grupo, equipamento)..."
          value={searchTerm}
          // --- CORREÇÃO AQUI ---
          onChange={(e) => setSearchTerm(e.target.value)}
          // --- FIM DA CORREÇÃO ---
          className="pl-10"
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default ExercisesView;