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

	// Rota GET (Listagem de exercícios)
	mux.Handle("GET /api/exercises", middleware.AuthMiddleware(http.HandlerFunc(h.handleListExercises)))

	// Rota POST (Criar exercício novo/personalizado)
	mux.Handle("POST /api/exercises", middleware.AuthMiddleware(http.HandlerFunc(h.handleCreateExercise)))

	// Rota GET: Buscar categorias únicas para os filtros
	mux.Handle("GET /api/exercises/categories", middleware.AuthMiddleware(http.HandlerFunc(h.handleGetCategories)))
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
	VideoURL    string `json:"video_url"`
}

func (h *exercisesHandler) handleListExercises(w http.ResponseWriter, r *http.Request) {
	// 1. Parâmetros de busca e paginação
	pageStr := r.URL.Query().Get("page")
	limitStr := r.URL.Query().Get("limit")
	search := r.URL.Query().Get("search")
	category := r.URL.Query().Get("category")

	page, _ := strconv.Atoi(pageStr)
	if page < 1 {
		page = 1
	}

	// CORREÇÃO: Respeita o limite do Front (20) se enviado, senão usa 1000
	limit, _ := strconv.Atoi(limitStr)
	if limit < 1 {
		limit = 1000
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

	// Filtro de busca (nome ou grupo muscular)
	if search != "" {
		baseQuery += ` AND (name ILIKE $` + strconv.Itoa(argCounter) + ` OR muscle_group ILIKE $` + strconv.Itoa(argCounter) + `)`
		args = append(args, "%"+search+"%")
		argCounter++
	}

	// Filtro por categoria (Grupo Muscular)
	if category != "" && category != "todos" {
		baseQuery += ` AND muscle_group = $` + strconv.Itoa(argCounter)
		args = append(args, category)
		argCounter++
	}

	// Ordenação e limites
	baseQuery += ` ORDER BY name ASC LIMIT $` + strconv.Itoa(argCounter) + ` OFFSET $` + strconv.Itoa(argCounter+1)
	args = append(args, limit, offset)

	rows, err := h.db.QueryContext(r.Context(), baseQuery, args...)
	if err != nil {
		log.Printf("Erro ao listar exercícios: %v", err)
		http.Error(w, "Erro interno ao buscar exercícios", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var exercises []ExerciseResponse
	for rows.Next() {
		var ex ExerciseResponse
		if err := rows.Scan(&ex.ID, &ex.Name, &ex.MuscleGroup, &ex.Equipment, &ex.VideoURL); err != nil {
			log.Printf("Erro scan exercício: %v", err)
			continue
		}

		// --- LÓGICA DE ASSINATURA DE URL (R2) ---
		if ex.VideoURL != nil && *ex.VideoURL != "" {
			if !strings.HasPrefix(*ex.VideoURL, "http") {
				if h.storage != nil {
					signed, err := h.storage.GetSignedURL(*ex.VideoURL)
					if err == nil {
						ex.VideoURL = &signed
					} else {
						log.Printf("Erro ao assinar URL para o exercício %s: %v", ex.Name, err)
					}
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
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		http.Error(w, "O nome do exercício é obrigatório", http.StatusBadRequest)
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
		log.Printf("Erro ao inserir exercício no banco: %v", err)
		http.Error(w, "Erro ao salvar exercício", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newEx)
}

func (h *exercisesHandler) handleGetCategories(w http.ResponseWriter, r *http.Request) {
	query := `
		SELECT DISTINCT muscle_group 
		FROM exercises 
		WHERE muscle_group IS NOT NULL AND muscle_group != '' 
		ORDER BY muscle_group ASC
	`

	rows, err := h.db.QueryContext(r.Context(), query)
	if err != nil {
		log.Printf("Erro ao buscar categorias únicas: %v", err)
		http.Error(w, "Erro interno ao buscar categorias", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	categories := []string{}
	for rows.Next() {
		var category string
		if err := rows.Scan(&category); err != nil {
			log.Printf("Erro scan categoria: %v", err)
			continue
		}
		categories = append(categories, category)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categories)
}
