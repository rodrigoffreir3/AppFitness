import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const AnnouncementsView = () => {
  const [announcements] = useState([
    {
      id: 1,
      title: "Feriado próxima semana",
      content: "A academia estará fechada na próxima segunda-feira",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Novos horários",
      content: "Confira os novos horários disponíveis",
      date: "2024-01-10",
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });

  const handleAddAnnouncement = () => {
    // TODO: Integrar com backend
    toast({
      title: "Aviso publicado!",
      description: "Todos os alunos foram notificados.",
    });
    setNewAnnouncement({ title: "", content: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mural de Avisos</h1>
          <p className="text-muted-foreground">Publique avisos para seus alunos</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Aviso
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publicar Novo Aviso</DialogTitle>
              <DialogDescription>
                Todos os seus alunos receberão este aviso
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                  }
                  placeholder="Título do aviso"
                />
              </div>
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  value={newAnnouncement.content}
                  onChange={(e) =>
                    setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
                  }
                  placeholder="Mensagem do aviso"
                  rows={4}
                />
              </div>
              <Button onClick={handleAddAnnouncement} className="w-full">
                Publicar Aviso
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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

export default AnnouncementsView;
