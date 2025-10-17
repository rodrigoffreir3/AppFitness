import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExercisesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises] = useState([
    { id: 1, name: "Supino Reto", category: "Peito", description: "Exercício para peitoral" },
    { id: 2, name: "Agachamento Livre", category: "Pernas", description: "Exercício para pernas" },
    { id: 3, name: "Rosca Direta", category: "Bíceps", description: "Exercício para bíceps" },
  ]);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Biblioteca de Exercícios</h1>
          <p className="text-muted-foreground">Gerencie sua biblioteca</p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Exercício
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar exercícios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle className="text-lg">{exercise.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge>{exercise.category}</Badge>
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExercisesView;
