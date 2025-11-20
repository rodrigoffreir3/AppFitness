import { useState, useEffect, useRef } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api";

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  trainer_id: string;
  trainer_name: string;
}

interface MessageResponse {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

const StudentChatView = () => {
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [messageHistory, setMessageHistory] = useState<MessageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const viewportRef = useRef<HTMLDivElement>(null);

  // Busca perfil e histórico
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // 1. Perfil
        const profileResponse = await api.get<StudentProfile>('/students/me/profile');
        const profileData = profileResponse.data;
        setProfile(profileData);

        if (!profileData.trainer_id) {
          setError("Você não está associado a um treinador.");
          setLoading(false);
          return;
        }

        // 2. Histórico
        const historyResponse = await api.get<MessageResponse[]>(`/chat/history/${profileData.trainer_id}`);
        setMessageHistory(historyResponse.data);

      } catch (err) {
        console.error("Erro ao carregar chat:", err);
        setError("Não foi possível carregar o chat.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (viewportRef.current) {
      setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [messageHistory, loading]);

  const handleSend = () => {
    // TODO: Ligar WebSocket no futuro. Por enquanto só limpa o input.
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mensagens</h1>
        <p className="text-muted-foreground">Converse com seu treinador</p>
      </div>
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>{loading ? "Carregando..." : `Chat com ${profile?.trainer_name || 'Treinador'}`}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" viewportRef={viewportRef}>
            {loading ? (
               <div className="flex justify-center h-full items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : error ? (
               <div className="flex justify-center h-full items-center text-destructive"><AlertCircle className="mr-2 h-4 w-4" /> {error}</div>
            ) : (
              <div className="space-y-4">
                {messageHistory.map((msg) => {
                  const isFromStudent = msg.sender_id === profile?.id;
                  return (
                    <div key={msg.id} className={`flex ${isFromStudent ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-lg p-3 ${isFromStudent ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
          <div className="p-4 border-t flex gap-2">
            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua mensagem..." />
            <Button onClick={handleSend}><Send className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentChatView;