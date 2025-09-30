// internal/chat/hub.go
package chat

import "log"

// Hub mantém o conjunto de clientes ativos e transmite mensagens para os clientes.
type Hub struct {
	// Clientes registados. A chave do mapa é o ID do utilizador (trainer ou student).
	clients map[string]*Client

	// Mensagens de entrada dos clientes.
	broadcast chan []byte

	// Pedidos de registo do hub.
	register chan *Client

	// Pedidos de cancelamento de registo.
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[string]*Client),
	}
}

// Run inicia o hub para processar canais de registo, cancelamento e transmissão.
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			// Quando um novo cliente se regista, guardamo-lo no nosso mapa.
			h.clients[client.userID] = client
			log.Printf("Novo cliente registado: %s", client.userID)

		case client := <-h.unregister:
			// Quando um cliente se desconecta, verificamos se ele existe e removemo-lo.
			if _, ok := h.clients[client.userID]; ok {
				delete(h.clients, client.userID)
				close(client.send)
				log.Printf("Cliente %s cancelou o registo.", client.userID)
			}

		case message := <-h.broadcast:
			// Lógica de transmissão (a ser implementada)
			// Por agora, vamos apenas imprimir a mensagem recebida.
			log.Printf("Mensagem recebida para transmissão: %s", string(message))
		}
	}
}
