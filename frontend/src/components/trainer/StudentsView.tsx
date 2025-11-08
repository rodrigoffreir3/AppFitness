import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Loader2, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";

// Interface para o Aluno (deve ir para @/types)
interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string; // Phone não está no handler, mas o form tem
}

// --- CORREÇÃO AQUI ---
// Interface para a requisição de criação (de students_handler.go)
// Corrigido de sintaxe Go para TypeScript
interface CreateStudentRequest {
  name: string;
  email: string;
  password: string;
}
// --- FIM DA CORREÇÃO ---

const StudentsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<Student[]>([]); // Estado para alunos da API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false); // Controlar o Dialog
  const [formLoading, setFormLoading] = useState(false); // Loading do formulário
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    phone: "", // Phone não está na API de criação, mas mantemos no form
  });

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

  // Handler para Adicionar Aluno
  const handleAddStudent = async () => {
    setFormLoading(true);
    setError("");

    // Validar campos
    if (!newStudent.name || !newStudent.email || !newStudent.password) {
      toast({
        title: "Erro de Validação",
        description: "Nome, Email e Senha Inicial são obrigatórios.",
        variant: "destructive",
      });
      setFormLoading(false);
      return;
    }

    try {
      // 1. Preparar os dados para a API (conforme CreateStudentRequest)
      const apiRequest: CreateStudentRequest = {
        name: newStudent.name,
        email: newStudent.email,
        password: newStudent.password,
      };

      // 2. Chamar a API
      const response = await api.post<Student>('/students', apiRequest);
      
      // 3. Sucesso
      toast({
        title: "Aluno adicionado!",
        description: `${response.data.name} foi cadastrado com sucesso.`,
      });
      
      // 4. Limpar formulário e fechar dialog
      setNewStudent({ name: "", email: "", password: "", phone: "" });
      setIsDialogOpen(false); // Fechar o Dialog
      
      // 5. Atualizar a lista de alunos (Princípio da Simplicidade: buscar de novo)
      fetchStudents(); 

    } catch (err: any) {
      console.error("Erro ao adicionar aluno:", err);
      let description = "Ocorreu um erro inesperado.";
      if (err.response && err.response.status === 409) { // 409 Conflict
        description = "Este email já está em uso.";
      }
      toast({
        title: "Erro ao cadastrar",
        description: description,
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
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

    if (filteredStudents.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-12">
          <UserCog className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold">Nenhum aluno encontrado</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Tente um termo de busca diferente." : "Comece por adicionar seu primeiro aluno."}
          </p>
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
              {/* <p className="text-sm text-muted-foreground">{student.phone}</p> */}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
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
          <h1 className="text-3xl font-bold">Alunos</h1>
          <p className="text-muted-foreground">Gerencie seus alunos</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="Nome do aluno"
                  disabled={formLoading}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  placeholder="email@exemplo.com"
                  disabled={formLoading}
                />
              </div>
              <div>
                <Label htmlFor="password">Senha inicial</Label>
                <Input
                  id="password"
                  type="password"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                  placeholder="••••••••"
                  disabled={formLoading}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone (Opcional)</Label>
                <Input
                  id="phone"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  disabled={formLoading}
                />
              </div>
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
    </div>
  );
};

export default StudentsView;