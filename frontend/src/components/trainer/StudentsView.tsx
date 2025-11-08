import { useState, useEffect } from "react";
// 1. Importar AlertCircle para o ícone de aviso
import { Plus, Search, Edit, Trash2, Loader2, UserCog, AlertCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button"; // 2. Importar buttonVariants
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
// 3. Importar todos os componentes do AlertDialog
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
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";

// Interface para o Aluno
interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

// Interface para a requisição de criação
interface CreateStudentRequest {
  name: string;
  email: string;
  password: string;
}

// Interface para a requisição de atualização
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
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    phone: "", 
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // 4. Novo estado para controlar o aluno a ser deletado
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  // Função para buscar alunos
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

  // Buscar alunos ao montar o componente
  useEffect(() => {
    fetchStudents();
  }, []);

  // Handler para Adicionar Aluno (existente)
  const handleAddStudent = async () => {
    setFormLoading(true);
    setError("");
    if (!newStudent.name || !newStudent.email || !newStudent.password) {
      toast({ title: "Erro de Validação", description: "Nome, Email e Senha Inicial são obrigatórios.", variant: "destructive" });
      setFormLoading(false);
      return;
    }
    try {
      const apiRequest: CreateStudentRequest = { name: newStudent.name, email: newStudent.email, password: newStudent.password };
      const response = await api.post<Student>('/students', apiRequest);
      toast({ title: "Aluno adicionado!", description: `${response.data.name} foi cadastrado com sucesso.` });
      setNewStudent({ name: "", email: "", password: "", phone: "" });
      setIsAddDialogOpen(false); 
      fetchStudents(); 
    } catch (err: any) {
      let description = "Ocorreu um erro inesperado.";
      if (err.response && err.response.status === 409) { description = "Este email já está em uso."; }
      toast({ title: "Erro ao cadastrar", description: description, variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  // Handler para Abrir Dialog de Edição (existente)
  const handleOpenEditDialog = (student: Student) => {
    setEditingStudent(student);
    setIsEditDialogOpen(true);
  };
  
  // Handler para Atualizar Aluno (existente)
  const handleUpdateStudent = async () => {
    if (!editingStudent) return;
    setFormLoading(true);
    if (!editingStudent.name || !editingStudent.email) {
      toast({ title: "Erro de Validação", description: "Nome e Email são obrigatórios.", variant: "destructive" });
      setFormLoading(false);
      return;
    }
    try {
      const apiRequest: UpdateStudentRequest = { name: editingStudent.name, email: editingStudent.email };
      await api.put(`/api/students/${editingStudent.id}`, apiRequest);
      toast({ title: "Aluno atualizado!", description: `Os dados de ${editingStudent.name} foram salvos.` });
      setIsEditDialogOpen(false);
      setEditingStudent(null);
      fetchStudents();
    } catch (err: any) {
       let description = "Ocorreu um erro inesperado.";
      if (err.response && err.response.status === 409) { description = "Este email já está em uso por outra conta."; }
      toast({ title: "Erro ao atualizar", description: description, variant: "destructive" });
    } finally {
      setFormLoading(false);
    }
  };

  // 5. Novo handler para deletar o aluno
  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;

    try {
      // Chama o endpoint DELETE
      await api.delete(`/api/students/${studentToDelete.id}`);
      
      toast({
        title: "Aluno excluído!",
        description: `${studentToDelete.name} foi removido com sucesso.`,
      });

      setStudentToDelete(null); // Limpa o estado
      fetchStudents(); // Atualiza a lista

    } catch (err: any) {
      console.error("Erro ao deletar aluno:", err);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível remover o aluno. Tente novamente.",
        variant: "destructive",
      });
      setStudentToDelete(null); // Limpa o estado mesmo em caso de erro
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

    // 6. O conteúdo (cards) agora é retornado diretamente
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardHeader>
              <CardTitle className="text-lg">{student.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{student.email}</p>
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
                
                {/* 7. Botão de deletar agora é um AlertDialogTrigger */}
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => setStudentToDelete(student)} // Define quem será deletado
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                {/* --- FIM BOTÃO DE DELETAR --- */}

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  // 8. O componente <AlertDialog> envolve todo o retorno
  return (
    <AlertDialog>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Alunos</h1>
            <p className="text-muted-foreground">Gerencie seus alunos</p>
          </div>
          
          {/* --- DIALOG "NOVO ALUNO" (Sem alterações) --- */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Aluno
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Aluno</DialogTitle>
                <DialogDescription>
                  Preencha os dados do aluno para cadastrá-lo
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* ... campos do formulário ... */}
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
                <Button onClick={handleAddStudent} className="w-full" disabled={formLoading}>
                  {formLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {formLoading ? "Cadastrando..." : "Cadastrar Aluno"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          {/* --- FIM DIALOG "NOVO ALUNO" --- */}

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

        {/* --- DIALOG "EDITAR ALUNO" (Sem alterações) --- */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Aluno</DialogTitle>
              <DialogDescription>
                Atualize os dados de {editingStudent?.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* ... campos do formulário de edição ... */}
              <div>
                <Label htmlFor="edit-name">Nome completo</Label>
                <Input id="edit-name" value={editingStudent?.name || ''} onChange={(e) => setEditingStudent(current => current ? { ...current, name: e.target.value } : null)} disabled={formLoading} />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" value={editingStudent?.email || ''} onChange={(e) => setEditingStudent(current => current ? { ...current, email: e.target.value } : null)} disabled={formLoading} />
              </div>
              <p className="text-sm text-muted-foreground">A redefinição de senha será feita em outra tela (a ser implementada).</p>
              <Button onClick={handleUpdateStudent} className="w-full" disabled={formLoading}>
                {formLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {formLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* --- FIM DIALOG "EDITAR ALUNO" --- */}

      </div>

      {/* 9. Conteúdo do AlertDialog (o modal de confirmação) */}
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
            className={buttonVariants({ variant: "destructive" })} // Estilo destrutivo
          >
            Sim, excluir aluno
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      {/* --- FIM DO CONTEÚDO --- */}

    </AlertDialog>
  );
};

export default StudentsView;