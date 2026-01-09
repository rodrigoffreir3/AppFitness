package handlers

import (
	"appfitness/internal/middleware"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

type DietResponse struct {
	ID          string `json:"id"`
	StudentID   string `json:"student_id"`
	StudentName string `json:"student_name"`
	Name        string `json:"name"`
	Description string `json:"description"`
	FileURL     string `json:"file_url"`
	CreatedAt   string `json:"created_at"`
}

type CreateDietRequest struct {
	StudentID   string `json:"student_id"` // Obrigatório para Trainer
	Name        string `json:"name"`
	Description string `json:"description"`
	FileURL     string `json:"file_url"`
}

type dietsHandler struct {
	db *sql.DB
}

func RegisterDietsRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &dietsHandler{db: db}

	// Rotas para o TREINADOR
	mux.Handle("POST /api/diets", middleware.AuthMiddleware(http.HandlerFunc(h.handleCreateDiet)))
	mux.Handle("GET /api/diets", middleware.AuthMiddleware(http.HandlerFunc(h.handleListDiets)))
	mux.Handle("DELETE /api/diets/{id}", middleware.AuthMiddleware(http.HandlerFunc(h.handleDeleteDiet)))

	// Rotas para o ALUNO
	// O aluno usa POST para subir a própria dieta e GET para listar as dele
	mux.Handle("GET /api/students/me/diets", middleware.AuthMiddleware(http.HandlerFunc(h.handleGetMyDiets)))
	mux.Handle("POST /api/students/me/diets", middleware.AuthMiddleware(http.HandlerFunc(h.handleStudentCreateDiet)))
	mux.Handle("DELETE /api/students/me/diets/{id}", middleware.AuthMiddleware(http.HandlerFunc(h.handleStudentDeleteDiet)))
}

// --- TREINADOR ---

func (h *dietsHandler) handleCreateDiet(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	var req CreateDietRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	// Verifica se o aluno pertence ao trainer
	var exists bool
	h.db.QueryRowContext(r.Context(), "SELECT EXISTS(SELECT 1 FROM students WHERE id=$1 AND trainer_id=$2)", req.StudentID, trainerID).Scan(&exists)
	if !exists {
		http.Error(w, "Aluno inválido", http.StatusForbidden)
		return
	}

	h.insertDiet(w, r, trainerID, req.StudentID, req.Name, req.Description, req.FileURL)
}

func (h *dietsHandler) handleListDiets(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	// Busca todas as dietas criadas por este trainer
	query := `
		SELECT d.id, d.student_id, s.name, d.name, d.description, d.file_url, d.created_at
		FROM diets d
		JOIN students s ON d.student_id = s.id
		WHERE d.trainer_id = $1
		ORDER BY d.created_at DESC
	`
	h.serveDietList(w, r, query, trainerID)
}

func (h *dietsHandler) handleDeleteDiet(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	id := r.PathValue("id")
	// Trainer pode deletar qualquer dieta que ele tenha criado (trainer_id)
	h.deleteDiet(w, r, "DELETE FROM diets WHERE id=$1 AND trainer_id=$2", id, trainerID)
}

// --- ALUNO ---

func (h *dietsHandler) handleGetMyDiets(w http.ResponseWriter, r *http.Request) {
	studentID := r.Context().Value(middleware.TrainerIDKey).(string) // ID do user logado
	// Busca dietas onde student_id é ele mesmo
	query := `
		SELECT d.id, d.student_id, s.name, d.name, d.description, d.file_url, d.created_at
		FROM diets d
		JOIN students s ON d.student_id = s.id
		WHERE d.student_id = $1
		ORDER BY d.created_at DESC
	`
	h.serveDietList(w, r, query, studentID)
}

func (h *dietsHandler) handleStudentCreateDiet(w http.ResponseWriter, r *http.Request) {
	studentID := r.Context().Value(middleware.TrainerIDKey).(string)

	// Descobrir quem é o trainer desse aluno para preencher o trainer_id na tabela
	var trainerID string
	err := h.db.QueryRowContext(r.Context(), "SELECT trainer_id FROM students WHERE id=$1", studentID).Scan(&trainerID)
	if err != nil {
		http.Error(w, "Erro ao identificar treinador", http.StatusInternalServerError)
		return
	}

	var req CreateDietRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	// Aluno inserindo para ele mesmo (studentID fixo)
	h.insertDiet(w, r, trainerID, studentID, req.Name, req.Description, req.FileURL)
}

func (h *dietsHandler) handleStudentDeleteDiet(w http.ResponseWriter, r *http.Request) {
	studentID := r.Context().Value(middleware.TrainerIDKey).(string)
	id := r.PathValue("id")
	// Aluno só deleta se for dono (student_id)
	h.deleteDiet(w, r, "DELETE FROM diets WHERE id=$1 AND student_id=$2", id, studentID)
}

// --- AUXILIARES ---

func (h *dietsHandler) insertDiet(w http.ResponseWriter, r *http.Request, trainerID, studentID, name, description, fileURL string) {
	var diet DietResponse
	query := `
		INSERT INTO diets (trainer_id, student_id, name, description, file_url)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, student_id, name, description, file_url, created_at
	`
	err := h.db.QueryRowContext(r.Context(), query, trainerID, studentID, name, description, fileURL).Scan(
		&diet.ID, &diet.StudentID, &diet.Name, &diet.Description, &diet.FileURL, &diet.CreatedAt,
	)
	if err != nil {
		log.Printf("Erro insert diet: %v", err)
		http.Error(w, "Erro ao salvar", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(diet)
}

func (h *dietsHandler) deleteDiet(w http.ResponseWriter, r *http.Request, query string, args ...any) {
	res, err := h.db.ExecContext(r.Context(), query, args...)
	if err != nil {
		http.Error(w, "Erro ao deletar", http.StatusInternalServerError)
		return
	}
	rows, _ := res.RowsAffected()
	if rows == 0 {
		http.Error(w, "Dieta não encontrada ou sem permissão", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *dietsHandler) serveDietList(w http.ResponseWriter, r *http.Request, query string, arg string) {
	rows, err := h.db.QueryContext(r.Context(), query, arg)
	if err != nil {
		log.Printf("Erro list diets: %v", err)
		http.Error(w, "Erro no servidor", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var diets []DietResponse
	for rows.Next() {
		var d DietResponse
		if err := rows.Scan(&d.ID, &d.StudentID, &d.StudentName, &d.Name, &d.Description, &d.FileURL, &d.CreatedAt); err != nil {
			continue
		}
		diets = append(diets, d)
	}
	if diets == nil {
		diets = []DietResponse{}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(diets)
}
