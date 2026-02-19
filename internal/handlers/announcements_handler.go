package handlers

import (
	"appfitness/internal/middleware"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func RegisterAnnouncementsRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &announcementsHandler{db: db}

	createHandler := http.HandlerFunc(h.handleCreateAnnouncement)
	listHandler := http.HandlerFunc(h.handleListAnnouncements)
	updateHandler := http.HandlerFunc(h.handleUpdateAnnouncement)
	deleteHandler := http.HandlerFunc(h.handleDeleteAnnouncement)

	mux.Handle("POST /api/announcements", middleware.AuthMiddleware(createHandler))
	mux.Handle("GET /api/announcements", middleware.AuthMiddleware(listHandler))
	mux.Handle("PUT /api/announcements/{id}", middleware.AuthMiddleware(updateHandler))
	mux.Handle("DELETE /api/announcements/{id}", middleware.AuthMiddleware(deleteHandler))
}

type announcementsHandler struct {
	db *sql.DB
}

type AnnouncementRequest struct {
	Title    string `json:"title"`
	Content  string `json:"content"`
	ImageURL string `json:"image_url"`
}

type AnnouncementResponse struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	ImageURL  string `json:"image_url"`
	CreatedAt string `json:"created_at"`
}

func (h *announcementsHandler) handleUpdateAnnouncement(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	announcementID := r.PathValue("id")

	var req AnnouncementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	query := `UPDATE announcements SET title = $1, content = $2, image_url = $3 WHERE id = $4 AND trainer_id = $5`
	result, err := h.db.ExecContext(r.Context(), query, req.Title, req.Content, req.ImageURL, announcementID, trainerID)
	if err != nil {
		log.Printf("Erro ao atualizar aviso: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Aviso não encontrado", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Aviso atualizado com sucesso"))
}

func (h *announcementsHandler) handleDeleteAnnouncement(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	announcementID := r.PathValue("id")

	query := `DELETE FROM announcements WHERE id = $1 AND trainer_id = $2`
	result, err := h.db.ExecContext(r.Context(), query, announcementID, trainerID)
	if err != nil {
		log.Printf("Erro ao deletar aviso: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Aviso não encontrado", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *announcementsHandler) handleCreateAnnouncement(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)

	var req AnnouncementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	var newAnnouncement AnnouncementResponse
	query := `
		INSERT INTO announcements (trainer_id, title, content, image_url)
		VALUES ($1, $2, $3, $4)
		RETURNING id, title, content, COALESCE(image_url, ''), created_at
	`
	err := h.db.QueryRowContext(r.Context(), query, trainerID, req.Title, req.Content, req.ImageURL).
		Scan(&newAnnouncement.ID, &newAnnouncement.Title, &newAnnouncement.Content, &newAnnouncement.ImageURL, &newAnnouncement.CreatedAt)
	if err != nil {
		log.Printf("Erro ao criar aviso: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newAnnouncement)
}

func (h *announcementsHandler) handleListAnnouncements(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)

	query := `SELECT id, title, content, COALESCE(image_url, ''), created_at FROM announcements WHERE trainer_id = $1 ORDER BY created_at DESC`
	rows, err := h.db.QueryContext(r.Context(), query, trainerID)
	if err != nil {
		log.Printf("Erro ao listar avisos: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var announcements []AnnouncementResponse
	for rows.Next() {
		var a AnnouncementResponse
		if err := rows.Scan(&a.ID, &a.Title, &a.Content, &a.ImageURL, &a.CreatedAt); err != nil {
			log.Printf("Erro ao escanear aviso: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}
		announcements = append(announcements, a)
	}

	if announcements == nil {
		announcements = []AnnouncementResponse{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(announcements)
}
