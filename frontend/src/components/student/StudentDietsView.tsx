import { useState, useEffect } from "react";
import { Plus, FileText, Loader2, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/services/api";
import FileUploader from "@/components/common/FileUploader";

interface Diet {
  id: string;
  name: string;
  file_url: string;
  created_at: string;
}

const StudentDietsView = () => {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newDiet, setNewDiet] = useState({ name: "Meu Arquivo", file_url: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<Diet | null>(null);

  const fetchDiets = async () => {
    setLoading(true);
    try {
      const response = await api.get<Diet[]>('/students/me/diets');
      setDiets(response.data);
    } catch (err) {
      console.log("Erro ao buscar dietas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDiets(); }, []);

  const handleCreate = async () => {
    if (!newDiet.file_url) {
      toast.error("Envie um arquivo.");
      return;
    }
    setFormLoading(true);
    try {
      await api.post('/students/me/diets', newDiet); // Rota do aluno
      toast.success("Arquivo enviado!");
      setIsCreateOpen(false);
      setNewDiet({ name: "Meu Arquivo", file_url: "" });
      fetchDiets();
    } catch (err) {
      toast.error("Erro ao enviar.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDiet) return;
    if (!confirm("Tem certeza?")) return;
    try {
      await api.delete(`/students/me/diets/${selectedDiet.id}`); // Rota do aluno
      toast.success("Arquivo excluído.");
      setSelectedDiet(null);
      fetchDiets();
    } catch (err) {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="text-green-600" /> Meus Planos / Dietas
         </h1>
         <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Adicionar Arquivo</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Enviar Arquivo</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                         <Label>Nome</Label>
                         <Input value={newDiet.name} onChange={e => setNewDiet({...newDiet, name: e.target.value})} />
                    </div>
                    <div className="pt-2">
                        <FileUploader 
                            label="Arquivo PDF/Imagem" 
                            currentUrl={newDiet.file_url} 
                            onUploadSuccess={(url) => setNewDiet({...newDiet, file_url: url})}
                        />
                    </div>
                    <Button onClick={handleCreate} disabled={formLoading} className="w-full">
                        {formLoading ? "Enviando..." : "Enviar"}
                    </Button>
                </div>
            </DialogContent>
         </Dialog>
      </div>

      {loading ? <Loader2 className="animate-spin mx-auto"/> : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {diets.map(diet => (
                <Card 
                    key={diet.id} 
                    className="cursor-pointer hover:shadow-md border-l-4 border-l-green-500"
                    onClick={() => setSelectedDiet(diet)}
                >
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{diet.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">{new Date(diet.created_at).toLocaleDateString('pt-BR')}</p>
                    </CardContent>
                </Card>
            ))}
            {diets.length === 0 && <p className="text-muted-foreground col-span-full text-center">Nenhum arquivo encontrado.</p>}
        </div>
      )}

      {/* MODAL PREVIEW ALUNO */}
      <Dialog open={!!selectedDiet} onOpenChange={(open) => !open && setSelectedDiet(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader>
                <DialogTitle className="flex justify-between items-center pr-8">
                    <span>{selectedDiet?.name}</span>
                    <div className="flex gap-2">
                         <Button variant="destructive" size="sm" onClick={handleDelete}><Trash2 className="h-4 w-4 mr-2"/> Excluir</Button>
                         <Button variant="outline" size="sm" onClick={() => window.open(`http://localhost:8080${selectedDiet?.file_url}`, '_blank')}>
                            <ExternalLink className="h-4 w-4 mr-2"/> Baixar
                         </Button>
                    </div>
                </DialogTitle>
            </DialogHeader>
            <div className="flex-1 bg-gray-100 rounded-md overflow-hidden border">
                {selectedDiet && <iframe src={`http://localhost:8080${selectedDiet.file_url}`} className="w-full h-full" title="Preview"/>}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDietsView;