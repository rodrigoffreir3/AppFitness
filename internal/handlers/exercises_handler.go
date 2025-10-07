// internal/handlers/exercises_handler.go
package handlers

import (
	"appfitness/internal/middleware"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

// RegisterExercisesRoutes regista as rotas da biblioteca de exercícios.
func RegisterExercisesRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &exercisesHandler{db: db}
	listHandler := http.HandlerFunc(h.handleListExercises)
	// Protegemos a rota para que apenas utilizadores logados possam ver a biblioteca
	mux.Handle("GET /api/exercises", middleware.AuthMiddleware(listHandler))
}

type exercisesHandler struct {
	db *sql.DB
}

type ExerciseResponse struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	MuscleGroup string `json:"muscle_group"`
	Equipment   string `json:"equipment"`
}

func (h *exercisesHandler) handleListExercises(w http.ResponseWriter, r *http.Request) {
	query := `SELECT id, name, muscle_group, equipment FROM exercises ORDER BY name ASC`
	rows, err := h.db.QueryContext(r.Context(), query)
	if err != nil {
		log.Printf("Erro ao listar exercícios da biblioteca: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var exercises []ExerciseResponse
	for rows.Next() {
		var ex ExerciseResponse
		if err := rows.Scan(&ex.ID, &ex.Name, &ex.MuscleGroup, &ex.Equipment); err != nil {
			log.Printf("Erro ao escanear exercício da biblioteca: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}
		exercises = append(exercises, ex)
	}

	if exercises == nil {
		exercises = []ExerciseResponse{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(exercises)
}
