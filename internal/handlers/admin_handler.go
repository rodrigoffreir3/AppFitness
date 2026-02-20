package handlers

import (
	"context"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/pquerna/otp/totp"
)

// Registra as rotas secretas do God Mode
func RegisterAdminRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &adminHandler{db: db}

	// 1. A Porta Oculta (Login)
	mux.HandleFunc("POST /api/admin/login", h.handleAdminLogin)

	// 2. O Painel de Comando (Protegido pelo Middleware Admin)
	mux.Handle("GET /api/admin/dashboard", AdminAuthMiddleware(http.HandlerFunc(h.handleAdminDashboard)))

	// 3. Gestão de Inquilinos (Listar e Bloquear)
	mux.Handle("GET /api/admin/trainers", AdminAuthMiddleware(http.HandlerFunc(h.handleAdminTrainers)))
	mux.Handle("POST /api/admin/trainers/{id}/toggle", AdminAuthMiddleware(http.HandlerFunc(h.handleAdminToggleTrainer)))
}

type adminHandler struct {
	db *sql.DB
}

type AdminLoginRequest struct {
	Password  string `json:"password"`
	TOTPToken string `json:"totp_token"`
}

type AdminLoginResponse struct {
	Token string `json:"token"`
}

type AdminTrainer struct {
	ID            string    `json:"id"`
	Name          string    `json:"name"`
	Email         string    `json:"email"`
	Status        string    `json:"subscription_status"`
	TotalStudents int       `json:"total_students"`
	CreatedAt     time.Time `json:"created_at"`
}

// O Verificador de Credenciais
func (h *adminHandler) handleAdminLogin(w http.ResponseWriter, r *http.Request) {
	var req AdminLoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	// Lê os segredos do cofre (.env)
	correctPassword := os.Getenv("ADMIN_PASSWORD")
	totpSecret := os.Getenv("ADMIN_TOTP_SECRET")

	// 1. Verifica a Senha Mestra
	if req.Password != correctPassword {
		log.Printf("Tentativa de invasão God Mode falhou (Senha incorreta) - IP: %s", r.RemoteAddr)
		http.Error(w, "Acesso Negado", http.StatusUnauthorized)
		return
	}

	// 2. Verifica o Google Authenticator (TOTP)
	valid := totp.Validate(req.TOTPToken, totpSecret)
	if !valid {
		log.Printf("Tentativa de invasão God Mode falhou (TOTP incorreto) - IP: %s", r.RemoteAddr)
		http.Error(w, "Token 2FA Inválido", http.StatusUnauthorized)
		return
	}

	// 3. Gera o Token JWT Dourado (God Mode)
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"role": "super_admin",
		"exp":  time.Now().Add(time.Hour * 12).Unix(), // Token dura 12 horas
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		http.Error(w, "Erro ao forjar a chave", http.StatusInternalServerError)
		return
	}

	log.Printf("Acesso God Mode Autorizado - IP: %s", r.RemoteAddr)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AdminLoginResponse{Token: tokenString})
}

// O Olho Que Tudo Vê (Dashboard em Tempo Real)
func (h *adminHandler) handleAdminDashboard(w http.ResponseWriter, r *http.Request) {
	var totalTrainers int
	var totalStudents int

	// 1. Conta todos os Personais (Inquilinos)
	err := h.db.QueryRow("SELECT COUNT(*) FROM trainers").Scan(&totalTrainers)
	if err != nil {
		log.Printf("Erro ao contar treinadores no God Mode: %v", err)
		http.Error(w, "Erro interno de contagem", http.StatusInternalServerError)
		return
	}

	// 2. Conta todos os Alunos Globais (De todos os personais)
	err = h.db.QueryRow("SELECT COUNT(*) FROM students").Scan(&totalStudents)
	if err != nil {
		log.Printf("Erro ao contar alunos no God Mode: %v", err)
		http.Error(w, "Erro interno de contagem", http.StatusInternalServerError)
		return
	}

	// 3. Monta o Relatório
	stats := map[string]interface{}{
		"total_trainers": totalTrainers,
		"total_students": totalStudents,
		"status":         "Sistemas Operacionais 100%", // Aqui futuramente podemos plugar o status da VPS
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}

// Lista todos os personais e seus alunos
func (h *adminHandler) handleAdminTrainers(w http.ResponseWriter, r *http.Request) {
	rows, err := h.db.Query(`
		SELECT t.id, t.name, t.email, t.subscription_status, t.created_at,
		       COUNT(s.id) as total_students
		FROM trainers t
		LEFT JOIN students s ON t.id = s.trainer_id
		GROUP BY t.id, t.name, t.email, t.subscription_status, t.created_at
		ORDER BY t.created_at DESC
	`)
	if err != nil {
		http.Error(w, "Erro ao buscar inquilinos", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var trainers []AdminTrainer
	for rows.Next() {
		var t AdminTrainer
		// O banco pode ter nulos dependendo de como as tabelas foram mexidas, mas por padrão é seguro.
		// Usamos COALESCE ou tratamos direto. Assumindo dados íntegros:
		var status sql.NullString
		if err := rows.Scan(&t.ID, &t.Name, &t.Email, &status, &t.CreatedAt, &t.TotalStudents); err != nil {
			log.Printf("Erro no scan de trainer: %v", err)
			continue
		}
		t.Status = status.String
		if t.Status == "" {
			t.Status = "trial" // Fallback seguro
		}
		trainers = append(trainers, t)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(trainers)
}

// O Botão Vermelho (Kill Switch)
func (h *adminHandler) handleAdminToggleTrainer(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		http.Error(w, "ID ausente", http.StatusBadRequest)
		return
	}

	var currentStatus string
	err := h.db.QueryRow("SELECT subscription_status FROM trainers WHERE id = $1", id).Scan(&currentStatus)
	if err != nil {
		http.Error(w, "Inquilino não encontrado", http.StatusNotFound)
		return
	}

	newStatus := "blocked"
	if currentStatus == "blocked" {
		newStatus = "active" // Desbloqueia e ativa
	}

	_, err = h.db.Exec("UPDATE trainers SET subscription_status = $1 WHERE id = $2", newStatus, id)
	if err != nil {
		http.Error(w, "Erro ao alterar status", http.StatusInternalServerError)
		return
	}

	log.Printf("GOD MODE: Status do treinador %s alterado para %s", id, newStatus)
	w.WriteHeader(http.StatusOK)
}

// --- MIDDLEWARE EXCLUSIVO DO ADMIN ---
func AdminAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Token ausente", http.StatusUnauthorized)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		jwtSecret := []byte(os.Getenv("JWT_SECRET"))

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Token inválido", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || claims["role"] != "super_admin" {
			log.Printf("Usuário mortal tentou acessar rota do God Mode - IP: %s", r.RemoteAddr)
			http.Error(w, "Permissão Negada. Apenas Super Admins.", http.StatusForbidden)
			return
		}

		// Tudo certo, permite a passagem
		next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), "admin_role", "super_admin")))
	})
}
