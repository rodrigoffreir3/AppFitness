import { useState, useEffect } from "react";
import { Plus, Loader2, AlertCircle, Edit, Trash2, Image as ImageIcon, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";

// --- NOVO: Interfaces baseadas no announcements_handler.go ---
interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string; // Manter como string para exibição
}

interface AnnouncementRequest {
  title: string;
  content: string;
  image_url?: string;
}
// --- FIM NOVO ---

const AnnouncementsView = () => {
  // --- ESTADOS CONECTADOS À API ---
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Estado para Criar (title, content, image_url)
  const [newAnnouncement, setNewAnnouncement] = useState<AnnouncementRequest>({
    title: "",
    content: "",
    image_url: "",
  });
  
  // Estado para Editar (id, title, content, image_url)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  // Estado para Deletar
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);
  // --- FIM ESTADOS API ---

  // Função para formatar a data (opcional, mas melhora a UI)
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString.split('T')[0]; // Fallback
    }
  };

  // --- NOVO: useEffect para buscar dados ---
  const fetchAnnouncements = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get<Announcement[]>('/announcements');
      setAnnouncements(response.data);
    } catch (err) {
      console.error("Erro ao buscar avisos:", err);
      setError("Não foi possível carregar os avisos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);
  // --- FIM NOVO ---

  // --- Upload da Imagem ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    setUploadingImage(true);
    try {
      const res = await api.post("/upload", uploadData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setFormData('image_url', res.data.url);
      toast({ title: "Imagem anexada!" });
    } catch (err) {
      toast({ title: "Erro no upload", description: "Verifique o formato e o tamanho da imagem.", variant: "destructive" });
    } finally {
      setUploadingImage(false);
    }
  };

  // --- NOVO: Handler para Adicionar/Editar ---
  const handleSaveAnnouncement = async () => {
    setFormLoading(true);
    
    // Define os dados e o método (POST para criar, PUT para editar)
    const isEditing = !!editingAnnouncement;
    const dataToSave: AnnouncementRequest = isEditing 
      ? { title: editingAnnouncement.title, content: editingAnnouncement.content, image_url: editingAnnouncement.image_url } 
      : newAnnouncement;
    
    // Validação
    if (!dataToSave.title) {
      toast({ title: "Erro de Validação", description: "O título é obrigatório.", variant: "destructive" });
      setFormLoading(false);
      return;
    }

    try {
      if (isEditing) {
        // --- LÓGICA DE UPDATE ---
        await api.put(`/announcements/${editingAnnouncement.id}`, dataToSave);
        toast({ title: "Aviso atualizado!", description: "O aviso foi salvo com sucesso." });
      } else {
        // --- LÓGICA DE CREATE ---
        await api.post('/announcements', dataToSave);
        toast({ title: "Aviso publicado!", description: "Todos os alunos foram notificados." });
      }

      // Resetar estados e fechar modal
      setIsDialogOpen(false);
      setNewAnnouncement({ title: "", content: "", image_url: "" });
      setEditingAnnouncement(null);
      fetchAnnouncements(); // Atualizar a lista

    } catch (err) {
      console.error("Erro ao salvar aviso:", err);
      toast({ title: "Erro ao salvar", description: "Não foi possível salvar o aviso.", variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  // --- NOVO: Handler para Deletar ---
  const handleDeleteAnnouncement = async () => {
    if (!announcementToDelete) return;

    try {
      await api.delete(`/announcements/${announcementToDelete.id}`);
      toast({ title: "Aviso excluído!", description: "O aviso foi removido com sucesso." });
      setAnnouncementToDelete(null);
      fetchAnnouncements(); // Atualizar a lista
    } catch (err) {
      console.error("Erro ao deletar aviso:", err);
      toast({ title: "Erro ao excluir", description: "Não foi possível remover o aviso.", variant: "destructive" });
    }
  };

  // Funções para controlar o Dialog (para Criar ou Editar)
  const openNewDialog = () => {
    setEditingAnnouncement(null);
    setNewAnnouncement({ title: "", content: "", image_url: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    // Preenche o formulário com os dados de edição
    setNewAnnouncement({ title: announcement.title, content: announcement.content, image_url: announcement.image_url || "" }); 
    setIsDialogOpen(true);
  };
  
  // Define os dados do formulário a serem exibidos (novo ou em edição)
  const formData = editingAnnouncement ? editingAnnouncement : newAnnouncement;
  const setFormData = (field: keyof AnnouncementRequest, value: string) => {
    if (editingAnnouncement) {
      setEditingAnnouncement(current => current ? { ...current, [field]: value } : null);
    } else {
      setNewAnnouncement(current => ({ ...current, [field]: value }));
    }
  };

  // --- RENDERIZAÇÃO ---
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
          <p className="font-semibold">Erro ao carregar avisos</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }
    if (announcements.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-12 border border-dashed rounded-lg">
          <h3 className="mt-2 text-sm font-semibold">Nenhum aviso publicado</h3>
          <p className="mt-1 text-sm text-gray-500">Crie seu primeiro aviso para se comunicar com seus alunos.</p>
        </div>
      );
    }
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="flex flex-col overflow-hidden">
            {announcement.image_url && (
              <div className="w-full h-40 bg-muted border-b relative">
                <img src={announcement.image_url} alt="Capa" className="w-full h-full object-cover" />
              </div>
            )}
            <CardHeader className={announcement.image_url ? "pt-4" : ""}>
              <CardTitle className="text-lg">{announcement.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{formatDate(announcement.created_at)}</p>
            </CardHeader>
            <CardContent className="flex flex-col justify-between flex-1">
              <p className="text-sm break-words whitespace-pre-wrap">{announcement.content}</p>
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => openEditDialog(announcement)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => setAnnouncementToDelete(announcement)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <AlertDialog>
      <div className="space-y-6 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Mural de Avisos</h1>
            <p className="text-muted-foreground">Publique avisos para seus alunos</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Aviso
              </Button>
            </DialogTrigger>
            {/* O SEGREDO DO MODAL QUE NÃO CORTA ESTÁ AQUI: max-h-[90vh] e overflow-y-auto */}
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingAnnouncement ? "Editar Aviso" : "Publicar Novo Aviso"}</DialogTitle>
                <DialogDescription>
                  Preencha os dados e anexe uma imagem promocional ou panfleto.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label htmlFor="title">Título (Obrigatório)</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData('title', e.target.value)}
                    placeholder="Ex: Promoção de Carnaval"
                    disabled={formLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Conteúdo (Opcional)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData('content', e.target.value)}
                    placeholder="Detalhes do aviso..."
                    rows={4}
                    disabled={formLoading}
                  />
                </div>

                {/* ÁREA DE UPLOAD */}
                <div className="space-y-2 bg-muted/30 p-3 rounded-md border border-dashed">
                  <Label className="flex items-center gap-2"><ImageIcon className="h-4 w-4"/> Imagem/Panfleto</Label>
                  {formData.image_url ? (
                    <div className="relative">
                      <img src={formData.image_url} alt="Preview" className="w-full h-32 object-contain bg-black/5 rounded-md border" />
                      <Button size="icon" variant="destructive" className="absolute top-2 right-2 h-6 w-6 rounded-full" onClick={() => setFormData('image_url', "")}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="cursor-pointer" />
                      {uploadingImage && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                    </div>
                  )}
                </div>

                <Button onClick={handleSaveAnnouncement} className="w-full" disabled={formLoading || uploadingImage}>
                  {formLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {formLoading ? "Salvando..." : (editingAnnouncement ? "Salvar Alterações" : "Publicar Aviso")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {renderContent()}
      </div>

      {/* Modal de Confirmação para Deletar */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="text-destructive" />
            Excluir Aviso?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o aviso
            <span className="font-medium text-foreground"> "{announcementToDelete?.title}"</span>?
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setAnnouncementToDelete(null)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteAnnouncement} 
            className={buttonVariants({ variant: "destructive" })}
          >
            Sim, excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog>
  );
};

export default AnnouncementsView;