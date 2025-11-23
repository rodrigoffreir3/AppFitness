import { useState, useEffect, useRef } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api";
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import type { SendMessagePayload, ReceivedMessage } from '@/hooks/useChatWebSocket';

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  trainer_id: string;
  trainer_name: string;
}

type MessageResponse = ReceivedMessage;

const StudentChatView = () => {
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [messageHistory, setMessageHistory] = useState<MessageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const viewportRef = useRef<HTMLDivElement>(null);
  const { sendMessage, lastMessage, status: wsStatus } = useChatWebSocket();

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

  // Processar mensagens WebSocket recebidas
  useEffect(() => {
    if (lastMessage && profile) {
      // Verifica se a mensagem pertence a este chat (Treinador <-> Aluno)
      const isRelevant = 
        (lastMessage.sender_id === profile.trainer_id && lastMessage.receiver_id === profile.id) ||
        (lastMessage.sender_id === profile.id && lastMessage.receiver_id === profile.trainer_id);
      
      if (isRelevant) {
        setMessageHistory(prevHistory => {
          // Evita duplicatas
          if (prevHistory.find(msg => msg.id === lastMessage.id)) return prevHistory;
          return [...prevHistory, lastMessage];
        });
      }
    }
  }, [lastMessage, profile]);

  const handleSend = () => {
    if (!message.trim() || !profile?.trainer_id || wsStatus !== 'connected') return;

    const payload: SendMessagePayload = {
      receiver_id: profile.trainer_id,
      content: message,
    };

    sendMessage(payload);

    // Adiciona mensagem otimista na tela
    const optimisticMessage: MessageResponse = {
      id: new Date().toISOString(),
      sender_id: profile.id,
      receiver_id: profile.trainer_id,
      content: message,
      created_at: new Date().toISOString(),
    };
    setMessageHistory(prev => [...prev, optimisticMessage]);
    setMessage("");
  };

  // Formata data
  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } catch { return ""; }
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
                className={`h-3 w-3 rounded-full ${wsStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`} 
                title={`Status: ${wsStatus}`}
            />
          </CardTitle>
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
                        <p className="break-words">{msg.content}</p>
                        <p className="text-xs mt-1 opacity-70 text-right">{formatTime(msg.created_at)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
          <div className="p-4 border-t flex gap-2">
            <Input 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder={wsStatus === 'connected' ? "Digite sua mensagem..." : "Conectando..."} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={wsStatus !== 'connected'}
            />
            <Button onClick={handleSend} disabled={wsStatus !== 'connected'}>
              {wsStatus === 'connected' ? <Send className="h-4 w-4" /> : <Loader2 className="h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentChatView;