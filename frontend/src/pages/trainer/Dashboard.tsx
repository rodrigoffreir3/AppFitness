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
import { Badge } from "@/components/ui/badge";
import { PlusCircle, UserCog } from 'lucide-react';
import api from '@/services/api'; // A nossa "ponte" para o backend

// --- TIPOS DE DADOS DO BACKEND ---
// Definimos a "forma" dos dados que esperamos da API para o TypeScript nos ajudar.
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
  // --- ESTADOS PARA GUARDAR OS DADOS DA API ---
  const [trainer, setTrainer] = useState<TrainerProfile | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // --- FIM DOS ESTADOS ---

  // --- useEffect PARA BUSCAR OS DADOS QUANDO A PÁGINA CARREGA ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Usamos Promise.all para fazer as duas chamadas em paralelo
        const [profileResponse, studentsResponse] = await Promise.all([
          api.get<TrainerProfile>('/trainers/me'), // Endpoint: Dados do treinador logado
          api.get<Student[]>('/students')        // Endpoint: Lista de alunos do treinador
        ]);

        setTrainer(profileResponse.data);
        setStudents(studentsResponse.data);

      } catch (err: any) {
        console.error("Erro ao buscar dados do dashboard:", err);
        setError('Não foi possível carregar os dados. Tente atualizar a página.');
        // No futuro, podemos adicionar lógica para deslogar se o erro for 401 (Não Autorizado)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // O array vazio [] garante que a busca ocorra apenas uma vez.
  // --- FIM DO useEffect ---


  // --- RENDERIZAÇÃO ---
  if (loading) {
    // No futuro, podemos substituir isso por um componente "Skeleton" do seu design
    return <div className="p-8 text-center text-muted-foreground">Carregando dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 bg-red-100 rounded-lg">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Saudação Personalizada */}
      <div>
          <h1 className="text-3xl font-bold tracking-tight">Bem-vindo(a), {trainer?.name || 'Treinador'}!</h1>
          <p className="text-muted-foreground">Aqui está um resumo da sua atividade e seus alunos.</p>
      </div>

      {/* Tabela de Alunos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Meus Alunos</CardTitle>
          <Button size="sm" className="gap-1">
             <PlusCircle className="h-4 w-4" />
             Adicionar Aluno {/* Esta ação precisará de um Modal ou página no futuro */}
          </Button>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead><span className="sr-only">Ações</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                    <TableCell className="text-right">
                      {/* Botões de Ação (Editar/Ver) podem ser adicionados aqui */}
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="text-center text-muted-foreground py-12">
                <UserCog className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold">Nenhum aluno encontrado</h3>
                <p className="mt-1 text-sm text-gray-500">Comece por adicionar seu primeiro aluno.</p>
             </div>
          )}
        </CardContent>
      </Card>
       {/* Aqui podemos adicionar mais cards no futuro (Ex: Treinos Ativos, Anúncios, etc.) */}
    </div>
  );
}
