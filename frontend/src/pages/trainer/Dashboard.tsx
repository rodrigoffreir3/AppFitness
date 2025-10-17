import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // Assumindo que você tem Badge
import { PlusCircle, UserCog } from 'lucide-react'; // Ícones
import api from '@/services/api'; // Nossa ponte para o backend

// --- TIPOS DE DADOS DO BACKEND ---
// É uma boa prática definir interfaces para os dados que esperamos da API
interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  brand_logo_url?: string;
  brand_primary_color?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}
// --- FIM DOS TIPOS ---


export default function TrainerDashboard() {
  // --- ESTADOS PARA GUARDAR OS DADOS ---
  const [trainer, setTrainer] = useState<TrainerProfile | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // --- FIM DOS ESTADOS ---

  // --- useEffect PARA BUSCAR OS DADOS ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Busca os dados do perfil do treinador logado
        const profileResponse = await api.get<TrainerProfile>('/trainers/me');
        setTrainer(profileResponse.data);

        // Busca a lista de alunos deste treinador
        const studentsResponse = await api.get<Student[]>('/students');
        setStudents(studentsResponse.data);

      } catch (err: any) {
        console.error("Erro ao buscar dados do dashboard:", err);
        setError('Não foi possível carregar os dados. Tente atualizar a página.');
        // Aqui poderíamos adicionar lógica para deslogar se o erro for 401 (não autorizado)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio [] garante que a busca ocorra apenas uma vez quando o componente monta
  // --- FIM DO useEffect ---


  // --- RENDERIZAÇÃO ---
  if (loading) {
    // Podemos usar um Skeleton ou um spinner aqui no futuro
    return <div className="p-6">Carregando dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
       {/* Saudação Personalizada */}
      <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">Bem-vindo(a), {trainer?.name || 'Treinador'}!</h1>
          <p className="text-muted-foreground">Aqui está um resumo da sua atividade.</p>
      </div>

      {/* Cards de Resumo (Exemplo - podem ser adicionados no futuro) */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         <Card> ... </Card>
         <Card> ... </Card>
      </div> */}

      {/* Tabela de Alunos Recentes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Meus Alunos</CardTitle>
          <Button size="sm" className="gap-1">
             <PlusCircle className="h-4 w-4" />
             Adicionar Aluno {/* Esta ação precisará de um Modal ou página */}
          </Button>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead><span className="sr-only">Ações</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                    {/* <TableCell><Badge variant="outline">Ativo</Badge></TableCell> */}
                    <TableCell>
                      {/* Botões de Ação (Editar/Ver) podem ser adicionados aqui */}
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="text-center text-muted-foreground py-8">
                Você ainda não adicionou nenhum aluno.
             </div>
          )}
        </CardContent>
      </Card>
       {/* Poderíamos adicionar mais cards ou seções aqui */}
    </div>
  );
}