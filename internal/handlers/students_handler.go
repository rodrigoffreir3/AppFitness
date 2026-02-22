package handlers

import (
	"appfitness/internal/middleware"
	"appfitness/internal/services"
	"appfitness/internal/types"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func RegisterStudentsRoutes(mux *http.ServeMux, db *sql.DB, storage *services.StorageService) {
	h := &studentsHandler{
		db:      db,
		storage: storage,
	}

	registerLimiter := middleware.NewRateLimiter(5, time.Minute)

	createStudentHandler := http.HandlerFunc(h.handleCreateStudent)
	listStudentsHandler := http.HandlerFunc(h.handleListStudents)
	getStudentHandler := http.HandlerFunc(h.handleGetStudent)
	updateStudentHandler := http.HandlerFunc(h.handleUpdateStudent)
	deleteStudentHandler := http.HandlerFunc(h.handleDeleteStudent)
	loginStudentHandler := http.HandlerFunc(h.handleStudentLogin)
	getMyWorkoutsHandler := http.HandlerFunc(h.handleGetMyWorkouts)
	getMyWorkoutDetailsHandler := http.HandlerFunc(h.handleGetMyWorkoutDetails)
	getMyAnnouncementsHandler := http.HandlerFunc(h.handleGetMyAnnouncements)
	getMyProfileHandler := http.HandlerFunc(h.handleGetMyProfile)

	mux.Handle("POST /api/students", middleware.AuthMiddleware(createStudentHandler))
	mux.Handle("GET /api/students", middleware.AuthMiddleware(listStudentsHandler))
	mux.Handle("GET /api/students/{id}", middleware.AuthMiddleware(getStudentHandler))
	mux.Handle("PUT /api/students/{id}", middleware.AuthMiddleware(updateStudentHandler))
	mux.Handle("DELETE /api/students/{id}", middleware.AuthMiddleware(deleteStudentHandler))

	mux.Handle("POST /api/students/login", loginStudentHandler)

	mux.Handle("POST /api/public/students/register", registerLimiter.Limit(http.HandlerFunc(h.handlePublicSelfRegister)))

	mux.Handle("GET /api/students/me/workouts", middleware.AuthMiddleware(getMyWorkoutsHandler))
	mux.Handle("GET /api/students/me/workouts/{id}", middleware.AuthMiddleware(getMyWorkoutDetailsHandler))
	mux.Handle("GET /api/students/me/announcements", middleware.AuthMiddleware(getMyAnnouncementsHandler))
	mux.Handle("GET /api/students/me/profile", middleware.AuthMiddleware(getMyProfileHandler))

	mux.Handle("POST /api/students/terms", middleware.AuthMiddleware(http.HandlerFunc(h.handleAcceptTerms)))

	mux.Handle("PUT /api/students/me/password", middleware.AuthMiddleware(http.HandlerFunc(h.handleUpdatePassword)))
	mux.Handle("DELETE /api/students/me", middleware.AuthMiddleware(http.HandlerFunc(h.handleDeleteAccount)))
}

type studentsHandler struct {
	db      *sql.DB
	storage *services.StorageService
}

type CreateStudentRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	FileURL  string `json:"file_url"`
}

type SelfRegisterRequest struct {
	TrainerID string `json:"trainer_id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type StudentResponse struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	FileURL string `json:"file_url"`
}

type UpdateStudentRequest struct {
	Name    *string `json:"name"`
	Email   *string `json:"email"`
	FileURL *string `json:"file_url"`
}

type StudentProfileResponse struct {
	ID                  string     `json:"id"`
	Name                string     `json:"name"`
	Email               string     `json:"email"`
	FileURL             string     `json:"file_url"`
	TrainerID           string     `json:"trainer_id"`
	TrainerName         string     `json:"trainer_name"`
	BrandLogoURL        string     `json:"brand_logo_url"`
	BrandPrimaryColor   string     `json:"brand_primary_color"`
	BrandSecondaryColor string     `json:"brand_secondary_color"`
	PaymentPixKey       string     `json:"payment_pix_key"`
	PaymentLinkURL      string     `json:"payment_link_url"`
	PaymentInstructions string     `json:"payment_instructions"`
	TermsAcceptedAt     *time.Time `json:"terms_accepted_at,omitempty"`
}

func (h *studentsHandler) handleAcceptTerms(w http.ResponseWriter, r *http.Request) {
	studentID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "Erro de autenticação", http.StatusInternalServerError)
		return
	}

	query := `UPDATE students SET terms_accepted_at = NOW() WHERE id = $1`
	_, err := h.db.ExecContext(r.Context(), query, studentID)
	if err != nil {
		log.Printf("Erro ao aceitar termos (student): %v", err)
		http.Error(w, "Erro ao salvar aceite dos termos", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Termos aceitos com sucesso"))
}

func (h *studentsHandler) handlePublicSelfRegister(w http.ResponseWriter, r *http.Request) {
	var req SelfRegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "JSON Inválido", http.StatusBadRequest)
		return
	}

	var subscriptionStatus string
	err := h.db.QueryRowContext(r.Context(), "SELECT COALESCE(subscription_status, 'trial') FROM trainers WHERE id=$1", req.TrainerID).Scan(&subscriptionStatus)
	if err != nil {
		http.Error(w, "Treinador inválido", http.StatusBadRequest)
		return
	}

	if subscriptionStatus != "ACTIVE" && subscriptionStatus != "trial" {
		http.Error(w, "Este treinador não está aceitando novos alunos no momento (Conta Inativa).", http.StatusForbidden)
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 10)

	var newStudent StudentResponse
	query := `
        INSERT INTO students (name, email, password_hash, trainer_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, COALESCE(anamnesis_url, '')
    `
	err = h.db.QueryRowContext(r.Context(), query, req.Name, req.Email, string(hashedPassword), req.TrainerID).Scan(&newStudent.ID, &newStudent.Name, &newStudent.Email, &newStudent.FileURL)

	if err != nil {
		if strings.Contains(err.Error(), "violates unique constraint") {
			http.Error(w, "Este email já está cadastrado.", http.StatusConflict)
			return
		}
		log.Printf("Erro cadastro publico: %v", err)
		http.Error(w, "Erro ao criar conta", http.StatusInternalServerError)
		return
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": newStudent.ID,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})
	tokenString, _ := claims.SignedString([]byte(os.Getenv("JWT_SECRET")))

	var branding types.BrandingResponse
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
	err = h.db.QueryRowContext(r.Context(), brandingQuery, req.TrainerID).Scan(
		&branding.LogoURL, &branding.PrimaryColor, &branding.SecondaryColor,
		&branding.PaymentPixKey, &branding.PaymentLinkURL, &branding.PaymentInstructions,
	)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(types.LoginResponse{
		Token:    tokenString,
		Branding: branding,
	})
}

func (h *studentsHandler) handleGetMyProfile(w http.ResponseWriter, r *http.Request) {
	studentID := r.Context().Value(middleware.TrainerIDKey).(string)
	var profile StudentProfileResponse

	// CORREÇÃO CIRÚRGICA: Variável segura contra NULL do banco
	var termsAccepted sql.NullTime

	query := `
        SELECT 
            s.id, s.name, s.email, COALESCE(s.anamnesis_url, ''), 
            s.trainer_id, COALESCE(t.name, ''),
            COALESCE(t.brand_logo_url, ''), 
            COALESCE(t.brand_primary_color, '#3b82f6'), 
            COALESCE(t.brand_secondary_color, '#000000'),
            COALESCE(t.payment_pix_key, ''),
            COALESCE(t.payment_link_url, ''),
            COALESCE(t.payment_instructions, ''),
            s.terms_accepted_at
        FROM students s
        LEFT JOIN trainers t ON s.trainer_id = t.id
        WHERE s.id = $1
    `
	err := h.db.QueryRowContext(r.Context(), query, studentID).Scan(
		&profile.ID, &profile.Name, &profile.Email, &profile.FileURL,
		&profile.TrainerID, &profile.TrainerName,
		&profile.BrandLogoURL, &profile.BrandPrimaryColor, &profile.BrandSecondaryColor,
		&profile.PaymentPixKey, &profile.PaymentLinkURL, &profile.PaymentInstructions,
		&termsAccepted, // Scan blindado
	)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Perfil do aluno não encontrado", http.StatusNotFound)
			return
		}
		log.Printf("Erro ao buscar perfil do aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	// Transfere o valor apenas se for válido
	if termsAccepted.Valid {
		profile.TermsAcceptedAt = &termsAccepted.Time
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(profile)
}

func (h *studentsHandler) handleGetMyAnnouncements(w http.ResponseWriter, r *http.Request) {
	studentID := r.Context().Value(middleware.TrainerIDKey).(string)
	var trainerID string
	queryTrainer := `SELECT trainer_id FROM students WHERE id = $1`
	err := h.db.QueryRowContext(r.Context(), queryTrainer, studentID).Scan(&trainerID)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Aluno não encontrado", http.StatusNotFound)
			return
		}
		log.Printf("Erro ao buscar trainer_id do aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	type AnnouncementResponse struct {
		ID        string `json:"id"`
		Title     string `json:"title"`
		Content   string `json:"content"`
		CreatedAt string `json:"created_at"`
	}
	queryAnnouncements := `
        SELECT id, title, content, created_at 
        FROM announcements 
        WHERE trainer_id = $1 
        ORDER BY created_at DESC
    `
	rows, err := h.db.QueryContext(r.Context(), queryAnnouncements, trainerID)
	if err != nil {
		log.Printf("Erro ao listar avisos para o aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var announcements []AnnouncementResponse
	for rows.Next() {
		var a AnnouncementResponse
		if err := rows.Scan(&a.ID, &a.Title, &a.Content, &a.CreatedAt); err != nil {
			log.Printf("Erro ao escanear aviso para o aluno: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}
		announcements = append(announcements, a)
	}
	if announcements == nil {
		announcements = []AnnouncementResponse{}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(announcements)
}

func (h *studentsHandler) handleGetMyWorkoutDetails(w http.ResponseWriter, r *http.Request) {
	studentID := r.Context().Value(middleware.TrainerIDKey).(string)
	workoutID := r.PathValue("id")
	var workout types.WorkoutResponse

	queryWorkout := `SELECT id, student_id, name, description, is_active FROM workouts WHERE id = $1 AND student_id = $2`
	err := h.db.QueryRowContext(r.Context(), queryWorkout, workoutID, studentID).Scan(&workout.ID, &workout.StudentID, &workout.Name, &workout.Description, &workout.IsActive)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Treino não encontrado ou não pertence a este aluno", http.StatusNotFound)
			return
		}
		log.Printf("Erro ao buscar detalhes do treino do aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}

	queryExercises := `
        SELECT we.id, we.exercise_id, e.name, 
               COALESCE(NULLIF(we.video_url, ''), COALESCE(e.video_url, '')), 
               we.sets, we.reps, we.rest_period_seconds,
               we."order", we.notes, we.execution_details
        FROM workout_exercises we
        JOIN exercises e ON we.exercise_id = e.id
        WHERE we.workout_id = $1 ORDER BY we."order" ASC
    `
	rows, err := h.db.QueryContext(r.Context(), queryExercises, workoutID)
	if err != nil {
		log.Printf("Erro ao buscar exercícios do treino para o aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var exercises []types.WorkoutExerciseResponse
	for rows.Next() {
		var ex types.WorkoutExerciseResponse
		if err := rows.Scan(&ex.ID, &ex.ExerciseID, &ex.ExerciseName, &ex.VideoURL, &ex.Sets, &ex.Reps, &ex.RestPeriodSeconds, &ex.Order, &ex.Notes, &ex.ExecutionDetails); err != nil {
			log.Printf("Erro ao escanear exercício do treino para o aluno: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}

		if ex.VideoURL != "" && !strings.HasPrefix(ex.VideoURL, "http") && h.storage != nil {
			signedURL, err := h.storage.GetSignedURL(ex.VideoURL)
			if err == nil {
				ex.VideoURL = signedURL
			} else {
				log.Printf("Erro ao assinar URL para aluno (ex: %s): %v", ex.ExerciseName, err)
			}
		}

		exercises = append(exercises, ex)
	}
	if exercises == nil {
		exercises = []types.WorkoutExerciseResponse{}
	}
	response := map[string]interface{}{
		"workout":   workout,
		"exercises": exercises,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *studentsHandler) handleGetMyWorkouts(w http.ResponseWriter, r *http.Request) {
	studentID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "ID do aluno não encontrado no contexto", http.StatusInternalServerError)
		return
	}
	query := `SELECT id, student_id, name, description, is_active FROM workouts WHERE student_id = $1 AND is_active = true ORDER BY created_at DESC`
	rows, err := h.db.QueryContext(r.Context(), query, studentID)
	if err != nil {
		log.Printf("Erro ao buscar treinos do aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var workouts []types.WorkoutResponse
	for rows.Next() {
		var workout types.WorkoutResponse
		if err := rows.Scan(&workout.ID, &workout.StudentID, &workout.Name, &workout.Description, &workout.IsActive); err != nil {
			log.Printf("Erro ao escanear linha de treino: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}
		workouts = append(workouts, workout)
	}
	if err = rows.Err(); err != nil {
		log.Printf("Erro após iteração de treinos do aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	if workouts == nil {
		workouts = []types.WorkoutResponse{}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(workouts)
}

func (h *studentsHandler) handleStudentLogin(w http.ResponseWriter, r *http.Request) {
	var req types.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}
	var studentID, trainerID, hashedPassword string
	query := `SELECT id, trainer_id, password_hash FROM students WHERE email = $1`
	err := h.db.QueryRowContext(r.Context(), query, req.Email).Scan(&studentID, &trainerID, &hashedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Email ou senha inválidos", http.StatusUnauthorized)
			return
		}
		log.Printf("Erro ao buscar aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(req.Password))
	if err != nil {
		http.Error(w, "Email ou senha inválidos", http.StatusUnauthorized)
		return
	}

	var branding types.BrandingResponse
	brandingQuery := `SELECT COALESCE(brand_logo_url, ''), COALESCE(brand_primary_color, '#3b82f6'), COALESCE(brand_secondary_color, '#000000'), COALESCE(payment_pix_key, ''), COALESCE(payment_link_url, ''), COALESCE(payment_instructions, '') FROM trainers WHERE id = $1`
	err = h.db.QueryRowContext(r.Context(), brandingQuery, trainerID).Scan(&branding.LogoURL, &branding.PrimaryColor, &branding.SecondaryColor, &branding.PaymentPixKey, &branding.PaymentLinkURL, &branding.PaymentInstructions)
	if err != nil {
		log.Printf("Aviso: não foi possível buscar branding para o trainer ID %s: %v", trainerID, err)
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": studentID,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})
	jwtSecret := os.Getenv("JWT_SECRET")
	tokenString, err := claims.SignedString([]byte(jwtSecret))
	if err != nil {
		log.Printf("Erro ao gerar token JWT para aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	response := types.LoginResponse{
		Token:    tokenString,
		Branding: branding,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func (h *studentsHandler) handleGetStudent(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	studentID := r.PathValue("id")
	var student StudentResponse
	query := `SELECT id, name, email, COALESCE(anamnesis_url, '') FROM students WHERE id = $1 AND trainer_id = $2`
	err := h.db.QueryRowContext(r.Context(), query, studentID, trainerID).Scan(&student.ID, &student.Name, &student.Email, &student.FileURL)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Aluno não encontrado ou não pertence a este trainer", http.StatusNotFound)
			return
		}
		log.Printf("Erro ao buscar aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(student)
}

func (h *studentsHandler) handleUpdateStudent(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	studentID := r.PathValue("id")
	var req UpdateStudentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}
	query := `UPDATE students SET name = COALESCE($1, name), email = COALESCE($2, email), anamnesis_url = COALESCE($3, anamnesis_url) WHERE id = $4 AND trainer_id = $5`
	result, err := h.db.ExecContext(r.Context(), query, req.Name, req.Email, req.FileURL, studentID, trainerID)
	if err != nil {
		log.Printf("Erro ao atualizar aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Aluno não encontrado ou não pertence a este trainer", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Aluno atualizado com sucesso"))
}

func (h *studentsHandler) handleDeleteStudent(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	studentID := r.PathValue("id")
	query := `DELETE FROM students WHERE id = $1 AND trainer_id = $2`
	result, err := h.db.ExecContext(r.Context(), query, studentID, trainerID)
	if err != nil {
		log.Printf("Erro ao deletar aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Aluno não encontrado ou não pertence a este trainer", http.StatusNotFound)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *studentsHandler) handleListStudents(w http.ResponseWriter, r *http.Request) {
	trainerID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "ID do trainer não encontrado no contexto", http.StatusInternalServerError)
		return
	}
	query := `SELECT id, name, email, COALESCE(anamnesis_url, '') FROM students WHERE trainer_id = $1 ORDER BY name ASC`
	rows, err := h.db.QueryContext(r.Context(), query, trainerID)
	if err != nil {
		log.Printf("Erro ao buscar alunos: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	var students []StudentResponse
	for rows.Next() {
		var student StudentResponse
		if err := rows.Scan(&student.ID, &student.Name, &student.Email, &student.FileURL); err != nil {
			log.Printf("Erro ao escanear linha de aluno: %v", err)
			http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
			return
		}
		students = append(students, student)
	}
	if err = rows.Err(); err != nil {
		log.Printf("Erro após iteração de alunos: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	if students == nil {
		students = []StudentResponse{}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(students)
}

func (h *studentsHandler) handleCreateStudent(w http.ResponseWriter, r *http.Request) {
	trainerID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "ID do trainer não encontrado no contexto", http.StatusInternalServerError)
		return
	}
	var req CreateStudentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		log.Printf("Erro ao hashear a senha do aluno: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	var newStudent StudentResponse
	query := `
        INSERT INTO students (name, email, password_hash, trainer_id, anamnesis_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, COALESCE(anamnesis_url, '')
    `
	err = h.db.QueryRowContext(r.Context(), query, req.Name, req.Email, string(hashedPassword), trainerID, req.FileURL).Scan(&newStudent.ID, &newStudent.Name, &newStudent.Email, &newStudent.FileURL)
	if err != nil {
		if strings.Contains(err.Error(), "violates unique constraint") {
			http.Error(w, "O email fornecido já está em uso.", http.StatusConflict)
			return
		}
		log.Printf("Erro ao inserir aluno no banco de dados: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	log.Printf("Novo aluno '%s' criado para o trainer ID %s", newStudent.Name, trainerID)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newStudent)
}

func (h *studentsHandler) handleUpdatePassword(w http.ResponseWriter, r *http.Request) {
	studentID := r.Context().Value(middleware.TrainerIDKey).(string)
	var req UpdatePasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "JSON Inválido", http.StatusBadRequest)
		return
	}

	var currentHash string
	err := h.db.QueryRowContext(r.Context(), "SELECT password_hash FROM students WHERE id=$1", studentID).Scan(&currentHash)
	if err != nil {
		http.Error(w, "Aluno não encontrado", http.StatusNotFound)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(currentHash), []byte(req.OldPassword))
	if err != nil {
		http.Error(w, "A senha atual está incorreta.", http.StatusUnauthorized)
		return
	}

	newHash, _ := bcrypt.GenerateFromPassword([]byte(req.NewPassword), 10)

	_, err = h.db.ExecContext(r.Context(), "UPDATE students SET password_hash=$1 WHERE id=$2", string(newHash), studentID)
	if err != nil {
		http.Error(w, "Erro ao atualizar senha", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Senha alterada com sucesso!"))
}

func (h *studentsHandler) handleDeleteAccount(w http.ResponseWriter, r *http.Request) {
	studentID := r.Context().Value(middleware.TrainerIDKey).(string)

	_, err := h.db.ExecContext(r.Context(), "DELETE FROM students WHERE id=$1", studentID)
	if err != nil {
		log.Printf("Erro ao deletar conta aluno: %v", err)
		http.Error(w, "Erro ao excluir conta", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Sua conta de aluno foi excluída."))
}
