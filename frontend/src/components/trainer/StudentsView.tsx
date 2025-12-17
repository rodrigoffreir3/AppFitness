import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Loader2, UserCog, AlertCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "sonner";
import api from "@/services/api";

// 1. IMPORTAR O UPLOADER
import FileUploader from "@/components/common/FileUploader";

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  anamnesis_url?: string; // Campo opcional na interface de leitura
}

// 2. ATUALIZAR INTERFACE DA REQUISIÇÃO
interface CreateStudentRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  anamnesis_url?: string; // Novo campo
}

interface UpdateStudentRequest {
  name?: string;
  email?: string;
}

const StudentsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  
  // 3. ADICIONAR O CAMPO AO ESTADO INICIAL
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    anamnesis_url: "", // Inicia vazio
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get<Student[]>('/students');
      setStudents(response.data);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
      setError("Não foi possível carregar os alunos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    setFormLoading(true);
    setError("");
    if (!newStudent.name || !newStudent.email || !newStudent.password) {
      toast.error("Erro de Validação", { description: "Nome, Email e Senha Inicial são obrigatórios." });
      setFormLoading(false);
      return;
    }
    try {
      // 4. INCLUIR O URL NO PAYLOAD
      const apiRequest: CreateStudentRequest = { 
        name: newStudent.name, 
        email: newStudent.email, 
        password: newStudent.password,
        phone: newStudent.phone,
        anamnesis_url: newStudent.anamnesis_url // Envia para o backend
      };
      
      const response = await api.post<Student>('/students', apiRequest);
      toast.success("Aluno adicionado!", { description: `${response.data.name} foi cadastrado com sucesso.` });
      
      // Resetar form
      setNewStudent({ name: "", email: "", password: "", phone: "", anamnesis_url: "" });
      setIsAddDialogOpen(false); 
      fetchStudents(); 
    } catch (err: any) {
      let description = "Ocorreu um erro inesperado.";
      if (err.response && err.response.status === 409) { description = "Este email já está em uso."; }
      toast.error("Erro ao cadastrar", { description });
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenEditDialog = (student: Student) => {
    setEditingStudent(student);
    setIsEditDialogOpen(true);
  };
  
  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    setFormLoading(true);
    if (!editingStudent.name || !editingStudent.email) {
      toast.error("Erro de Validação", { description: "Nome e Email são obrigatórios." });
      setFormLoading(false);
      return;
    }
    try {
      const apiRequest: UpdateStudentRequest = { name: editingStudent.name, email: editingStudent.email };
      await api.put(`/students/${editingStudent.id}`, apiRequest);
      toast.success("Aluno atualizado!", { description: `Os dados de ${editingStudent.name} foram salvos.` });
      setIsEditDialogOpen(false);
      setEditingStudent(null);
      fetchStudents();
    } catch (err: any) {
       let description = "Ocorreu um erro inesperado.";
      if (err.response && err.response.status === 409) { description = "Este email já está em uso por outra conta."; }
      toast.error("Erro ao atualizar", { description });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      await api.delete(`/students/${studentToDelete.id}`);
      toast.success("Aluno excluído!", {
        description: `${studentToDelete.name} foi removido com sucesso.`,
      });
      setStudentToDelete(null); 
      fetchStudents(); 
    } catch (err: any) {
      console.error("Erro ao deletar aluno:", err);
      toast.error("Erro ao excluir", {
        description: "Não foi possível remover o aluno. Tente novamente.",
      });
      setStudentToDelete(null); 
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      return <div className="p-8 text-center text-red-600 bg-red-100 rounded-lg">{error}</div>;
    }
    if (filteredStudents.length === 0 && searchTerm === "") {
      return (
        <div className="text-center text-muted-foreground py-12">
          <UserCog className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold">Nenhum aluno encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">Comece por adicionar seu primeiro aluno.</p>
        </div>
      );
    }
    if (filteredStudents.length === 0 && searchTerm !== "") {
      return (
        <div className="text-center text-muted-foreground py-12">
           <h3 className="mt-2 text-sm font-semibold">Nenhum aluno encontrado</h3>
           <p className="mt-1 text-sm text-gray-500">Tente um termo de busca diferente.</p>
         </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardHeader>
              <CardTitle className="text-lg">{student.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{student.email}</p>
              
              {/* Mostra ícone se tiver anamnese (opcional visual) */}
              {student.anamnesis_url && (
                <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <span>📄 Possui Ficha de Anamnese</span>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleOpenEditDialog(student)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => setStudentToDelete(student)} 
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
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Alunos</h1>
            <p className="text-muted-foreground">Gerencie seus alunos</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Aluno
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto"> {/* Ajuste para scroll se tela pequena */}
              <DialogHeader>
                <DialogTitle>Adicionar Novo Aluno</DialogTitle>
                <DialogDescription>
                  Preencha os dados do aluno para cadastrá-lo
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} disabled={formLoading} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} disabled={formLoading} />
                </div>
                <div>
                  <Label htmlFor="password">Senha inicial</Label>
                  <Input id="password" type="password" value={newStudent.password} onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })} disabled={formLoading} />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone (Opcional)</Label>
                  <Input id="phone" value={newStudent.phone} onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })} disabled={formLoading} />
                </div>

                {/* 5. INSERÇÃO DO COMPONENTE DE UPLOAD */}
                <div className="border-t pt-4 mt-2">
                  <FileUploader 
                    label="Ficha de Anamnese / Saúde (PDF ou Imagem)"
                    currentUrl={newStudent.anamnesis_url}
                    onUploadSuccess={(url) => setNewStudent(curr => ({ ...curr, anamnesis_url: url }))}
                  />
                </div>
                {/* --- FIM DO UPLOAD --- */}

                <Button onClick={handleAddStudent} className="w-full" disabled={formLoading}>
                  {formLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {formLoading ? "Cadastrando..." : "Cadastrar Aluno"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar alunos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {renderContent()}

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Aluno</DialogTitle>
              <DialogDescription>
                Atualize os dados de {editingStudent?.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nome completo</Label>
                <Input id="edit-name" value={editingStudent?.name || ''} onChange={(e) => setEditingStudent(current => current ? { ...current, name: e.target.value } : null)} disabled={formLoading} />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" value={editingStudent?.email || ''} onChange={(e) => setEditingStudent(current => current ? { ...current, email: e.target.value } : null)} disabled={formLoading} />
              </div>
              <p className="text-sm text-muted-foreground">A redefinição de senha será feita em outra tela.</p>
              <Button onClick={handleUpdateStudent} className="w-full" disabled={formLoading}>
                {formLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {formLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="text-destructive" />
            Tem certeza absoluta?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente o aluno
            <span className="font-medium text-foreground"> {studentToDelete?.name} </span> 
            e removerá todos os seus dados, incluindo fichas de treino.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setStudentToDelete(null)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteStudent} 
            className={buttonVariants({ variant: "destructive" })} 
          >
            Sim, excluir aluno
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

    </AlertDialog>
  );
};

export default StudentsView;