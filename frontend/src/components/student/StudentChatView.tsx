import { useState, useEffect, useRef } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api";
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import type { SendMessagePayload, ReceivedMessage } from '@/hooks/useChatWebSocket';

// Interface para o Perfil do Aluno
interface StudentProfile {
  id: string;
  name: string;
  email: string;
  trainer_id: string;
  trainer_name: string;
}

// Interface para o Histórico de Mensagens
type MessageResponse = ReceivedMessage;


const StudentChatView = () => {
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [messageHistory, setMessageHistory] = useState<MessageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const viewportRef = useRef<HTMLDivElement>(null);

  const { sendMessage, lastMessage, status: wsStatus } = useChatWebSocket();

  // Efeito 1: Buscar perfil e histórico
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // --- CORREÇÃO AQUI ---
        const profileResponse = await api.get<StudentProfile>('/students/me/profile');
        // --- FIM DA CORREÇÃO ---
        const profileData = profileResponse.data;
        setProfile(profileData);

        if (!profileData.trainer_id) {
          setError("Você não está associado a um treinador.");
          setLoading(false);
          return;
        }

        // --- CORREÇÃO AQUI ---
        const historyResponse = await api.get<MessageResponse[]>(`/chat/history/${profileData.trainer_id}`);
        // --- FIM DA CORREÇÃO ---
        setMessageHistory(historyResponse.data);

      } catch (err) {
        console.error("Erro ao carregar dados do chat do aluno:", err);
        setError("Não foi possível carregar o chat.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Efeito 2: Auto-scroll
  useEffect(() => {
    if (viewportRef.current) {
      setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [messageHistory, loading]);

  // Efeito 3: Processar mensagens recebidas do WebSocket
  useEffect(() => {
    if (lastMessage) {
      const isRelevant = 
        (lastMessage.sender_id === profile?.trainer_id && lastMessage.receiver_id === profile?.id) ||
        (lastMessage.sender_id === profile?.id && lastMessage.receiver_id === profile?.trainer_id);

      if (isRelevant) {
        setMessageHistory(prevHistory => {
          if (prevHistory.find(msg => msg.id === lastMessage.id)) {
            return prevHistory;
          }
          return [...prevHistory, lastMessage];
        });
      }
    }
  }, [lastMessage, profile?.id, profile?.trainer_id]);


  // handleSend
  const handleSend = () => {
    if (!message.trim() || !profile?.trainer_id || !profile?.id || wsStatus !== 'connected') {
      return;
    }

    const payload: SendMessagePayload = {
      receiver_id: profile.trainer_id,
      content: message,
    };

    sendMessage(payload);

    const optimisticMessage: MessageResponse = {
      id: new Date().toISOString(),
      sender_id: profile.id,
      receiver_id: profile.trainer_id,
      content: message,
      created_at: new Date().toISOString(),
    };
    setMessageHistory(prevHistory => [...prevHistory, optimisticMessage]);

    setMessage("");
  };

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
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
          <CardTitle className="flex items-center gap-2">
            {loading ? "Carregando..." : `Chat com ${profile?.trainer_name || 'Treinador'}`}
            <span 
              className={
                `h-3 w-3 rounded-full ${
                  wsStatus === 'connected' ? 'bg-green-500' : 
                  wsStatus === 'connecting' ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`
              } 
              title={`WebSocket: ${wsStatus}`}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" viewportRef={viewportRef}>
            {/* --- RENDERIZAÇÃO CONDICIONAL --- */}
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full text-destructive">
                <AlertCircle className="mr-2 h-4 w-4" /> {error}
              </div>
            ) : messageHistory.length === 0 ? (
              <div className="flex justify-center items-center h-full text-muted-foreground">
                <p>Nenhuma mensagem ainda. Envie a primeira!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messageHistory.map((msg) => {
                  const isFromStudent = msg.sender_id === profile?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isFromStudent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          isFromStudent
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="break-words">{msg.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {formatTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {/* --- FIM RENDERIZAÇÃO --- */}
          </ScrollArea>
          <div className="p-4 border-t flex gap-2">
            <Input
              placeholder={
                wsStatus === 'connected' ? "Digite sua mensagem..." : 
                wsStatus === 'connecting' ? "A ligar ao chat..." : 
                "Chat desligado."
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && wsStatus === 'connected' && handleSend()}
              disabled={loading || !!error || wsStatus !== 'connected'}
            />
            <Button onClick={handleSend} disabled={loading || !!error || wsStatus !== 'connected'}>
              {wsStatus === 'connecting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentChatView;