import { useState } from "react";
import { Plus, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WorkoutsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [workouts] = useState([
    { id: 1, name: "Treino A - Peito e Tríceps", student: "João Silva", exercises: 8 },
    { id: 2, name: "Treino B - Costas e Bíceps", student: "João Silva", exercises: 7 },
    { id: 3, name: "Treino Full Body", student: "Maria Santos", exercises: 12 },
  ]);

  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Fichas de Treino</h1>
          <p className="text-muted-foreground">Crie e gerencie treinos</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Ficha
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar fichas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <Card key={workout.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{workout.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Aluno: {workout.student}</p>
              <Badge variant="secondary">{workout.exercises} exercícios</Badge>
              <Button variant="outline" size="sm" className="w-full mt-2">
                <Eye className="mr-2 h-4 w-4" />
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkoutsView;
