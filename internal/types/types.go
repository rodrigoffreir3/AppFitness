// internal/types/types.go
package types

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type BrandingResponse struct {
	LogoURL        string `json:"logo_url,omitempty"`
	PrimaryColor   string `json:"primary_color,omitempty"`
	SecondaryColor string `json:"secondary_color,omitempty"` // NOVO
}

type LoginResponse struct {
	Token    string           `json:"token"`
	Branding BrandingResponse `json:"branding,omitempty"`
}

type WorkoutResponse struct {
	ID          string `json:"id"`
	StudentID   string `json:"student_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active"`
}

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
