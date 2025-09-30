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
