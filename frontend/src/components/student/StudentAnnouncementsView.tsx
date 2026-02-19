import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/services/api"; // Importar API
import { Loader2, AlertCircle } from "lucide-react"; // Importar ícones

// --- NOVO: Interface de Resposta ---
// Baseado no handler announcements_handler.go
interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string; // Manter como string para exibição
}
// --- FIM NOVO ---

const StudentAnnouncementsView = () => {
  // --- ESTADOS CONECTADOS À API ---
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // --- FIM ESTADOS API ---

  // Função para formatar a data (opcional, mas melhora a UI)
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString.split('T')[0]; // Fallback
    }
  };

  // --- NOVO: useEffect para buscar dados ---
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setError("");
      try {
        // Usar o novo endpoint criado
        const response = await api.get<Announcement[]>('/students/me/announcements');
        setAnnouncements(response.data);
      } catch (err) {
        console.error("Erro ao buscar avisos do aluno:", err);
        setError("Não foi possível carregar os avisos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);
  // --- FIM NOVO ---

  // --- RENDERIZAÇÃO CONDICIONAL ---
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center text-destructive bg-destructive/10 border border-destructive rounded-lg p-6">
          <AlertCircle className="h-8 w-8 mb-4" />
          <p className="font-semibold">Erro ao carregar avisos</p>
          <p className="text-sm">{error}</p>
        </div>
      );
    }
    if (announcements.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-12 border border-dashed rounded-lg">
          <h3 className="mt-2 text-sm font-semibold">Nenhum aviso publicado</h3>
          <p className="mt-1 text-sm text-gray-500">Seu treinador não publicou nenhum aviso ainda.</p>
        </div>
      );
    }
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="overflow-hidden">
            {announcement.image_url && (
              <div className="w-full bg-black/5 border-b flex items-center justify-center p-2">
                <img src={announcement.image_url} alt="Panfleto" className="max-w-full max-h-64 object-contain rounded-md shadow-sm" />
              </div>
            )}
            <CardHeader className={announcement.image_url ? "pt-4" : ""}>
              <CardTitle className="text-lg">{announcement.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{formatDate(announcement.created_at)}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm break-words whitespace-pre-wrap">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  // --- FIM RENDERIZAÇÃO ---

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold">Avisos</h1>
        <p className="text-muted-foreground">Comunicados do seu treinador</p>
      </div>

      {renderContent()}
    </div>
  );
};

export default StudentAnnouncementsView;