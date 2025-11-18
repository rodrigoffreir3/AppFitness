import { useState, useEffect, useRef } from "react";
import { Send, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api";
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import type { SendMessagePayload, ReceivedMessage } from '@/hooks/useChatWebSocket';

// Interface para Alunos
interface Student {
  id: string;
  name: string;
  email: string;
}

// Interface para o Histórico de Mensagens (agora vem do hook)
type MessageResponse = ReceivedMessage;

// Interface para o Perfil do Treinador
interface TrainerProfile {
  id: string;
  name: string;
  email: string;
}

const ChatView = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [errorStudents, setErrorStudents] = useState("");

  const [trainerId, setTrainerId] = useState<string | null>(null);
  const [messageHistory, setMessageHistory] = useState<MessageResponse[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorHistory, setErrorHistory] = useState("");

  const viewportRef = useRef<HTMLDivElement>(null);

  // 2. Instanciar o hook
  const { sendMessage, lastMessage, status: wsStatus } = useChatWebSocket();

  // Efeito 1: Buscar alunos e o perfil do próprio treinador
  useEffect(() => {
    const fetchData = async () => {
      setLoadingStudents(true);
      setErrorStudents("");
      try {
        // [CORRIGIDO: Removido /api/ das chamadas]
        const [studentsResponse, profileResponse] = await Promise.all([
          api.get<Student[]>('/students'), 
          api.get<TrainerProfile>('/trainers/me')
        ]);
        
        setStudents(studentsResponse.data);
        setTrainerId(profileResponse.data.id); 

        if (studentsResponse.data.length > 0) {
          setSelectedStudentId(studentsResponse.data[0].id);
        }
      } catch (err) {
        console.error("Erro ao buscar dados do chat:", err);
        setErrorStudents("Não foi possível carregar a lista de alunos.");
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchData();
  }, []);

  // Efeito 2: Buscar histórico de mensagens
  useEffect(() => {
    const fetchHistory = async () => {
      if (!selectedStudentId) return; 
      setLoadingHistory(true);
      setErrorHistory("");
      setMessageHistory([]); 
      try {
        // --- CORREÇÃO AQUI ---
        // Removido o /api/ do início da chamada
        const response = await api.get<MessageResponse[]>(`/chat/history/${selectedStudentId}`);
        // --- FIM DA CORREÇÃO ---
        setMessageHistory(response.data);
      } catch (err) {
        console.error(`Erro ao buscar histórico para ${selectedStudentId}:`, err);
        setErrorHistory("Não foi possível carregar o histórico de mensagens.");
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, [selectedStudentId]);

  // Efeito 3: Auto-scroll
  useEffect(() => {
    if (viewportRef.current) {
      setTimeout(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [messageHistory, loadingHistory]);

  // Efeito 4: Processar mensagens recebidas do WebSocket
  useEffect(() => {
    if (lastMessage) {
      const isRelevant = 
        (lastMessage.sender_id === selectedStudentId && lastMessage.receiver_id === trainerId) ||
        (lastMessage.sender_id === trainerId && lastMessage.receiver_id === selectedStudentId);
      
      if (isRelevant) {
        setMessageHistory(prevHistory => {
          if (prevHistory.find(msg => msg.id === lastMessage.id)) {
            return prevHistory;
          }
          return [...prevHistory, lastMessage];
        });
      }
    }
  }, [lastMessage, selectedStudentId, trainerId]);


  // handleSend (Atualizado)
  const handleSend = () => {
    if (!message.trim() || !selectedStudentId || !trainerId || wsStatus !== 'connected') {
      return;
    }
    
    const payload: SendMessagePayload = {
      receiver_id: selectedStudentId,
      content: message,
    };
    
    sendMessage(payload);

    const optimisticMessage: MessageResponse = {
      id: new Date().toISOString(), 
      sender_id: trainerId,
      receiver_id: selectedStudentId,
      content: message,
      created_at: new Date().toISOString(),
    };
    setMessageHistory(prevHistory => [...prevHistory, optimisticMessage]);

    setMessage("");
  };

  const selectedStudentName = students.find((s) => s.id === selectedStudentId)?.name || "Selecione uma conversa";
  
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
        <h1 className="text-3xl font-bold">Chat</h1>
        <p className="text-muted-foreground">Converse com seus alunos</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 h-[600px]">
        {/* Card da Lista de Alunos (Sidebar) */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {loadingStudents ? (
                <div className="flex justify-center items-center h-full p-4"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
              ) : errorStudents ? (
                 <div className="p-4 text-center text-destructive bg-destructive/10 m-4 rounded-lg"><AlertCircle className="mx-auto h-6 w-6 mb-2" /><p className="text-sm">{errorStudents}</p></div>
              ) : students.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground"><p className="text-sm">Nenhum aluno cadastrado ainda.</p></div>
              ) : (
                students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`p-4 cursor-pointer hover:bg-accent transition-colors border-b ${
                      selectedStudentId === student.id ? "bg-accent" : ""
                    }`}
                  >
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground truncate">Clique para ver...</p>
                    </div>
                  </div>
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Card do Chat (Painel Principal) */}
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {loadingStudents ? "Carregando..." : selectedStudentName}
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
              {/* Renderização do Histórico */}
              {loadingHistory ? (
                <div className="flex justify-center items-center h-full"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
              ) : errorHistory ? (
                <div className="flex justify-center items-center h-full text-destructive"><AlertCircle className="mr-2 h-4 w-4" /> {errorHistory}</div>
              ) : messageHistory.length === 0 ? (
                <div className="flex justify-center items-center h-full text-muted-foreground"><p>Inicie a conversa!</p></div>
              ) : (
                <div className="space-y-4">
                  {messageHistory.map((msg) => {
                    const isFromTrainer = msg.sender_id === trainerId;
                    return (
                      <div key={msg.id} className={`flex ${isFromTrainer ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] rounded-lg p-3 ${isFromTrainer ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                          <p className="break-words">{msg.content}</p>
                          <p className="text-xs mt-1 opacity-70">{formatTime(msg.created_at)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={loadingStudents || !selectedStudentId || loadingHistory || wsStatus !== 'connected'}
              />
              <Button onClick={handleSend} disabled={loadingStudents || !selectedStudentId || loadingHistory || wsStatus !== 'connected'}>
                {wsStatus === 'connecting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatView;