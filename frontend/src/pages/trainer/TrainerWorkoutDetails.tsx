import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/services/api';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Loader2, 
  Dumbbell, 
  Clock, 
  RotateCcw, 
  Save,
  Edit // Importado ícone de edição
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// --- Interfaces ---
interface Workout {
  id: string;
  name: string;
  description: string;
  student_id: string;
  is_active: boolean;
}

interface WorkoutExercise {
  id: string;
  exercise_id: string;
  exercise_name: string;
  sets: number;
  reps: string;
  rest_period_seconds: number;
  order: number;
  notes: string;
  execution_details: string;
}

interface LibraryExercise {
  id: string;
  name: string;
  muscle_group: string;
}

// Unificamos o estado do formulário
interface ExerciseFormData {
  exercise_id: string;
  sets: number;
  reps: string;
  rest_period_seconds: number;
  order: number;
  notes: string;
  execution_details: string;
}

const TrainerWorkoutDetails = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  
  // Estados de Dados
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [library, setLibrary] = useState<LibraryExercise[]>([]);
  
  // Estados de UI
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // Controla se é edição

  // Estado do Formulário
  const [formData, setFormData] = useState<ExerciseFormData>({
    exercise_id: "",
    sets: 3,
    reps: "10-12",
    rest_period_seconds: 60,
    order: 1,
    notes: "",
    execution_details: ""
  });

  // 1. Carregar Dados
  useEffect(() => {
    const fetchAllData = async () => {
      if (!workoutId) return;
      setLoading(true);
      try {
        const [workoutRes, exercisesRes, libraryRes] = await Promise.all([
          api.get<Workout>(`/workouts/${workoutId}`),
          api.get<WorkoutExercise[]>(`/workouts/${workoutId}/exercises`),
          api.get<LibraryExercise[]>('/exercises')
        ]);

        setWorkout(workoutRes.data);
        setExercises(exercisesRes.data);
        setLibrary(libraryRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        toast.error("Erro ao carregar dados do treino.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [workoutId]);

  // Função auxiliar para resetar o form (Modo Criar)
  const openCreateDialog = () => {
    setEditingId(null);
    const nextOrder = exercises.length > 0 
      ? Math.max(...exercises.map(e => e.order)) + 1 
      : 1;
      
    setFormData({
      exercise_id: "",
      sets: 3,
      reps: "10-12",
      rest_period_seconds: 60,
      order: nextOrder,
      notes: "",
      execution_details: ""
    });
    setIsDialogOpen(true);
  };

  // Função para preencher o form (Modo Editar)
  const openEditDialog = (exercise: WorkoutExercise) => {
    setEditingId(exercise.id);
    setFormData({
      exercise_id: exercise.exercise_id,
      sets: exercise.sets,
      reps: exercise.reps,
      rest_period_seconds: exercise.rest_period_seconds,
      order: exercise.order,
      notes: exercise.notes || "",
      execution_details: exercise.execution_details || ""
    });
    setIsDialogOpen(true);
  };

  // 2. Salvar (Criar ou Editar)
  const handleSave = async () => {
    if (!formData.exercise_id) {
      toast.error("Selecione um exercício da lista.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        sets: Number(formData.sets),
        rest_period_seconds: Number(formData.rest_period_seconds),
        order: Number(formData.order)
      };

      if (editingId) {
        // --- MODO EDIÇÃO (PUT) ---
        // O backend não permite mudar o exercise_id no update, mas enviamos o resto
        await api.put(`/workouts/${workoutId}/exercises/${editingId}`, payload);
        toast.success("Exercício atualizado!");
      } else {
        // --- MODO CRIAÇÃO (POST) ---
        await api.post(`/workouts/${workoutId}/exercises`, payload);
        toast.success("Exercício adicionado!");
      }
      
      // Recarregar a lista
      const updatedList = await api.get<WorkoutExercise[]>(`/workouts/${workoutId}/exercises`);
      setExercises(updatedList.data);
      setIsDialogOpen(false);

    } catch (err) {
      console.error("Erro ao salvar:", err);
      toast.error("Não foi possível salvar as alterações.");
    } finally {
      setSaving(false);
    }
  };

  // 3. Deletar
  const handleDeleteExercise = async (exerciseId: string) => {
    const previousList = [...exercises];
    setExercises(exercises.filter(e => e.id !== exerciseId));

    try {
      await api.delete(`/workouts/${workoutId}/exercises/${exerciseId}`);
      toast.success("Exercício removido.");
    } catch (err) {
      console.error("Erro ao deletar:", err);
      toast.error("Erro ao remover.");
      setExercises(previousList);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!workout) {
    return <div className="p-8 text-center">Treino não encontrado.</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link to="/trainer/dashboard/workouts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{workout.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Badge variant={workout.is_active ? "default" : "secondary"}>
                {workout.is_active ? "Ativo" : "Inativo"}
              </Badge>
              <span className="text-sm">{workout.description || "Sem descrição"}</span>
            </div>
          </div>
        </div>

        <Button className="gap-2" onClick={openCreateDialog}>
          <Plus className="h-4 w-4" />
          Adicionar Exercício
        </Button>

        {/* Modal Único (Criação e Edição) */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar Exercício" : "Novo Exercício"}</DialogTitle>
              <DialogDescription>
                Configure as séries, repetições e detalhes da execução.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              {/* Seleção do Exercício (Desabilitado na edição) */}
              <div className="grid gap-2">
                <Label>Exercício</Label>
                <Select 
                  value={formData.exercise_id} 
                  onValueChange={(val) => setFormData({...formData, exercise_id: val})}
                  disabled={!!editingId} // Trava se for edição
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione da biblioteca..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {library.map((ex) => (
                      <SelectItem key={ex.id} value={ex.id}>
                        {ex.name} <span className="text-muted-foreground ml-2 text-xs">({ex.muscle_group})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Séries</Label>
                  <Input 
                    type="number" 
                    value={formData.sets} 
                    onChange={(e) => setFormData({...formData, sets: Number(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Repetições</Label>
                  <Input 
                    value={formData.reps} 
                    placeholder="Ex: 10-12"
                    onChange={(e) => setFormData({...formData, reps: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Descanso (seg)</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-9"
                      type="number" 
                      value={formData.rest_period_seconds} 
                      onChange={(e) => setFormData({...formData, rest_period_seconds: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Ordem</Label>
                  <Input 
                    type="number" 
                    value={formData.order} 
                    onChange={(e) => setFormData({...formData, order: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Observações (Opcional)</Label>
                <Textarea 
                  placeholder="Ex: Drop-set na última série..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              {editingId ? "Salvar Alterações" : "Adicionar ao Treino"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Exercícios */}
      <div className="grid gap-4">
        {exercises.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/20">
            <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">Nenhum exercício adicionado</h3>
            <p className="text-muted-foreground">Use o botão acima para montar a ficha.</p>
          </div>
        ) : (
          exercises.map((exercise) => (
            <Card key={exercise.id} className="overflow-hidden group">
              <div className="flex flex-col sm:flex-row">
                {/* Ordem */}
                <div className="bg-muted/30 p-4 flex items-center justify-center sm:w-16 border-r border-border/50 font-mono text-lg font-bold text-muted-foreground">
                  #{exercise.order}
                </div>
                
                {/* Dados */}
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <h3 className="font-semibold text-lg mb-2">{exercise.exercise_name}</h3>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <RotateCcw className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">{exercise.sets}</span> séries
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Dumbbell className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">{exercise.reps}</span> reps
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium text-foreground">{exercise.rest_period_seconds}s</span> descanso
                    </div>
                  </div>

                  {exercise.notes && (
                    <div className="mt-3 text-sm bg-accent/10 p-2 rounded border-l-2 border-accent text-muted-foreground">
                      {exercise.notes}
                    </div>
                  )}
                </div>

                {/* Ações (Editar e Deletar) */}
                <div className="p-2 sm:p-4 flex items-center justify-end gap-2 border-t sm:border-t-0 sm:border-l border-border/50 bg-muted/10">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => openEditDialog(exercise)}
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteExercise(exercise.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TrainerWorkoutDetails;