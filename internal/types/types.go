// internal/types/types.go
package types

import "time"

// LoginRequest usada por trainers e students
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// BrandingResponse agora inclui dados de pagamento do treinador
type BrandingResponse struct {
	LogoURL        string `json:"logo_url,omitempty"`
	PrimaryColor   string `json:"primary_color,omitempty"`
	SecondaryColor string `json:"secondary_color,omitempty"`
	// Dados de pagamento públicos para o aluno ver
	PaymentPixKey       string `json:"payment_pix_key,omitempty"`
	PaymentLinkURL      string `json:"payment_link_url,omitempty"`
	PaymentInstructions string `json:"payment_instructions,omitempty"`
}

// LoginResponse
type LoginResponse struct {
	Token    string           `json:"token"`
	Branding BrandingResponse `json:"branding,omitempty"`
}

// WorkoutResponse
type WorkoutResponse struct {
	ID          string `json:"id"`
	StudentID   string `json:"student_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active"`
	FileURL     string `json:"file_url"` // CAMPO ADICIONADO
}

// WorkoutExerciseResponse
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

// Estrutura interna para controlar assinatura (uso futuro no middleware)
type SubscriptionInfo struct {
	Status    string     `json:"status"`
	ExpiresAt *time.Time `json:"expires_at"`
}
