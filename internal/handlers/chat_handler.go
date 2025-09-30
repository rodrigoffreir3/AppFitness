// internal/handlers/chat_handler.go
package handlers

import (
	"appfitness/internal/chat"
	"appfitness/internal/middleware"
	"net/http"
)

// RegisterChatRoutes regista o endpoint do WebSocket.
func RegisterChatRoutes(mux *http.ServeMux, hub *chat.Hub) {
	// Criamos um handler que sabe sobre o hub.
	h := &chatHandler{
		hub: hub,
	}

	// Protegemos o endpoint com o nosso middleware de autenticação.
	// Só utilizadores logados podem iniciar uma ligação de chat.
	wsHandler := http.HandlerFunc(h.serveWs)
	mux.Handle("GET /api/ws", middleware.AuthMiddleware(wsHandler))
}

type chatHandler struct {
	hub *chat.Hub
}

// serveWs trata os pedidos de upgrade para WebSocket.
func (h *chatHandler) serveWs(w http.ResponseWriter, r *http.Request) {
	// O nosso middleware já validou o token e colocou o ID do utilizador no contexto.
	// Extraímos esse ID.
	userID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		// Se não conseguirmos obter o ID, algo está muito errado.
		// O middleware deveria ter barrado a requisição antes.
		http.Error(w, "Não autorizado", http.StatusUnauthorized)
		return
	}

	// Entregamos a ligação, a resposta, o pedido e o ID do utilizador
	// para a função ServeWs que criámos no pacote de chat.
	chat.ServeWs(h.hub, w, r, userID)
}
