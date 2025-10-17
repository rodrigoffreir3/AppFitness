import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentAnnouncementsView = () => {
  const announcements = [
    {
      id: 1,
      title: "Feriado próxima semana",
      content: "A academia estará fechada na próxima segunda-feira",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Novos horários",
      content: "Confira os novos horários disponíveis para treino",
      date: "2024-01-10",
    },
    {
      id: 3,
      title: "Dica de nutrição",
      content: "Lembre-se de manter a hidratação durante os treinos",
      date: "2024-01-08",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Avisos</h1>
        <p className="text-muted-foreground">Comunicados do seu treinador</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <CardTitle className="text-lg">{announcement.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{announcement.date}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentAnnouncementsView;
