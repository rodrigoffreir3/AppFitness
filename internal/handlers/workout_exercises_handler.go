// internal/handlers/workout_exercises_handler.go
package handlers

import (
	"appfitness/internal/middleware"
	"appfitness/internal/types"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

func RegisterWorkoutExercisesRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &workoutExercisesHandler{db: db}

	addHandler := http.HandlerFunc(h.handleAddExerciseToWorkout)
	listHandler := http.HandlerFunc(h.handleListExercisesInWorkout)
	updateHandler := http.HandlerFunc(h.handleUpdateExerciseInWorkout)
	deleteHandler := http.HandlerFunc(h.handleDeleteExerciseFromWorkout)

	mux.Handle("POST /api/workouts/{workout_id}/exercises", middleware.AuthMiddleware(addHandler))
	mux.Handle("GET /api/workouts/{workout_id}/exercises", middleware.AuthMiddleware(listHandler))
	mux.Handle("PUT /api/workouts/{workout_id}/exercises/{we_id}", middleware.AuthMiddleware(updateHandler))
	mux.Handle("DELETE /api/workouts/{workout_id}/exercises/{we_id}", middleware.AuthMiddleware(deleteHandler))
}

type workoutExercisesHandler struct {
	db *sql.DB
}

type AddExerciseRequest struct {
	ExerciseID        string `json:"exercise_id"`
	Sets              int    `json:"sets"`
	Reps              string `json:"reps"`
	RestPeriodSeconds int    `json:"rest_period_seconds"`
	Order             int    `json:"order"`
	Notes             string `json:"notes"`
	ExecutionDetails  string `json:"execution_details"`
}

type UpdateWorkoutExerciseRequest struct {
	Sets              *int    `json:"sets"`
	Reps              *string `json:"reps"`
	RestPeriodSeconds *int    `json:"rest_period_seconds"`
	Order             *int    `json:"order"`
	Notes             *string `json:"notes"`
	ExecutionDetails  *string `json:"execution_details"`
}

// --- ALTERAÇÃO: A struct WorkoutExerciseResponse foi removida daqui ---

func (h *workoutExercisesHandler) handleUpdateExerciseInWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("workout_id")
	workoutExerciseID := r.PathValue("we_id")

	var ownerTrainerID string
	err := h.db.QueryRowContext(r.Context(), "SELECT trainer_id FROM workouts WHERE id = $1 AND trainer_id = $2", workoutID, trainerID).Scan(&ownerTrainerID)
	if err != nil {
		http.Error(w, "Treino não encontrado ou não pertence a este trainer", http.StatusNotFound)
		return
	}

	var req UpdateWorkoutExerciseRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	query := `
		UPDATE workout_exercises SET
			sets = COALESCE($1, sets),
			reps = COALESCE($2, reps),
			rest_period_seconds = COALESCE($3, rest_period_seconds),
			"order" = COALESCE($4, "order"),
			notes = COALESCE($5, notes),
			execution_details = COALESCE($6, execution_details)
		WHERE id = $7 AND workout_id = $8
	`
	result, err := h.db.ExecContext(r.Context(), query, req.Sets, req.Reps, req.RestPeriodSeconds, req.Order, req.Notes, req.ExecutionDetails, workoutExerciseID, workoutID)
	if err != nil {
		log.Printf("Erro ao atualizar exercício no treino: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Exercício não encontrado neste treino", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Exercício atualizado com sucesso"))
}

func (h *workoutExercisesHandler) handleDeleteExerciseFromWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("workout_id")
	workoutExerciseID := r.PathValue("we_id")

	var ownerTrainerID string
	err := h.db.QueryRowContext(r.Context(), "SELECT trainer_id FROM workouts WHERE id = $1 AND trainer_id = $2", workoutID, trainerID).Scan(&ownerTrainerID)
	if err != nil {
		http.Error(w, "Treino não encontrado ou não pertence a este trainer", http.StatusNotFound)
		return
	}

	query := `DELETE FROM workout_exercises WHERE id = $1 AND workout_id = $2`
	result, err := h.db.ExecContext(r.Context(), query, workoutExerciseID, workoutID)
	if err != nil {
		log.Printf("Erro ao deletar exercício do treino: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Exercício não encontrado neste treino", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *workoutExercisesHandler) handleListExercisesInWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("workout_id")
	var ownerTrainerID string
	err := h.db.QueryRowContext(r.Context(), "SELECT trainer_id FROM workouts WHERE id = $1 AND trainer_id = $2", workoutID, trainerID).Scan(&ownerTrainerID)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Treino não encontrado ou não pertence a este trainer", http.StatusNotFound)
			return
		}
		log.Printf("Erro ao verificar dono do treino para listar exercícios: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	query := `
		SELECT
			we.id, we.exercise_id, e.name, we.sets, we.reps, we.rest_period_seconds,
			we."order", we.notes, we.execution_details
		FROM workout_exercises we
		JOIN exercises e ON we.exercise_id = e.id
		WHERE we.workout_id = $1
		ORDER BY we."order" ASC
	`
	rows, err := h.db.QueryContext(r.Context(), query, workoutID)
	if err != nil {
		log.Printf("Erro ao buscar exercícios do treino: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var exercises []types.WorkoutExerciseResponse
	for rows.Next() {
		var ex types.WorkoutExerciseResponse
		if err := rows.Scan(&ex.ID, &ex.ExerciseID, &ex.ExerciseName, &ex.Sets, &ex.Reps, &ex.RestPeriodSeconds, &ex.Order, &ex.Notes, &ex.ExecutionDetails); err != nil {
			log.Printf("Erro ao escanear linha de exercício do treino: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}
		exercises = append(exercises, ex)
	}
	if err = rows.Err(); err != nil {
		log.Printf("Erro após iteração de exercícios do treino: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	if exercises == nil {
		exercises = []types.WorkoutExerciseResponse{}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(exercises)
}

func (h *workoutExercisesHandler) handleAddExerciseToWorkout(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("workout_id")
	var ownerTrainerID string
	err := h.db.QueryRowContext(r.Context(), "SELECT trainer_id FROM workouts WHERE id = $1", workoutID).Scan(&ownerTrainerID)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Treino não encontrado", http.StatusNotFound)
			return
		}
		log.Printf("Erro ao verificar dono do treino: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	if ownerTrainerID != trainerID {
		http.Error(w, "Este treino não pertence a você", http.StatusForbidden)
		return
	}
	var req AddExerciseRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	// A resposta não inclui o nome do exercício, por isso não podemos usar a struct partilhada diretamente
	var newExercise struct {
		ID                string `json:"id"`
		ExerciseID        string `json:"exercise_id"`
		Sets              int    `json:"sets"`
		Reps              string `json:"reps"`
		RestPeriodSeconds int    `json:"rest_period_seconds"`
		Order             int    `json:"order"`
		Notes             string `json:"notes"`
		ExecutionDetails  string `json:"execution_details"`
	}

	query := `
		INSERT INTO workout_exercises (workout_id, exercise_id, sets, reps, rest_period_seconds, "order", notes, execution_details)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id, exercise_id, sets, reps, rest_period_seconds, "order", notes, execution_details
	`
	err = h.db.QueryRowContext(r.Context(), query, workoutID, req.ExerciseID, req.Sets, req.Reps, req.RestPeriodSeconds, req.Order, req.Notes, req.ExecutionDetails).Scan(
		&newExercise.ID, &newExercise.ExerciseID, &newExercise.Sets, &newExercise.Reps, &newExercise.RestPeriodSeconds, &newExercise.Order, &newExercise.Notes, &newExercise.ExecutionDetails,
	)
	if err != nil {
		log.Printf("Erro ao adicionar exercício ao treino: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newExercise)
}
