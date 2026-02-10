package handlers

import (
	"appfitness/internal/middleware"
	"appfitness/internal/services"
	"appfitness/internal/types"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"
)

// RegisterWorkoutExercisesRoutes registra as rotas de exercícios dentro de um treino
func RegisterWorkoutExercisesRoutes(mux *http.ServeMux, db *sql.DB, storage *services.StorageService) {
	h := &workoutExercisesHandler{
		db:      db,
		storage: storage,
	}

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
	db      *sql.DB
	storage *services.StorageService
}

type AddExerciseRequest struct {
	ExerciseID        string `json:"exercise_id"`
	Sets              int    `json:"sets"`
	Reps              string `json:"reps"`
	RestPeriodSeconds int    `json:"rest_period_seconds"`
	Order             int    `json:"order"`
	Notes             string `json:"notes"`
	ExecutionDetails  string `json:"execution_details"`
	// VideoURL ignorado propositalmente pois a tabela workout_exercises não tem essa coluna ainda
}

type UpdateWorkoutExerciseRequest struct {
	Sets              *int    `json:"sets"`
	Reps              *string `json:"reps"`
	RestPeriodSeconds *int    `json:"rest_period_seconds"`
	Order             *int    `json:"order"`
	Notes             *string `json:"notes"`
	ExecutionDetails  *string `json:"execution_details"`
}

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

// handleListExercisesInWorkout busca os exercícios e trata URLs de vídeo
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

	// JOIN com exercises para pegar o video_url da biblioteca
	query := `
		SELECT
			we.id, we.exercise_id, e.name, COALESCE(e.video_url, ''), we.sets, we.reps, we.rest_period_seconds,
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
		if err := rows.Scan(&ex.ID, &ex.ExerciseID, &ex.ExerciseName, &ex.VideoURL, &ex.Sets, &ex.Reps, &ex.RestPeriodSeconds, &ex.Order, &ex.Notes, &ex.ExecutionDetails); err != nil {
			log.Printf("Erro ao escanear linha de exercício do treino: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}

		// --- LÓGICA DE URL ---
		if ex.VideoURL != "" {
			if !strings.HasPrefix(ex.VideoURL, "http") {
				// É um path do R2 (ex: "videos/agachamento.mp4")
				signedURL, err := h.storage.GetSignedURL(ex.VideoURL)
				if err == nil {
					ex.VideoURL = signedURL
				} else {
					log.Printf("ALERTA: Falha ao assinar URL do video '%s' (storage R2 configurado?): %v", ex.ExerciseName, err)
					// Não limpamos a URL, enviamos a original caso o front consiga resolver de outra forma
				}
			}
		}
		// ---------------------

		exercises = append(exercises, ex)
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

	// IMPORTANTE: Aqui só salvamos dados da tabela workout_exercises.
	// O vídeo virá da tabela exercises no GET.
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
