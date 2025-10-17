import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const MyWorkoutsView = () => {
  const workouts = [
    {
      id: 1,
      name: "Treino A - Peito e Tríceps",
      exercises: [
        { name: "Supino Reto", sets: "4x12", rest: "60s" },
        { name: "Supino Inclinado", sets: "3x12", rest: "60s" },
        { name: "Crucifixo", sets: "3x15", rest: "45s" },
      ],
    },
    {
      id: 2,
      name: "Treino B - Costas e Bíceps",
      exercises: [
        { name: "Barra Fixa", sets: "4x10", rest: "90s" },
        { name: "Remada Curvada", sets: "4x12", rest: "60s" },
        { name: "Rosca Direta", sets: "3x12", rest: "45s" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Treinos</h1>
        <p className="text-muted-foreground">Acompanhe suas fichas de treino</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {workouts.map((workout) => (
          <Card key={workout.id}>
            <CardHeader>
              <CardTitle>{workout.name}</CardTitle>
              <Badge variant="secondary" className="w-fit">
                {workout.exercises.length} exercícios
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {workout.exercises.map((exercise, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-muted rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {exercise.sets} • Descanso: {exercise.rest}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full">
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

export default MyWorkoutsView;
