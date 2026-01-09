import { useState, useEffect } from "react";
import { Plus, Search, FileText, Loader2, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api from "@/services/api";
import FileUploader from "@/components/common/FileUploader";

interface Diet {
  id: string;
  student_id: string;
  student_name: string;
  name: string;
  file_url: string;
  created_at: string;
}

interface Student {
  id: string;
  name: string;
}

const DietsView = () => {
  const [diets, setDiets] = useState<Diet[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newDiet, setNewDiet] = useState({ student_id: "", name: "Plano Alimentar", file_url: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<Diet | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dietsRes, studentsRes] = await Promise.all([
        api.get<Diet[]>('/diets'),
        api.get<Student[]>('/students')
      ]);
      setDiets(dietsRes.data);
      setStudents(studentsRes.data);
    } catch (err) {
      toast.error("Erro ao carregar dietas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async () => {
    if (!newDiet.student_id || !newDiet.file_url) {
      toast.error("Selecione um aluno e envie o arquivo.");
      return;
    }
    setFormLoading(true);
    try {
      await api.post('/diets', newDiet);
      toast.success("Dieta atribuída com sucesso!");
      setIsCreateOpen(false);
      setNewDiet({ student_id: "", name: "Plano Alimentar", file_url: "" });
      fetchData();
    } catch (err) {
      toast.error("Erro ao salvar dieta.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDiet) return;
    if (!confirm("Tem certeza?")) return;
    try {
      await api.delete(`/diets/${selectedDiet.id}`);
      toast.success("Dieta excluída.");
      setSelectedDiet(null);
      fetchData();
    } catch (err) {
      toast.error("Erro ao excluir.");
    }
  };

  const filteredDiets = diets.filter(d => 
    d.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold">Dietas</h1>
           <p className="text-muted-foreground">Gerencie a alimentação dos alunos</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Nova Dieta</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Atribuir Nova Dieta</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Aluno</Label>
                        <Select onValueChange={(v) => setNewDiet({...newDiet, student_id: v})}>
                            <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                            <SelectContent>
                                {students.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                         <Label>Nome</Label>
                         <Input value={newDiet.name} onChange={e => setNewDiet({...newDiet, name: e.target.value})} />
                    </div>
                    <div className="pt-2">
                        <FileUploader 
                            label="Arquivo PDF ou Imagem" 
                            currentUrl={newDiet.file_url} 
                            onUploadSuccess={(url) => setNewDiet({...newDiet, file_url: url})}
                        />
                    </div>
                    <Button onClick={handleCreate} disabled={formLoading} className="w-full">
                        {formLoading ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
        <Input placeholder="Buscar por aluno..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      {loading ? <Loader2 className="animate-spin mx-auto"/> : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDiets.map(diet => (
                <Card 
                    key={diet.id} 
                    className="cursor-pointer hover:shadow-md border-l-4 border-l-green-500"
                    onClick={() => setSelectedDiet(diet)}
                >
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex justify-between">{diet.student_name} <FileText className="h-5 w-5 text-green-600"/></CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-medium text-sm">{diet.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(diet.created_at).toLocaleDateString('pt-BR')}</p>
                    </CardContent>
                </Card>
            ))}
            {filteredDiets.length === 0 && <p className="text-muted-foreground col-span-full text-center">Nenhuma dieta encontrada.</p>}
        </div>
      )}

      {/* MODAL DE VISUALIZAÇÃO */}
      <Dialog open={!!selectedDiet} onOpenChange={(open) => !open && setSelectedDiet(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader>
                <DialogTitle className="flex justify-between items-center pr-8">
                    <span>{selectedDiet?.student_name} - {selectedDiet?.name}</span>
                    <div className="flex gap-2">
                         <Button variant="destructive" size="sm" onClick={handleDelete}><Trash2 className="h-4 w-4 mr-2"/> Excluir</Button>
                         <Button variant="outline" size="sm" onClick={() => window.open(`http://localhost:8080${selectedDiet?.file_url}`, '_blank')}>
                            <ExternalLink className="h-4 w-4 mr-2"/> Abrir
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

export default DietsView;