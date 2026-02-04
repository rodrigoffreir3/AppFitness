package handlers

import (
	"appfitness/internal/services"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type authHandler struct {
	db           *sql.DB
	emailService *services.EmailService
}

func RegisterAuthRoutes(mux *http.ServeMux, db *sql.DB) {
	emailService := services.NewEmailService()
	h := &authHandler{
		db:           db,
		emailService: emailService,
	}

	mux.HandleFunc("POST /api/auth/forgot-password", h.handleForgotPassword)
	mux.HandleFunc("POST /api/auth/reset-password", h.handleResetPassword)
}

type ForgotPasswordRequest struct {
	Email string `json:"email"`
}

type ResetPasswordRequest struct {
	Token       string `json:"token"`
	NewPassword string `json:"new_password"`
}

// handleForgotPassword refatorado com switch
func (h *authHandler) handleForgotPassword(w http.ResponseWriter, r *http.Request) {
	var req ForgotPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Requisição inválida", http.StatusBadRequest)
		return
	}

	var id string
	var table string

	// 1. Tenta achar em Trainers
	err := h.db.QueryRowContext(r.Context(), "SELECT id FROM trainers WHERE email = $1", req.Email).Scan(&id)

	switch err {
	case nil:
		table = "trainers"
	case sql.ErrNoRows:
		// 2. Se não achou em trainers, tenta achar em Students
		errStudent := h.db.QueryRowContext(r.Context(), "SELECT id FROM students WHERE email = $1", req.Email).Scan(&id)
		if errStudent == nil {
			table = "students"
		} else if errStudent != sql.ErrNoRows {
			// Erro real no banco ao buscar student
			log.Printf("Erro ao buscar email (students): %v", errStudent)
			http.Error(w, "Erro interno", http.StatusInternalServerError)
			return
		}
	default:
		// Erro real no banco ao buscar trainer
		log.Printf("Erro ao buscar email (trainers): %v", err)
		http.Error(w, "Erro interno", http.StatusInternalServerError)
		return
	}

	// Se table continua vazia, não achou em lugar nenhum
	if table == "" {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message": "Se o e-mail estiver cadastrado, você receberá um link."}`))
		return
	}

	token := uuid.New().String()
	expiration := time.Now().Add(1 * time.Hour)

	queryUpdate := fmt.Sprintf("UPDATE %s SET reset_password_token = $1, reset_password_expires_at = $2 WHERE id = $3", table)

	if _, err := h.db.ExecContext(r.Context(), queryUpdate, token, expiration, id); err != nil {
		log.Printf("Erro ao salvar token na tabela %s: %v", table, err)
		http.Error(w, "Erro interno", http.StatusInternalServerError)
		return
	}

	go func() {
		// CORREÇÃO AQUI: SendPasswordResetEmail (conforme definido no email_service.go)
		if err := h.emailService.SendPasswordResetEmail(req.Email, token); err != nil {
			log.Printf("ERRO CRÍTICO: Falha ao enviar email de recuperação para %s: %v", req.Email, err)
		} else {
			log.Printf("Email de recuperação enviado para %s (Tipo: %s)", req.Email, table)
		}
	}()

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Se o e-mail estiver cadastrado, você receberá um link."}`))
}

// handleResetPassword refatorado com switch
func (h *authHandler) handleResetPassword(w http.ResponseWriter, r *http.Request) {
	var req ResetPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Requisição inválida", http.StatusBadRequest)
		return
	}

	if len(req.NewPassword) < 6 {
		http.Error(w, "A senha deve ter pelo menos 6 caracteres", http.StatusBadRequest)
		return
	}

	var id string
	var table string

	// 1. Verifica token em Trainers
	queryCheckTrainer := "SELECT id FROM trainers WHERE reset_password_token = $1 AND reset_password_expires_at > NOW()"
	err := h.db.QueryRowContext(r.Context(), queryCheckTrainer, req.Token).Scan(&id)

	switch err {
	case nil:
		table = "trainers"
	case sql.ErrNoRows:
		// 2. Verifica token em Students
		queryCheckStudent := "SELECT id FROM students WHERE reset_password_token = $1 AND reset_password_expires_at > NOW()"
		errStudent := h.db.QueryRowContext(r.Context(), queryCheckStudent, req.Token).Scan(&id)

		if errStudent == nil {
			table = "students"
		} else if errStudent != sql.ErrNoRows {
			http.Error(w, "Erro interno", http.StatusInternalServerError)
			return
		}
	default:
		http.Error(w, "Erro interno", http.StatusInternalServerError)
		return
	}

	if table == "" {
		http.Error(w, "Token inválido ou expirado. Solicite uma nova recuperação.", http.StatusUnauthorized)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), 10)
	if err != nil {
		http.Error(w, "Erro ao processar senha", http.StatusInternalServerError)
		return
	}

	queryUpdate := fmt.Sprintf("UPDATE %s SET password_hash = $1, reset_password_token = NULL, reset_password_expires_at = NULL WHERE id = $2", table)

	if _, err := h.db.ExecContext(r.Context(), queryUpdate, string(hashedPassword), id); err != nil {
		log.Printf("Erro ao atualizar senha em %s: %v", table, err)
		http.Error(w, "Erro interno", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Senha redefinida com sucesso! Agora você pode fazer login."}`))
}
