// internal/handlers/chat_handler.go
package handlers

import (
	"appfitness/internal/chat"
	"appfitness/internal/middleware"
	"database/sql" // 1. Importar database/sql
	"encoding/json"
	"log"
	"net/http"
)

// 2. Assinatura da função agora aceita *sql.DB
func RegisterChatRoutes(mux *http.ServeMux, hub *chat.Hub, db *sql.DB) {
	h := &chatHandler{
		hub: hub,
		db:  db, // 3. Passar o db para a struct
	}

	// Endpoint do WebSocket (já existente)
	wsHandler := http.HandlerFunc(h.serveWs)
	mux.Handle("GET /api/ws", middleware.AuthMiddleware(wsHandler))

	// Endpoint REST para buscar o histórico de mensagens
	historyHandler := http.HandlerFunc(h.handleGetChatHistory)
	mux.Handle("GET /api/chat/history/{user_id}", middleware.AuthMiddleware(historyHandler))
}

type chatHandler struct {
	hub *chat.Hub
	db  *sql.DB // 4. Adicionar o db à struct do handler
}

// (Struct MessageResponse permanece igual)
type MessageResponse struct {
	ID         string `json:"id"`
	SenderID   string `json:"sender_id"`
	ReceiverID string `json:"receiver_id"`
	Content    string `json:"content"`
	CreatedAt  string `json:"created_at"`
}

// serveWs (função existente, permanece igual)
func (h *chatHandler) serveWs(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "Não autorizado", http.StatusUnauthorized)
		return
	}
	chat.ServeWs(h.hub, w, r, userID)
}

// handleGetChatHistory (função existente)
func (h *chatHandler) handleGetChatHistory(w http.ResponseWriter, r *http.Request) {
	currentUserID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "Não autorizado", http.StatusUnauthorized)
		return
	}

	otherUserID := r.PathValue("user_id")
	if otherUserID == "" {
		http.Error(w, "ID do utilizador em falta no URL", http.StatusBadRequest)
		return
	}

	query := `
		SELECT id, sender_id, receiver_id, content, created_at
		FROM chat_messages
		WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
		ORDER BY created_at ASC
	`
	// 5. CORREÇÃO: Usar h.db (que está no handler) em vez de h.hub.db
	rows, err := h.db.QueryContext(r.Context(), query, currentUserID, otherUserID)
	if err != nil {
		log.Printf("Erro ao buscar histórico do chat: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var messages []MessageResponse
	for rows.Next() {
		var msg MessageResponse
		if err := rows.Scan(&msg.ID, &msg.SenderID, &msg.ReceiverID, &msg.Content, &msg.CreatedAt); err != nil {
			log.Printf("Erro ao escanear mensagem do chat: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}
		messages = append(messages, msg)
	}

	if messages == nil {
		messages = []MessageResponse{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(messages)
}
