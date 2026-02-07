package handlers

import (
	"appfitness/internal/middleware"
	"appfitness/internal/services"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
)

func RegisterExercisesRoutes(mux *http.ServeMux, db *sql.DB, storage *services.StorageService) {
	h := &exercisesHandler{
		db:      db,
		storage: storage,
	}

	// Rota GET (Listagem com paginação)
	mux.Handle("GET /api/exercises", middleware.AuthMiddleware(http.HandlerFunc(h.handleListExercises)))

	// Rota POST (Criar exercício novo/personalizado)
	mux.Handle("POST /api/exercises", middleware.AuthMiddleware(http.HandlerFunc(h.handleCreateExercise)))
}

type exercisesHandler struct {
	db      *sql.DB
	storage *services.StorageService
}

type ExerciseResponse struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	MuscleGroup string  `json:"muscle_group"`
	Equipment   string  `json:"equipment"`
	VideoURL    *string `json:"video_url"`
}

type CreateExerciseRequest struct {
	Name        string `json:"name"`
	MuscleGroup string `json:"muscle_group"`
	Equipment   string `json:"equipment"`
	VideoURL    string `json:"video_url"` // Pode ser link do Vimeo ou R2
}

func (h *exercisesHandler) handleListExercises(w http.ResponseWriter, r *http.Request) {
	// 1. Paginação (Lazy Loading)
	pageStr := r.URL.Query().Get("page")
	limitStr := r.URL.Query().Get("limit")
	search := r.URL.Query().Get("search")
	category := r.URL.Query().Get("category")

	page, _ := strconv.Atoi(pageStr)
	if page < 1 {
		page = 1
	}
	limit, _ := strconv.Atoi(limitStr)
	if limit < 1 {
		limit = 20 // Default carrega 20 por vez
	}
	offset := (page - 1) * limit

	// 2. Construção da Query Dinâmica
	baseQuery := `
		SELECT 
			id, 
			name, 
			COALESCE(muscle_group, 'Geral'), 
			COALESCE(equipment, 'Livre'),
			video_url
		FROM exercises 
		WHERE 1=1`

	var args []interface{}
	argCounter := 1

	if search != "" {
		baseQuery += ` AND (name ILIKE $` + strconv.Itoa(argCounter) + ` OR muscle_group ILIKE $` + strconv.Itoa(argCounter) + `)`
		args = append(args, "%"+search+"%")
		argCounter++
	}

	if category != "" && category != "todos" {
		baseQuery += ` AND muscle_group = $` + strconv.Itoa(argCounter)
		args = append(args, category)
		argCounter++
	}

	baseQuery += ` ORDER BY name ASC LIMIT $` + strconv.Itoa(argCounter) + ` OFFSET $` + strconv.Itoa(argCounter+1)
	args = append(args, limit, offset)

	rows, err := h.db.QueryContext(r.Context(), baseQuery, args...)
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

		// --- LÓGICA DE URL ---
		if ex.VideoURL != nil && *ex.VideoURL != "" {
			// Se NÃO for link externo (http/https), assina com R2.
			// Se for Vimeo/YouTube, deixa como está.
			if !strings.HasPrefix(*ex.VideoURL, "http") {
				signed, err := h.storage.GetSignedURL(*ex.VideoURL)
				if err == nil {
					ex.VideoURL = &signed
				}
			}
		}
		exercises = append(exercises, ex)
	}

	if exercises == nil {
		exercises = []ExerciseResponse{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(exercises)
}

func (h *exercisesHandler) handleCreateExercise(w http.ResponseWriter, r *http.Request) {
	var req CreateExerciseRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		http.Error(w, "Nome é obrigatório", http.StatusBadRequest)
		return
	}

	query := `
		INSERT INTO exercises (name, muscle_group, equipment, video_url)
		VALUES ($1, $2, $3, $4)
		RETURNING id, name, muscle_group, equipment, video_url
	`

	var newEx ExerciseResponse
	err := h.db.QueryRowContext(r.Context(), query, req.Name, req.MuscleGroup, req.Equipment, req.VideoURL).Scan(
		&newEx.ID, &newEx.Name, &newEx.MuscleGroup, &newEx.Equipment, &newEx.VideoURL,
	)

	if err != nil {
		log.Printf("Erro ao criar exercício: %v", err)
		http.Error(w, "Erro ao salvar exercício", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newEx)
}
