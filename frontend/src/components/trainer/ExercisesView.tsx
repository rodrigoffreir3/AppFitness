import { useState, useEffect, useRef } from "react";
import { Plus, Search, Loader2, AlertCircle, Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Adicionado Tabs
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Adicionado ScrollArea
import api from "@/services/api";

// --- Interface Atualizada ---
interface ExerciseResponse {
  id: string;
  name: string;
  muscle_group: string;
  equipment: string;
  video_url?: string; // Campo novo para o vídeo
}

// --- Componente: Cartão de Vídeo Inteligente ---
const ExerciseVideoCard = ({ exercise }: { exercise: ExerciseResponse }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      // Tenta dar play e trata erro (comum em navegadores que bloqueiam autoplay)
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Volta o vídeo pro começo (loop visual)
      setIsPlaying(false);
    }
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all group border-0 shadow-sm bg-muted/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Área do Vídeo (Aspecto 16:9) */}
      <div className="relative aspect-video bg-black/5 rounded-t-lg overflow-hidden">
        {exercise.video_url ? (
          <video
            ref={videoRef}
            src={exercise.video_url}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            preload="metadata" // Carrega só o início para não pesar
          />
        ) : (
          // Placeholder se não tiver vídeo
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
             <Video className="h-10 w-10 opacity-20" />
          </div>
        )}
        
        {/* Ícone de Play (Aparece quando parado, some quando mouse passa) */}
        {exercise.video_url && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-all">
            <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm group-hover:opacity-0 transition-opacity">
               <Play className="h-5 w-5 text-white fill-current" />
            </div>
          </div>
        )}

        {/* Badge de Equipamento discreta no canto */}
        <div className="absolute bottom-2 right-2">
           <Badge variant="secondary" className="text-[10px] opacity-90 backdrop-blur-md h-5 px-1.5">
             {exercise.equipment || "Livre"}
           </Badge>
        </div>
      </div>
      
      {/* Informações do Exercício */}
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm truncate" title={exercise.name}>
          {exercise.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 capitalize">
          {exercise.muscle_group || "Geral"}
        </p>
      </CardContent>
    </Card>
  );
};

const ExercisesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState<ExerciseResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Controle das Abas (Categorias)
  const [activeTab, setActiveTab] = useState("todos");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get<ExerciseResponse[]>('/exercises');
        const data = response.data;
        setExercises(data);

        // Mágica: Extrai todas as categorias únicas do banco e ordena alfabeticamente
        const uniqueCategories = Array.from(
          new Set(data.map(e => e.muscle_group).filter(Boolean))
        ).sort();
        setCategories(uniqueCategories);

      } catch (err) {
        console.error("Erro ao buscar exercícios:", err);
        setError("Não foi possível carregar os exercícios.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Lógica de Filtragem: (Busca Global) OU (Filtro por Aba)
  const filteredExercises = exercises.filter((exercise) => {
    // 1. Verifica se bate com a busca digitada
    const matchesSearch = 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscle_group.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Verifica se bate com a aba selecionada (se não tiver busca)
    const matchesTab = activeTab === "todos" || exercise.muscle_group === activeTab;

    // REGRA: Se o usuário digitou algo, ignoramos a aba e mostramos tudo que ele buscou.
    // Se a busca está vazia, respeitamos a aba clicada.
    return searchTerm ? matchesSearch : matchesTab;
  });

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca iai-DŌ</h1>
          <p className="text-muted-foreground">
            {exercises.length} exercícios disponíveis para seus alunos.
          </p>
        </div>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Criar Personalizado
        </Button>
      </div>

      {/* Barra de Busca */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar exercício (ex: Supino, Agachamento)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Abas de Categorias (Scroll Horizontal) */}
      {/* Só mostramos as abas se NÃO estiver buscando, para não poluir */}
      {!searchTerm && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-background/50 p-1">
            <TabsList className="flex w-max space-x-2 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="todos" 
                className="rounded-full px-4 py-1.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Todos
              </TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="rounded-full px-4 py-1.5 text-sm capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
      )}

      {/* Grid de Resultados */}
      {filteredExercises.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <h3 className="text-lg font-semibold">Nenhum exercício encontrado</h3>
          <p className="text-sm">Tente ajustar sua busca ou mudar de categoria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredExercises.map((exercise) => (
            <ExerciseVideoCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExercisesView;