package handlers

import (
	"appfitness/internal/middleware"
	"appfitness/internal/services" // <--- Importar services
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

// Alterada assinatura para receber storage
func RegisterExercisesRoutes(mux *http.ServeMux, db *sql.DB, storage *services.StorageService) {
	h := &exercisesHandler{
		db:      db,
		storage: storage, // Injeção
	}
	listHandler := http.HandlerFunc(h.handleListExercises)
	mux.Handle("GET /api/exercises", middleware.AuthMiddleware(listHandler))
}

type exercisesHandler struct {
	db      *sql.DB
	storage *services.StorageService // Campo novo
}

type ExerciseResponse struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	MuscleGroup string  `json:"muscle_group"`
	Equipment   string  `json:"equipment"`
	VideoURL    *string `json:"video_url"`
}

func (h *exercisesHandler) handleListExercises(w http.ResponseWriter, r *http.Request) {
	query := `
		SELECT 
			id, 
			name, 
			COALESCE(muscle_group, 'Geral'), 
			COALESCE(equipment, 'Livre'),
			video_url
		FROM exercises 
		ORDER BY name ASC`

	rows, err := h.db.QueryContext(r.Context(), query)
	if err != nil {
		log.Printf("Erro ao listar exercícios: %v", err)
		http.Error(w, "Erro interno", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var exercises []ExerciseResponse
	for rows.Next() {
		var ex ExerciseResponse
		if err := rows.Scan(&ex.ID, &ex.Name, &ex.MuscleGroup, &ex.Equipment, &ex.VideoURL); err != nil {
			log.Printf("Erro scan: %v", err)
			continue
		}

		// --- ASSINATURA DA URL ---
		if ex.VideoURL != nil && *ex.VideoURL != "" {
			// Gera link temporário seguro
			signed, err := h.storage.GetSignedURL(*ex.VideoURL)
			if err == nil {
				ex.VideoURL = &signed
			} else {
				log.Printf("Erro ao assinar video %s: %v", ex.Name, err)
			}
		}
		// -------------------------

		exercises = append(exercises, ex)
	}

	if exercises == nil {
		exercises = []ExerciseResponse{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(exercises)
}
