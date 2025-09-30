// internal/chat/hub.go
package chat

import (
	"database/sql"
	"encoding/json"
	"log"
)

// Message define a estrutura de uma mensagem de chat.
// Usamos 'omitempty' para que não precisemos enviar o sender_id ao enviar uma mensagem.
type Message struct {
	SenderID   string `json:"sender_id,omitempty"`
	ReceiverID string `json:"receiver_id"`
	Content    string `json:"content"`
}

// Hub mantém o conjunto de clientes ativos e transmite mensagens para os clientes.
type Hub struct {
	clients    map[string]*Client
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	db         *sql.DB // Adicionamos a conexão com o banco de dados.
}

// NewHub agora aceita a conexão com o banco de dados.
func NewHub(db *sql.DB) *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[string]*Client),
		db:         db,
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client.userID] = client
			log.Printf("Novo cliente registrado: %s", client.userID)

		case client := <-h.unregister:
			if _, ok := h.clients[client.userID]; ok {
				delete(h.clients, client.userID)
				close(client.send)
				log.Printf("Cliente %s cancelou o registro.", client.userID)
			}

		case messageData := <-h.broadcast:
			var msg Message
			// 1. Decodificamos a mensagem JSON recebida.
			if err := json.Unmarshal(messageData, &msg); err != nil {
				log.Printf("Erro ao decodificar mensagem: %v", err)
				continue
			}

			// 2. Procuramos pelo cliente destinatário no nosso mapa de clientes online.
			receiverClient, ok := h.clients[msg.ReceiverID]
			if ok {
				// 3. Se o destinatário estiver online, enviamos a mensagem para o canal 'send' dele.
				select {
				case receiverClient.send <- messageData:
				default:
					// Se o canal de envio estiver cheio, desconectamos o cliente.
					close(receiverClient.send)
					delete(h.clients, receiverClient.userID)
				}
			} else {
				log.Printf("Destinatário %s não está online.", msg.ReceiverID)
			}

			// --- ALTERAÇÃO AQUI ---
			// 4. Salvamos a mensagem no banco de dados para o histórico.
			query := `INSERT INTO chat_messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)`
			_, err := h.db.Exec(query, msg.SenderID, msg.ReceiverID, msg.Content)
			if err != nil {
				log.Printf("Erro ao salvar mensagem no banco de dados: %v", err)
			}
			// --- FIM DA ALTERAÇÃO ---
		}
	}
}
