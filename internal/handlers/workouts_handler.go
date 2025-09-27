// internal/handlers/workouts_handler.go
package handlers

import (
	"appfitness/internal/middleware"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func RegisterWorkoutsRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &workoutsHandler{
		db: db,
	}

	createWorkoutHandler := http.HandlerFunc(h.handleCreateWorkout)
	listWorkoutsHandler := http.HandlerFunc(h.handleListWorkouts)
	getWorkoutHandler := http.HandlerFunc(h.handleGetWorkout)       // MODIFICAÇÃO
	updateWorkoutHandler := http.HandlerFunc(h.handleUpdateWorkout) // MODIFICAÇÃO
	deleteWorkoutHandler := http.HandlerFunc(h.handleDeleteWorkout) // MODIFICAÇÃO

	mux.Handle("POST /api/workouts", middleware.AuthMiddleware(createWorkoutHandler))
	mux.Handle("GET /api/workouts", middleware.AuthMiddleware(listWorkoutsHandler))

	// MODIFICAÇÃO: Novas rotas para um treino específico.
	mux.Handle("GET /api/workouts/{id}", middleware.AuthMiddleware(getWorkoutHandler))
	mux.Handle("PUT /api/workouts/{id}", middleware.AuthMiddleware(updateWorkoutHandler))
	mux.Handle("DELETE /api/workouts/{id}", middleware.AuthMiddleware(deleteWorkoutHandler))
}

type workoutsHandler struct {
	db *sql.DB
}

// --- Estruturas de Requisição/Resposta ---
type CreateWorkoutRequest struct {
	StudentID   string `json:"student_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}
type WorkoutResponse struct {
	ID          string `json:"id"`
	StudentID   string `json:"student_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active"`
}

// MODIFICAÇÃO: Nova struct para a requisição de atualização de treino.
type UpdateWorkoutRequest struct {
	Name        *string `json:"name"`
	Description *string `json:"description"`
	IsActive    *bool   `json:"is_active"`
}

// --- Handlers ---
// MODIFICAÇÃO: Nova função para buscar um treino específico.
func (h *workoutsHandler) handleGetWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("id")

	var workout WorkoutResponse
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

// MODIFICAÇÃO: Nova função para atualizar um treino.
func (h *workoutsHandler) handleUpdateWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("id")

	var req UpdateWorkoutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	// Lógica de update (semelhante à de trainers, mas para workouts)
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

// MODIFICAÇÃO: Nova função para deletar um treino.
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

// As funções handleCreateWorkout e handleListWorkouts permanecem as mesmas
func (h *workoutsHandler) handleListWorkouts(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	studentID := r.URL.Query().Get("student_id")
	if studentID == "" {
		http.Error(w, "O query parameter 'student_id' é obrigatório", http.StatusBadRequest)
		return
	}
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
	var workouts []WorkoutResponse
	for rows.Next() {
		var workout WorkoutResponse
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
		workouts = []WorkoutResponse{}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(workouts)
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
	var newWorkout WorkoutResponse
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
