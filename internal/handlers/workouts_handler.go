// internal/handlers/workouts_handler.go
package handlers

import (
	"appfitness/internal/middleware"
	"appfitness/internal/types"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

// (As funções RegisterWorkoutsRoutes, workoutsHandler, CreateWorkoutRequest, e UpdateWorkoutRequest permanecem as mesmas)
func RegisterWorkoutsRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &workoutsHandler{
		db: db,
	}

	createWorkoutHandler := http.HandlerFunc(h.handleCreateWorkout)
	listWorkoutsHandler := http.HandlerFunc(h.handleListWorkouts)
	getWorkoutHandler := http.HandlerFunc(h.handleGetWorkout)
	updateWorkoutHandler := http.HandlerFunc(h.handleUpdateWorkout)
	deleteWorkoutHandler := http.HandlerFunc(h.handleDeleteWorkout)

	mux.Handle("POST /api/workouts", middleware.AuthMiddleware(createWorkoutHandler))
	mux.Handle("GET /api/workouts", middleware.AuthMiddleware(listWorkoutsHandler))
	mux.Handle("GET /api/workouts/{id}", middleware.AuthMiddleware(getWorkoutHandler))
	mux.Handle("PUT /api/workouts/{id}", middleware.AuthMiddleware(updateWorkoutHandler))
	mux.Handle("DELETE /api/workouts/{id}", middleware.AuthMiddleware(deleteWorkoutHandler))
}

type workoutsHandler struct {
	db *sql.DB
}

type CreateWorkoutRequest struct {
	StudentID   string `json:"student_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type UpdateWorkoutRequest struct {
	Name        *string `json:"name"`
	Description *string `json:"description"`
	IsActive    *bool   `json:"is_active"`
}

// (As funções handleGetWorkout, handleUpdateWorkout, handleDeleteWorkout, e handleCreateWorkout permanecem as mesmas)
// ... (handleGetWorkout) ...
// ... (handleUpdateWorkout) ...
// ... (handleDeleteWorkout) ...
// ... (handleCreateWorkout) ...

// --- handleListWorkouts MODIFICADO ---

func (h *workoutsHandler) handleListWorkouts(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	studentID := r.URL.Query().Get("student_id")

	// SE O student_id FOR FORNECIDO, usamos a lógica antiga (listar para um aluno específico)
	if studentID != "" {
		var studentOwnerTrainerID string
		err := h.db.QueryRowContext(r.Context(), "SELECT trainer_id FROM students WHERE id = $1 AND trainer_id = $2", studentID, trainerID).Scan(&studentOwnerTrainerID)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Aluno não encontrado ou não pertence a este trainer", http.StatusNotFound)
				return
			}
			log.Printf("Erro ao verificar dono do aluno para listar treinos: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}

		query := `SELECT id, student_id, name, description, is_active FROM workouts WHERE student_id = $1 ORDER BY created_at DESC`
		rows, err := h.db.QueryContext(r.Context(), query, studentID)
		if err != nil {
			log.Printf("Erro ao buscar treinos: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var workouts []types.WorkoutResponse // Usando o tipo padrão
		for rows.Next() {
			var workout types.WorkoutResponse
			if err := rows.Scan(&workout.ID, &workout.StudentID, &workout.Name, &workout.Description, &workout.IsActive); err != nil {
				log.Printf("Erro ao escanear linha de treino: %v", err)
				http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
				return
			}
			workouts = append(workouts, workout)
		}

		if err = rows.Err(); err != nil {
			log.Printf("Erro após iteração de treinos: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}

		if workouts == nil {
			workouts = []types.WorkoutResponse{}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(workouts)

	} else {
		// --- NOVA LÓGICA ---
		// SE O student_id FOR OMITIDO, listamos todos os treinos do treinador

		// 1. Definimos uma struct de resposta local que inclui o nome do aluno
		type WorkoutWithStudentResponse struct {
			ID          string `json:"id"`
			StudentID   string `json:"student_id"`
			StudentName string `json:"student_name"` // Novo campo
			Name        string `json:"name"`
			Description string `json:"description"`
			IsActive    bool   `json:"is_active"`
		}

		// 2. Criamos a query com JOIN na tabela 'students'
		query := `
			SELECT 
				w.id, w.student_id, s.name as student_name, 
				w.name, w.description, w.is_active
			FROM workouts w
			JOIN students s ON w.student_id = s.id
			WHERE w.trainer_id = $1
			ORDER BY s.name ASC, w.created_at DESC
		`
		rows, err := h.db.QueryContext(r.Context(), query, trainerID)
		if err != nil {
			log.Printf("Erro ao buscar todos os treinos do trainer: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// 3. Scan para a nova struct
		var workouts []WorkoutWithStudentResponse
		for rows.Next() {
			var workout WorkoutWithStudentResponse
			if err := rows.Scan(&workout.ID, &workout.StudentID, &workout.StudentName, &workout.Name, &workout.Description, &workout.IsActive); err != nil {
				log.Printf("Erro ao escanear linha de treino com aluno: %v", err)
				http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
				return
			}
			workouts = append(workouts, workout)
		}

		if err = rows.Err(); err != nil {
			log.Printf("Erro após iteração de todos os treinos: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}

		if workouts == nil {
			workouts = []WorkoutWithStudentResponse{}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(workouts)
	}
}

// --- FIM DA MODIFICAÇÃO ---

// (handleGetWorkout, handleUpdateWorkout, handleDeleteWorkout, e handleCreateWorkout
//  devem estar presentes no seu arquivo. Se não estiverem, cole-os aqui do arquivo original)

func (h *workoutsHandler) handleGetWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("id")

	var workout types.WorkoutResponse
	query := `SELECT id, student_id, name, description, is_active FROM workouts WHERE id = $1 AND trainer_id = $2`
	err := h.db.QueryRowContext(r.Context(), query, workoutID, trainerID).Scan(&workout.ID, &workout.StudentID, &workout.Name, &workout.Description, &workout.IsActive)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Treino não encontrado ou não pertence a este trainer", http.StatusNotFound)
			return
		}
		log.Printf("Erro ao buscar treino: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(workout)
}

func (h *workoutsHandler) handleUpdateWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("id")

	var req UpdateWorkoutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	query := `UPDATE workouts SET name = COALESCE($1, name), description = COALESCE($2, description), is_active = COALESCE($3, is_active) WHERE id = $4 AND trainer_id = $5`
	result, err := h.db.ExecContext(r.Context(), query, req.Name, req.Description, req.IsActive, workoutID, trainerID)
	if err != nil {
		log.Printf("Erro ao atualizar treino: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Treino não encontrado ou não pertence a este trainer", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Treino atualizado com sucesso"))
}

func (h *workoutsHandler) handleDeleteWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("id")

	query := `DELETE FROM workouts WHERE id = $1 AND trainer_id = $2`
	result, err := h.db.ExecContext(r.Context(), query, workoutID, trainerID)
	if err != nil {
		log.Printf("Erro ao deletar treino: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Treino não encontrado ou não pertence a este trainer", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *workoutsHandler) handleCreateWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)

	var req CreateWorkoutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	var studentOwnerTrainerID string
	err := h.db.QueryRowContext(r.Context(), "SELECT trainer_id FROM students WHERE id = $1", req.StudentID).Scan(&studentOwnerTrainerID)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Aluno não encontrado", http.StatusNotFound)
			return
		}
		log.Printf("Erro ao verificar dono do aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	if studentOwnerTrainerID != trainerID {
		http.Error(w, "Este aluno não pertence a você", http.StatusForbidden)
		return
	}

	var newWorkout types.WorkoutResponse
	query := `
		INSERT INTO workouts (name, description, student_id, trainer_id)
		VALUES ($1, $2, $3, $4)
		RETURNING id, student_id, name, description, is_active
	`
	err = h.db.QueryRowContext(r.Context(), query, req.Name, req.Description, req.StudentID, trainerID).Scan(
		&newWorkout.ID, &newWorkout.StudentID, &newWorkout.Name, &newWorkout.Description, &newWorkout.IsActive,
	)
	if err != nil {
		log.Printf("Erro ao inserir treino no banco de dados: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	log.Printf("Novo treino '%s' criado para o aluno ID %s", newWorkout.Name, newWorkout.StudentID)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newWorkout)
}
