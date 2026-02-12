import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Search, Loader2, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";

interface ExerciseResponse {
  id: string;
  name: string;
  muscle_group: string;
  equipment: string;
  video_url?: string;
}

const isExternalVideo = (url?: string) => {
  if (!url) return false;
  return url.includes("vimeo") || url.includes("youtube") || url.includes("youtu.be");
};

const ExerciseVideoCard = ({
  exercise,
  onOpen,
}: {
  exercise: ExerciseResponse;
  onOpen: (exercise: ExerciseResponse) => void;
}) => {
  const external = isExternalVideo(exercise.video_url);

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all group border-0 shadow-sm bg-muted/20"
      onClick={() => onOpen(exercise)}
      role="button"
      tabIndex={0}
    >
      <div className="relative aspect-video bg-black/5 rounded-t-lg overflow-hidden">
        {/* Preview estático (não tenta tocar no hover) */}
        <div className="w-full h-full flex items-center justify-center bg-black/10">
          <div className="bg-black/45 p-3 rounded-full backdrop-blur-sm">
            <Play className="h-5 w-5 text-white fill-current" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute bottom-2 left-2">
          {exercise.video_url ? (
            external ? (
              <Badge variant="secondary" className="text-[10px] opacity-90 backdrop-blur-md h-5 px-1.5">
                Externo
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-[10px] opacity-90 backdrop-blur-md h-5 px-1.5">
                Vídeo
              </Badge>
            )
          ) : (
            <Badge variant="secondary" className="text-[10px] opacity-90 backdrop-blur-md h-5 px-1.5">
              Sem vídeo
            </Badge>
          )}
        </div>

        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="text-[10px] opacity-90 backdrop-blur-md h-5 px-1.5">
            {exercise.equipment || "Livre"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3">
        <h3 className="font-semibold text-sm truncate" title={exercise.name}>
          {exercise.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
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

  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: "",
    muscle_group: "",
    equipment: "livre",
    video_url: "",
  });
  const [createLoading, setCreateLoading] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("todos");

  // Modal player
  const [playerOpen, setPlayerOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseResponse | null>(null);

  const openPlayer = (ex: ExerciseResponse) => {
    setSelectedExercise(ex);
    setPlayerOpen(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<string[]>("/exercises/categories");
        setCategories(response.data);
        // Se ainda não escolheu grupo ao criar, seta o primeiro
        if (response.data?.length && !newExercise.muscle_group) {
          setNewExercise((prev) => ({ ...prev, muscle_group: response.data[0] }));
        }
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as categorias.",
          variant: "destructive",
        });
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchExercises = async (pageNum: number, isNewSearch = false) => {
    setLoading(true);
    try {
      const response = await api.get<ExerciseResponse[]>("/exercises", {
        params: {
          page: pageNum,
          limit: 20,
          search: searchTerm,
          category: activeTab,
        },
      });

      const newItems = response.data;

      if (isNewSearch) {
        setExercises(newItems);
      } else {
        setExercises((prev) => [...prev, ...newItems]);
      }

      setHasMore(newItems.length === 20);
    } catch (err) {
      console.error("Erro ao buscar exercícios:", err);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os exercícios.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      pageRef.current = 1;
      fetchExercises(1, true);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeTab]);

  const lastExerciseElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          pageRef.current += 1;
          fetchExercises(pageRef.current, false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleCreateExercise = async () => {
    setCreateLoading(true);
    try {
      await api.post("/exercises", newExercise);
      toast({ title: "Sucesso", description: "Exercício criado com sucesso!" });
      setIsModalOpen(false);
      setNewExercise({
        name: "",
        muscle_group: categories?.[0] || "",
        equipment: "livre",
        video_url: "",
      });

      pageRef.current = 1;
      fetchExercises(1, true);

      // Atualiza categorias (caso tenha criado novo grupo)
      try {
        const resp = await api.get<string[]>("/exercises/categories");
        setCategories(resp.data);
      } catch {}
    } catch (error) {
      toast({ title: "Erro", description: "Falha ao criar exercício.", variant: "destructive" });
    } finally {
      setCreateLoading(false);
    }
  };

  const selectedUrl = selectedExercise?.video_url;
  const selectedExternal = isExternalVideo(selectedUrl);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Biblioteca iai-DŌ</h1>
          <p className="text-muted-foreground">Gerencie e crie novos exercícios para seus treinos.</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Criar Personalizado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Exercício</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome do Exercício</Label>
                <Input
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                  placeholder="Ex: Agachamento Sumô"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Grupo Muscular</Label>
                  <Select
                    value={newExercise.muscle_group}
                    onValueChange={(v) => setNewExercise({ ...newExercise, muscle_group: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Equipamento</Label>
                  <Select
                    value={newExercise.equipment}
                    onValueChange={(v) => setNewExercise({ ...newExercise, equipment: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="livre">Peso Livre</SelectItem>
                      <SelectItem value="maquina">Máquina</SelectItem>
                      <SelectItem value="polia">Polia (Cabo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Link do Vídeo (Vimeo/YouTube)</Label>
                <Input
                  value={newExercise.video_url}
                  onChange={(e) => setNewExercise({ ...newExercise, video_url: e.target.value })}
                  placeholder="Cole aqui a URL (https://...)"
                />
                <p className="text-xs text-muted-foreground">Cole o link direto. O sistema cuidará do resto.</p>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleCreateExercise} disabled={createLoading}>
                {createLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                Salvar Exercício
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Busca */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar exercício..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Abas */}
      {!searchTerm && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-background/50 p-1">
            <TabsList className="flex w-max space-x-2 bg-transparent h-auto p-0">
              <TabsTrigger value="todos" className="rounded-full px-4 py-1.5 text-sm">
                Todos
              </TabsTrigger>
              {categoriesLoading ? (
                <div className="px-4 py-1.5 text-sm text-muted-foreground">Carregando...</div>
              ) : (
                categories.map((cat) => (
                  <TabsTrigger key={cat} value={cat} className="rounded-full px-4 py-1.5 text-sm">
                    {cat}
                  </TabsTrigger>
                ))
              )}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
      )}

      {/* Grid com Infinite Scroll */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {exercises.map((exercise, index) => {
          if (exercises.length === index + 1) {
            return (
              <div ref={lastExerciseElementRef} key={exercise.id}>
                <ExerciseVideoCard exercise={exercise} onOpen={openPlayer} />
              </div>
            );
          }
          return <ExerciseVideoCard key={exercise.id} exercise={exercise} onOpen={openPlayer} />;
        })}
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {!loading && exercises.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">Nenhum exercício encontrado.</div>
      )}

      {/* Player modal */}
      <Dialog open={playerOpen} onOpenChange={setPlayerOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center justify-between gap-4">
              <DialogTitle className="text-base">
                {selectedExercise?.name || "Vídeo"}
              </DialogTitle>
              <button
                onClick={() => setPlayerOpen(false)}
                className="p-1 rounded hover:bg-muted"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>

          {!selectedUrl ? (
            <div className="text-sm text-muted-foreground">Este exercício não possui vídeo.</div>
          ) : selectedExternal ? (
            <div className="text-sm">
              Vídeo externo:{" "}
              <a className="text-primary underline" href={selectedUrl} target="_blank" rel="noreferrer">
                abrir
              </a>
            </div>
          ) : (
            <video
              key={selectedUrl} // força recriar quando muda de exercício
              src={selectedUrl}
              controls
              autoPlay
              muted
              playsInline           /* CORREÇÃO IPHONE */
              webkit-playsinline="true" /* CORREÇÃO IPHONE */
              preload="metadata"
              className="w-full rounded-md bg-black"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExercisesView;