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

// ALTERAÇÃO: Adicionamos a struct de resposta para os treinos
type WorkoutResponse struct {
	ID          string `json:"id"`
	StudentID   string `json:"student_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active"`
}
