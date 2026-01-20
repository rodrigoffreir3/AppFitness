import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertCircle, Loader2, Dumbbell, FileText, Download } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

// Interface dos dados que vêm da API
interface WorkoutResponse {
  id: string;
  student_id: string;
  name: string;
  description: string;
  is_active: boolean;
}

// Interface para o documento (PDF)
interface StudentProfile {
  file_url?: string;
}

const MyWorkoutsView = () => {
  const navigate = useNavigate();
  
  // Estados Internos
  const [workouts, setWorkouts] = useState<WorkoutResponse[]>([]);
  const [profileData, setProfileData] = useState<StudentProfile | null>(null); // Novo estado para o PDF
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Buscar Dados (Treinos + Perfil)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        // Buscamos Treinos E Perfil ao mesmo tempo usando Promise.all
        const [workoutsRes, profileRes] = await Promise.all([
           api.get<WorkoutResponse[]>('/students/me/workouts'),
           api.get<StudentProfile>('/students/me/profile')
        ]);
        
        setWorkouts(workoutsRes.data);
        setProfileData(profileRes.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError('Não foi possível carregar suas informações.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (workoutId: string) => {
    navigate(`/student/workout/${workoutId}`);
  };

  // Renderização
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Carregando seus treinos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center text-destructive bg-destructive/10 border border-destructive rounded-lg p-6">
        <AlertCircle className="h-8 w-8 mb-4" />
        <p className="font-semibold">Erro ao carregar</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Treinos</h1>
        <p className="text-muted-foreground">Acompanhe suas fichas de treino e documentos</p>
      </div>

      {/* --- ÁREA DE DOCUMENTOS (Nova Inserção) --- */}
      {profileData?.file_url && (
        <Card className="border-blue-200 bg-blue-50/50 mb-6">
          <CardHeader className="pb-3">
             <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
               <FileText className="h-5 w-5" />
               Ficha de Anamnese / Documentos
             </CardTitle>
             <CardDescription className="text-blue-600/80">
               Arquivo disponibilizado pelo seu treinador.
             </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
              onClick={() => window.open(`http://localhost:8080${profileData.file_url}`, '_blank')}
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar Documento (PDF)
            </Button>
          </CardContent>
        </Card>
      )}
      {/* ----------------------------------------- */}

      {workouts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {workouts.map((workout) => (
            <Card key={workout.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{workout.name}</CardTitle>
                {workout.description && (
                  <p className="text-sm text-muted-foreground pt-1">{workout.description}</p>
                )}
                <Badge variant="secondary" className="w-fit mt-2">
                    Ativo
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleViewDetails(workout.id)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalhes do Treino
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-12 border border-dashed rounded-lg">
           <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
           <h3 className="mt-2 text-sm font-semibold">Nenhum treino ativo</h3>
           <p className="mt-1 text-sm text-gray-500">Seu treinador ainda não adicionou treinos para você.</p>
        </div>
      )}
    </div>
  );
};

export default MyWorkoutsView;