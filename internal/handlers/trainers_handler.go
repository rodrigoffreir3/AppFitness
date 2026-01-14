package handlers

import (
	"appfitness/internal/middleware"
	"appfitness/internal/types"
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

	mux.Handle("POST /api/trainers", http.HandlerFunc(h.handleCreateTrainer))
	mux.Handle("POST /api/trainers/login", http.HandlerFunc(h.handleLogin))

	mux.Handle("GET /api/trainers/me", middleware.AuthMiddleware(http.HandlerFunc(h.handleGetTrainerMe)))
	mux.Handle("PUT /api/trainers/me", middleware.AuthMiddleware(http.HandlerFunc(h.handleUpdateTrainerMe)))

	// --- NOVA ROTA PÚBLICA (ADICIONADO) ---
	mux.Handle("GET /api/public/trainers/{id}", http.HandlerFunc(h.handleGetPublicTrainerInfo))
}

type trainersHandler struct {
	db *sql.DB
}

type CreateTrainerRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Resposta completa do perfil do treinador (incluindo dados privados de assinatura)
type TrainerProfileResponse struct {
	ID                  string `json:"id"`
	Name                string `json:"name"`
	Email               string `json:"email"`
	BrandLogoURL        string `json:"brand_logo_url,omitempty"`
	BrandPrimaryColor   string `json:"brand_primary_color,omitempty"`
	BrandSecondaryColor string `json:"brand_secondary_color,omitempty"`
	// Dados de Pagamento para o Aluno
	PaymentPixKey       string `json:"payment_pix_key,omitempty"`
	PaymentLinkURL      string `json:"payment_link_url,omitempty"`
	PaymentInstructions string `json:"payment_instructions,omitempty"`
	// Dados de Assinatura (Privado)
	SubscriptionStatus string     `json:"subscription_status"`
	SubscriptionExp    *time.Time `json:"subscription_expires_at,omitempty"`
}

// --- NOVA STRUCT (ADICIONADO) ---
type PublicTrainerInfoResponse struct {
	Name         string `json:"name"`
	BrandLogoURL string `json:"brand_logo_url"`
	IsActive     bool   `json:"is_active"`
}

type UpdateTrainerRequest struct {
	Name                *string `json:"name"`
	BrandLogoURL        *string `json:"brand_logo_url"`
	BrandPrimaryColor   *string `json:"brand_primary_color"`
	BrandSecondaryColor *string `json:"brand_secondary_color"`
	// Novos campos de pagamento
	PaymentPixKey       *string `json:"payment_pix_key"`
	PaymentLinkURL      *string `json:"payment_link_url"`
	PaymentInstructions *string `json:"payment_instructions"`
}

// --- NOVA FUNÇÃO (ADICIONADO) ---
func (h *trainersHandler) handleGetPublicTrainerInfo(w http.ResponseWriter, r *http.Request) {
	trainerID := r.PathValue("id")

	// Buscamos apenas dados públicos e se ele está ativo
	query := `
		SELECT name, COALESCE(brand_logo_url, ''), COALESCE(subscription_status, 'trial')
		FROM trainers WHERE id = $1
	`
	var name, logo, status string
	err := h.db.QueryRowContext(r.Context(), query, trainerID).Scan(&name, &logo, &status)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Treinador não encontrado", http.StatusNotFound)
			return
		}
		http.Error(w, "Erro ao buscar treinador", http.StatusInternalServerError)
		return
	}

	// Só mostramos o perfil se o treinador estiver ATIVO (Pagamento em dia) ou TRIAL
	isActive := (status == "ACTIVE" || status == "trial")

	json.NewEncoder(w).Encode(PublicTrainerInfoResponse{
		Name:         name,
		BrandLogoURL: logo,
		IsActive:     isActive,
	})
}

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

	queryParts := []string{}
	args := []interface{}{}
	argID := 1

	// Helper para adicionar campos dinamicamente
	addSet := func(field string, val *string) {
		if val != nil {
			queryParts = append(queryParts, fmt.Sprintf("%s = $%d", field, argID))
			args = append(args, *val)
			argID++
		}
	}

	addSet("name", req.Name)
	addSet("brand_logo_url", req.BrandLogoURL)
	addSet("brand_primary_color", req.BrandPrimaryColor)
	addSet("brand_secondary_color", req.BrandSecondaryColor)
	addSet("payment_pix_key", req.PaymentPixKey)
	addSet("payment_link_url", req.PaymentLinkURL)
	addSet("payment_instructions", req.PaymentInstructions)

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

func (h *trainersHandler) handleGetTrainerMe(w http.ResponseWriter, r *http.Request) {
	trainerID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "Não foi possível obter o ID do trainer", http.StatusInternalServerError)
		return
	}
	var resp TrainerProfileResponse

	query := `
		SELECT 
			id, name, email, 
			COALESCE(brand_logo_url, ''), 
			COALESCE(brand_primary_color, '#3b82f6'), 
			COALESCE(brand_secondary_color, '#000000'),
			COALESCE(payment_pix_key, ''),
			COALESCE(payment_link_url, ''),
			COALESCE(payment_instructions, ''),
			COALESCE(subscription_status, 'trial'),
			subscription_expires_at
		FROM trainers WHERE id = $1
	`
	err := h.db.QueryRowContext(r.Context(), query, trainerID).Scan(
		&resp.ID, &resp.Name, &resp.Email,
		&resp.BrandLogoURL, &resp.BrandPrimaryColor, &resp.BrandSecondaryColor,
		&resp.PaymentPixKey, &resp.PaymentLinkURL, &resp.PaymentInstructions,
		&resp.SubscriptionStatus, &resp.SubscriptionExp,
	)

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
	// Define trial de 7 dias
	trialExpires := time.Now().Add(24 * 7 * time.Hour)

	query := `
		INSERT INTO trainers (name, email, password_hash, subscription_status, subscription_expires_at) 
		VALUES ($1, $2, $3, 'trial', $4) 
		RETURNING id
	`
	var newTrainerID string
	err = h.db.QueryRowContext(r.Context(), query, req.Name, req.Email, string(hashedPassword), trialExpires).Scan(&newTrainerID)
	if err != nil {
		if strings.Contains(err.Error(), "violates unique constraint") {
			http.Error(w, "O email fornecido já está em uso.", http.StatusConflict)
			return
		}
		log.Printf("Erro ao inserir trainer no banco de dados: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"id": newTrainerID})
}

func (h *trainersHandler) handleLogin(w http.ResponseWriter, r *http.Request) {
	var req types.LoginRequest
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

	var branding types.BrandingResponse
	// Query atualizada para buscar branding + dados de pagamento
	brandingQuery := `
		SELECT 
			COALESCE(brand_logo_url, ''), 
			COALESCE(brand_primary_color, '#3b82f6'), 
			COALESCE(brand_secondary_color, '#000000'),
			COALESCE(payment_pix_key, ''),
			COALESCE(payment_link_url, ''),
			COALESCE(payment_instructions, '')
		FROM trainers WHERE id = $1
	`
	err = h.db.QueryRowContext(r.Context(), brandingQuery, trainerID).Scan(
		&branding.LogoURL, &branding.PrimaryColor, &branding.SecondaryColor,
		&branding.PaymentPixKey, &branding.PaymentLinkURL, &branding.PaymentInstructions,
	)
	if err != nil {
		log.Printf("Aviso: erro ao buscar detalhes do trainer ID %s: %v", trainerID, err)
	}

	// --- ATUALIZADO: Token expira em 72 horas ---
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": trainerID,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})
	jwtSecret := os.Getenv("JWT_SECRET")
	tokenString, err := claims.SignedString([]byte(jwtSecret))
	if err != nil {
		http.Error(w, "Erro interno", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(types.LoginResponse{
		Token:    tokenString,
		Branding: branding,
	})
}
