// internal/types/types.go
package types

// Requisição para login (usada por trainers e students)
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Resposta de login (usada por trainers e students)
type LoginResponse struct {
	Token string `json:"token"`
}

// Resposta para um treino (usada em múltiplos handlers)
type WorkoutResponse struct {
	ID          string `json:"id"`
	StudentID   string `json:"student_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active"`
}

// --- ALTERAÇÃO AQUI ---
// Resposta para um exercício dentro de um treino
type WorkoutExerciseResponse struct {
	ID                string `json:"id"`
	ExerciseID        string `json:"exercise_id"`
	ExerciseName      string `json:"exercise_name"`
	Sets              int    `json:"sets"`
	Reps              string `json:"reps"`
	RestPeriodSeconds int    `json:"rest_period_seconds"`
	Order             int    `json:"order"`
	Notes             string `json:"notes"`
	ExecutionDetails  string `json:"execution_details"`
}
