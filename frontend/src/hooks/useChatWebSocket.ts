import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// --- DEFINIÇÃO DE TIPOS ---
// Mensagem enviada DO frontend PARA o backend (baseado no hub.go)
export interface SendMessagePayload {
  receiver_id: string;
  content: string;
}

// Mensagem recebida DO backend NO frontend (baseado no MessageResponse)
export interface ReceivedMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';
// --- FIM DOS TIPOS ---

// A MÁGICA: Detecta automaticamente se é localhost ou a sua VPS (metsuke.app.br)
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const host = window.location.host;
const WS_URL = `${protocol}//${host}/api/ws`;

export const useChatWebSocket = () => {
  const [lastMessage, setLastMessage] = useState<ReceivedMessage | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const ws = useRef<WebSocket | null>(null);
  const { userType } = useAuth(); // Para saber qual token pegar

  useEffect(() => {
    // Não tentar ligar se não soubermos o tipo de utilizador
    if (!userType) {
      console.warn("useChatWebSocket: Tipo de utilizador desconhecido, a adiar ligação.");
      return;
    }

    // 1. Obter o token correto
    const tokenKey = userType === 'trainer' ? 'trainerAuthToken' : 'studentAuthToken';
    const token = localStorage.getItem(tokenKey);

    if (!token) {
      console.error("useChatWebSocket: Token não encontrado. A ligação WebSocket falhará.");
      setStatus('error');
      return;
    }

    // 2. Construir o URL com o token (agora suportado pelo auth_middleware.go)
    const urlWithToken = `${WS_URL}?token=${token}`;
    
    setStatus('connecting');
    console.log("WebSocket: A ligar a", urlWithToken);

    // 3. Criar a instância do WebSocket
    const socket = new WebSocket(urlWithToken);
    ws.current = socket;

    socket.onopen = () => {
      console.log("WebSocket: Ligado.");
      setStatus('connected');
    };

    socket.onmessage = (event) => {
      try {
        const messageData: ReceivedMessage = JSON.parse(event.data);
        console.log("WebSocket: Mensagem recebida:", messageData);
        setLastMessage(messageData); // Atualiza o estado com a última mensagem
      } catch (error) {
        console.error("WebSocket: Erro ao processar mensagem:", event.data, error);
      }
    };

    socket.onerror = (event) => {
      console.error("WebSocket: Erro:", event);
      setStatus('error');
    };

    socket.onclose = (event) => {
      console.log("WebSocket: Desligado. Código:", event.code);
      setStatus('disconnected');
      ws.current = null;
    };

    // 4. Função de limpeza (executa quando o componente desmonta)
    return () => {
      if (socket.readyState === 1) { // Se ainda estiver aberta
        console.log("WebSocket: A fechar ligação (limpeza).");
        socket.close();
      }
      ws.current = null;
    };
  }, [userType]); // Recria a ligação se o tipo de utilizador mudar

  // 5. Função para enviar mensagens
  const sendMessage = (payload: SendMessagePayload) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      if (!payload.receiver_id || !payload.content) {
        console.error("sendMessage: 'receiver_id' e 'content' são obrigatórios.", payload);
        return;
      }
      
      console.log("WebSocket: A enviar mensagem:", payload);
      ws.current.send(JSON.stringify(payload));
    } else {
      console.error("WebSocket: Não está ligado. Não é possível enviar mensagem.");
    }
  };

  return { sendMessage, lastMessage, status };
};