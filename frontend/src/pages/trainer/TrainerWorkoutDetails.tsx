import { useState, useEffect, useRef } from 'react';
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
  Edit,
  Search,
  Video,
  Link as LinkIcon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
  video_url?: string;
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
  equipment: string;
  video_url?: string;
}

// Unificamos o estado do formulário (ADICIONADO video_url)
interface ExerciseFormData {
  exercise_id: string;
  exercise_name?: string;
  video_url?: string; // NOVO CAMPO
  sets: number;
  reps: string;
  rest_period_seconds: number;
  order: number;
  notes: string;
  execution_details: string;
}

// --- HELPERS ---
const isVimeo = (url: string) => url.includes('vimeo.com') || url.includes('player.vimeo.com');

const getVimeoEmbedUrl = (url: string) => {
  const vimeoRegex = /vimeo\.com\/(\d+)/;
  const match = url.match(vimeoRegex);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}?badge=0&autopause=0&player_id=0&app_id=58479`;
  }
  return url;
};

// --- Componente Mini Card para o Seletor (Otimizado) ---
const MiniExerciseCard = ({ exercise, onSelect, isSelected }: { exercise: LibraryExercise, onSelect: () => void, isSelected: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
      else setIsVisible(false);
    }, { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Card 
      ref={containerRef}
      className={`overflow-hidden cursor-pointer transition-all group border shadow-sm ${isSelected ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/50'}`}
      onMouseEnter={() => { if(videoRef.current && isVisible) videoRef.current.play().catch(()=>{}) }}
      onMouseLeave={() => { if(videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}
      onClick={onSelect}
    >
      <div className="relative aspect-video bg-black/5 overflow-hidden">
        {exercise.video_url && isVisible ? (
          <video
            ref={videoRef}
            src={exercise.video_url}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            preload="metadata"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
             <Video className="h-8 w-8 opacity-20" />
          </div>
        )}
      </div>
      <CardContent className="p-2">
        <h3 className="font-semibold text-xs truncate" title={exercise.name}>
          {exercise.name}
        </h3>
        <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">
          {exercise.muscle_group || "Geral"}
        </p>
      </CardContent>
    </Card>
  );
};

// --- NOVO COMPONENTE: ITEM DA LISTA (Otimizado para iOS) ---
// Extraído para permitir Lazy Loading individual
const TrainerExerciseItem = ({ 
  exercise, 
  onEdit, 
  onDelete 
}: { 
  exercise: WorkoutExercise; 
  onEdit: (ex: WorkoutExercise) => void;
  onDelete: (id: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1, rootMargin: '100px' });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const renderVideo = () => {
    if (!exercise.video_url) {
      return (
        <span className="font-mono text-2xl font-bold text-muted-foreground/50">
          #{exercise.order}
        </span>
      );
    }

    if (!isVisible) return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;

    if (isVimeo(exercise.video_url)) {
      return (
        <iframe 
          src={getVimeoEmbedUrl(exercise.video_url)} 
          className="w-full h-full" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
        />
      );
    }

    return (
      <video 
        src={exercise.video_url} 
        className="w-full h-full object-cover max-h-24 sm:max-h-full"
        muted 
        playsInline
        loop
        onMouseOver={e => e.currentTarget.play().catch(()=>{})}
        onMouseOut={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
      />
    );
  };

  return (
    <Card className="overflow-hidden group hover:border-primary/30 transition-all">
      <div className="flex flex-col sm:flex-row h-full">
        <div ref={containerRef} className="relative w-full sm:w-32 bg-black/5 flex items-center justify-center border-r border-border/50 min-h-[100px] sm:min-h-full">
          {renderVideo()}
          {exercise.video_url && (
            <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded font-mono">
              #{exercise.order}
            </div>
          )}
        </div>
        
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
            <div className="mt-3 text-sm bg-yellow-50/50 p-2 rounded border border-yellow-100 text-muted-foreground">
              💡 {exercise.notes}
            </div>
          )}
        </div>

        <div className="p-2 sm:p-4 flex items-center justify-end gap-2 border-t sm:border-t-0 sm:border-l border-border/50 bg-muted/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={() => onEdit(exercise)}
          >
            <Edit className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(exercise.id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

// --- PÁGINA PRINCIPAL ---
const TrainerWorkoutDetails = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  
  // Estados de Dados
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [library, setLibrary] = useState<LibraryExercise[]>([]);
  
  // Estados de UI
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false); // Modal do Seletor
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Estados para o Seletor Inteligente
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [categories, setCategories] = useState<string[]>([]);

  // Estado do Formulário
  const [formData, setFormData] = useState<ExerciseFormData>({
    exercise_id: "",
    exercise_name: "",
    video_url: "", // Inicia vazio
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

        // Extrair categorias para o seletor
        const uniqueCategories = Array.from(
          new Set(libraryRes.data.map((e) => e.muscle_group).filter(Boolean))
        ).sort();
        setCategories(uniqueCategories);

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
      exercise_name: "",
      video_url: "",
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
      exercise_name: exercise.exercise_name,
      video_url: exercise.video_url || "",
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
        exercise_id: formData.exercise_id, // Importante mandar o ID
        video_url: formData.video_url, // Salva o link Custom (Vimeo) ou original
        sets: Number(formData.sets),
        reps: formData.reps,
        rest_period_seconds: Number(formData.rest_period_seconds),
        order: Number(formData.order),
        notes: formData.notes,
        execution_details: formData.execution_details
      };

      if (editingId) {
        await api.put(`/workouts/${workoutId}/exercises/${editingId}`, payload);
        toast.success("Exercício atualizado!");
      } else {
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

  // Lógica de Filtragem do Seletor
  const filteredLibrary = library.filter((exercise) => {
    const matchesSearch = 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscle_group.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "todos" || exercise.muscle_group === activeTab;

    return searchTerm ? matchesSearch : matchesTab;
  });

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

        {/* --- MODAL PRINCIPAL: Configuração do Exercício --- */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar Exercício" : "Novo Exercício"}</DialogTitle>
              <DialogDescription>
                Selecione o exercício e configure a carga de treino.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              {/* O SELETOR INTELIGENTE */}
              <div className="grid gap-2">
                <Label>Exercício</Label>
                
                {/* Se estiver editando, apenas mostra o nome */}
                {editingId ? (
                   <div className="p-3 bg-muted rounded-md font-medium text-sm border flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-primary" />
                      {formData.exercise_name}
                   </div>
                ) : (
                  // Botão que abre o Modal da Biblioteca
                  <Dialog open={isSelectorOpen} onOpenChange={setIsSelectorOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-between font-normal text-muted-foreground hover:text-foreground">
                        {formData.exercise_name || "🔍 Clique para buscar na biblioteca..."}
                        <Search className="h-4 w-4 ml-2 opacity-50" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0">
                      
                      {/* Header do Seletor */}
                      <div className="p-4 border-b space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">Biblioteca de Exercícios</h3>
                        </div>
                        
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Buscar por nome (ex: Supino, Agachamento)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                            autoFocus
                          />
                        </div>

                        {/* Abas de Categoria (Scroll Horizontal) */}
                        {!searchTerm && (
                          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <ScrollArea className="w-full whitespace-nowrap pb-2">
                              <TabsList className="bg-transparent p-0 h-auto gap-2">
                                <TabsTrigger 
                                  value="todos" 
                                  className="rounded-full border px-4 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                >
                                  Todos
                                </TabsTrigger>
                                {categories.map((cat) => (
                                  <TabsTrigger 
                                    key={cat} 
                                    value={cat}
                                    className="rounded-full border px-4 py-1.5 capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                  >
                                    {cat}
                                  </TabsTrigger>
                                ))}
                              </TabsList>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          </Tabs>
                        )}
                      </div>

                      {/* Grid de Exercícios (Scroll Vertical) */}
                      <ScrollArea className="flex-1 p-4 bg-muted/10">
                        {filteredLibrary.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                            <Search className="h-8 w-8 mb-2 opacity-20" />
                            <p>Nenhum exercício encontrado.</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {filteredLibrary.map((ex) => (
                              <MiniExerciseCard 
                                key={ex.id} 
                                exercise={ex} 
                                isSelected={formData.exercise_id === ex.id}
                                onSelect={() => {
                                  setFormData({
                                    ...formData, 
                                    exercise_id: ex.id, 
                                    exercise_name: ex.name,
                                    video_url: ex.video_url // Pega o vídeo padrão ao selecionar
                                  });
                                  setIsSelectorOpen(false); // Fecha o seletor após escolher
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* INPUT DE VÍDEO PERSONALIZADO (NOVO) */}
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  <LinkIcon className="h-3.5 w-3.5 text-blue-500" /> 
                  Link de Vídeo Personalizado <span className="text-xs font-normal text-muted-foreground">(Vimeo ou MP4)</span>
                </Label>
                <Input 
                  placeholder="https://vimeo.com/..." 
                  value={formData.video_url || ""}
                  onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                />
                <p className="text-[10px] text-muted-foreground">Deixe em branco para usar o vídeo padrão da biblioteca.</p>
              </div>

              {/* Restante do Formulário (Séries, Reps...) */}
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

      {/* Lista de Exercícios Adicionados à Ficha (USANDO NOVO COMPONENTE) */}
      <div className="grid gap-4">
        {exercises.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/20">
            <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">Nenhum exercício adicionado</h3>
            <p className="text-muted-foreground">Use o botão acima para montar a ficha.</p>
          </div>
        ) : (
          exercises.map((exercise) => (
            <TrainerExerciseItem 
              key={exercise.id} 
              exercise={exercise} 
              onEdit={openEditDialog}
              onDelete={handleDeleteExercise}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TrainerWorkoutDetails;