// internal/handlers/trainers_handler.go
package handlers

import (
	"appfitness/internal/middleware"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func RegisterTrainersRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &trainersHandler{db: db}

	// --- Rotas Públicas ---
	mux.HandleFunc("POST /api/trainers", h.handleCreateTrainer)
	mux.HandleFunc("POST /api/login", h.handleLogin)

	// --- Rotas Protegidas ---
	getTrainerMeHandler := http.HandlerFunc(h.handleGetTrainerMe)
	mux.Handle("GET /api/trainers/me", middleware.AuthMiddleware(getTrainerMeHandler))

	// MODIFICAÇÃO: Nova rota protegida para atualizar o perfil do trainer.
	updateTrainerMeHandler := http.HandlerFunc(h.handleUpdateTrainerMe)
	mux.Handle("PUT /api/trainers/me", middleware.AuthMiddleware(updateTrainerMeHandler))
}

type trainersHandler struct {
	db *sql.DB
}

// --- Estruturas de Requisição/Resposta ---

type CreateTrainerRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

type TrainerProfileResponse struct {
	ID                string `json:"id"`
	Name              string `json:"name"`
	Email             string `json:"email"`
	BrandLogoURL      string `json:"brand_logo_url,omitempty"`
	BrandPrimaryColor string `json:"brand_primary_color,omitempty"`
}

// MODIFICAÇÃO: Nova struct para a requisição de atualização.
// Usamos ponteiros para que possamos diferenciar um valor não enviado de um valor vazio.
type UpdateTrainerRequest struct {
	Name              *string `json:"name"`
	BrandLogoURL      *string `json:"brand_logo_url"`
	BrandPrimaryColor *string `json:"brand_primary_color"`
}

// --- Handlers ---

// handleUpdateTrainerMe atualiza os dados do personal trainer autenticado.
// MODIFICAÇÃO: Nova função handler.
func (h *trainersHandler) handleUpdateTrainerMe(w http.ResponseWriter, r *http.Request) {
	trainerID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "Não foi possível obter o ID do trainer", http.StatusInternalServerError)
		return
	}

	var req UpdateTrainerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	// Lógica para construir a query de UPDATE dinamicamente
	queryParts := []string{}
	args := []interface{}{}
	argID := 1

	if req.Name != nil {
		queryParts = append(queryParts, fmt.Sprintf("name = $%d", argID))
		args = append(args, *req.Name)
		argID++
	}
	if req.BrandLogoURL != nil {
		queryParts = append(queryParts, fmt.Sprintf("brand_logo_url = $%d", argID))
		args = append(args, *req.BrandLogoURL)
		argID++
	}
	if req.BrandPrimaryColor != nil {
		queryParts = append(queryParts, fmt.Sprintf("brand_primary_color = $%d", argID))
		args = append(args, *req.BrandPrimaryColor)
		argID++
	}

	if len(queryParts) == 0 {
		http.Error(w, "Nenhum campo para atualizar foi fornecido", http.StatusBadRequest)
		return
	}

	query := fmt.Sprintf("UPDATE trainers SET %s WHERE id = $%d", strings.Join(queryParts, ", "), argID)
	args = append(args, trainerID)

	_, err := h.db.ExecContext(r.Context(), query, args...)
	if err != nil {
		log.Printf("Erro ao atualizar o perfil do trainer: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Perfil atualizado com sucesso!"))
}

// As funções handleCreateTrainer, handleLogin e handleGetTrainerMe permanecem as mesmas
func (h *trainersHandler) handleGetTrainerMe(w http.ResponseWriter, r *http.Request) {
	trainerID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "Não foi possível obter o ID do trainer", http.StatusInternalServerError)
		return
	}
	var resp TrainerProfileResponse
	query := `SELECT id, name, email, COALESCE(brand_logo_url, ''), COALESCE(brand_primary_color, '') FROM trainers WHERE id = $1`
	err := h.db.QueryRowContext(r.Context(), query, trainerID).Scan(&resp.ID, &resp.Name, &resp.Email, &resp.BrandLogoURL, &resp.BrandPrimaryColor)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Trainer não encontrado", http.StatusNotFound)
			return
		}
		log.Printf("Erro ao buscar perfil do trainer: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
func (h *trainersHandler) handleCreateTrainer(w http.ResponseWriter, r *http.Request) {
	var req CreateTrainerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}
	if req.Name == "" || req.Email == "" || req.Password == "" {
		http.Error(w, "Nome, email e senha são obrigatórios", http.StatusBadRequest)
		return
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		log.Printf("Erro ao hashear a senha: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	query := `INSERT INTO trainers (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id`
	var newTrainerID string
	err = h.db.QueryRowContext(r.Context(), query, req.Name, req.Email, string(hashedPassword)).Scan(&newTrainerID)
	if err != nil {
		log.Printf("Erro ao inserir trainer no banco de dados: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	log.Printf("Novo trainer criado com sucesso. ID: %s", newTrainerID)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"id": newTrainerID})
}
func (h *trainersHandler) handleLogin(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}
	var trainerID, hashedPassword string
	query := `SELECT id, password_hash FROM trainers WHERE email = $1`
	err := h.db.QueryRowContext(r.Context(), query, req.Email).Scan(&trainerID, &hashedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Email ou senha inválidos", http.StatusUnauthorized)
			return
		}
		log.Printf("Erro ao buscar trainer: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(req.Password))
	if err != nil {
		http.Error(w, "Email ou senha inválidos", http.StatusUnauthorized)
		return
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": trainerID,
		"exp": time.Now().Add(time.Hour * 8).Unix(),
	})
	jwtSecret := os.Getenv("JWT_SECRET")
	tokenString, err := claims.SignedString([]byte(jwtSecret))
	if err != nil {
		log.Printf("Erro ao gerar token JWT: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(LoginResponse{Token: tokenString})
}
