import { useState, useEffect } from "react";
import { Plus, Search, Eye, Loader2, AlertCircle, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";
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
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

// 1. IMPORTAR O UPLOADER
import FileUploader from "@/components/common/FileUploader";

interface WorkoutWithStudent {
  id: string;
  student_id: string;
  student_name: string;
  name: string;
  description: string;
  is_active: boolean;
  diet_plan_url?: string; // Campo novo
}
interface Student {
  id: string;
  name: string;
  email: string;
}
interface NewWorkoutForm {
  student_id: string;
  name: string;
  description: string;
  diet_plan_url?: string; // 2. NOVO CAMPO NO FORM
}

const WorkoutsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [workouts, setWorkouts] = useState<WorkoutWithStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  // 3. INICIALIZAR O ESTADO
  const [newWorkout, setNewWorkout] = useState<NewWorkoutForm>({
    student_id: "",
    name: "",
    description: "",
    diet_plan_url: "", // Inicia vazio
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [workoutsResponse, studentsResponse] = await Promise.all([
        api.get<WorkoutWithStudent[]>('/workouts'),
        api.get<Student[]>('/students')
      ]);
      setWorkouts(workoutsResponse.data);
      setStudents(studentsResponse.data);
    } catch (err) {
      console.error("Erro ao buscar dados da view de treinos:", err);
      setError("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateWorkout = async () => {
    setFormLoading(true);
    if (!newWorkout.student_id || !newWorkout.name) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione um aluno e dê um nome ao treino.",
        variant: "destructive",
      });
      setFormLoading(false);
      return;
    }
    try {
      // 4. O OBJETO newWorkout JÁ TEM O diet_plan_url AGORA
      const response = await api.post<WorkoutWithStudent>('/workouts', newWorkout);
      toast({
        title: "Ficha criada!",
        description: `O treino "${response.data.name}" foi criado com sucesso.`,
      });
      setIsDialogOpen(false);
      setNewWorkout({ student_id: "", name: "", description: "", diet_plan_url: "" });
      fetchData(); 
    } catch (err: any) {
      console.error("Erro ao criar ficha de treino:", err);
      toast({
        title: "Erro ao criar",
        description: "Não foi possível criar a ficha. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <p className="text-sm text-muted-foreground">Aluno: {workout.student_name}</p>
              
              {workout.diet_plan_url && (
                 <div className="text-xs text-blue-600 flex items-center gap-1">
                  <span>🥗 Dieta Anexada</span>
                 </div>
              )}

              <Badge variant={workout.is_active ? "default" : "outline"} className={workout.is_active ? "" : "border-gray-400 text-gray-500"}>
                {workout.is_active ? "Ativo" : "Inativo"}
              </Badge>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2"
                onClick={() => navigate(`/trainer/workout/${workout.id}`)} 
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver Detalhes
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Fichas de Treino</h1>
          <p className="text-muted-foreground">Crie e gerencie treinos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Ficha
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Ficha de Treino</DialogTitle>
              <DialogDescription>
                Selecione o aluno e defina os detalhes da nova ficha.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="student-select">Aluno (Obrigatório)</Label>
                <Select
                  value={newWorkout.student_id}
                  onValueChange={(value: string) => setNewWorkout(curr => ({ ...curr, student_id: value }))}
                  disabled={formLoading}
                >
                  <SelectTrigger id="student-select">
                    <SelectValue placeholder="Selecione um aluno..." />
                  </SelectTrigger>
                  <SelectContent>
                    {students.length > 0 ? (
                      students.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>Carregando alunos...</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workout-name">Nome da Ficha (Obrigatório)</Label>
                <Input
                  id="workout-name"
                  placeholder="Ex: Treino A - Peito e Tríceps"
                  value={newWorkout.name}
                  onChange={(e) => setNewWorkout(curr => ({ ...curr, name: e.target.value }))}
                  disabled={formLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workout-description">Descrição (Opcional)</Label>
                <Textarea
                  id="workout-description"
                  placeholder="Ex: Foco em hipertrofia, ênfase na parte superior do peitoral."
                  value={newWorkout.description}
                  onChange={(e) => setNewWorkout(curr => ({ ...curr, description: e.target.value }))}
                  disabled={formLoading}
                />
              </div>

              {/* 5. INSERÇÃO DO COMPONENTE DE UPLOAD */}
              <div className="border-t pt-4">
                 <FileUploader 
                    label="Plano Alimentar / Dieta (Opcional)"
                    currentUrl={newWorkout.diet_plan_url}
                    onUploadSuccess={(url) => setNewWorkout(curr => ({ ...curr, diet_plan_url: url }))}
                />
              </div>
              {/* --- FIM DO UPLOAD --- */}

              <Button onClick={handleCreateWorkout} className="w-full" disabled={formLoading}>
                {formLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {formLoading ? "Criando..." : "Criar Ficha"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

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