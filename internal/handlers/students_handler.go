// internal/handlers/students_handler.go
package handlers

import (
	"appfitness/internal/middleware"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func RegisterStudentsRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &studentsHandler{
		db: db,
	}

	createStudentHandler := http.HandlerFunc(h.handleCreateStudent)
	listStudentsHandler := http.HandlerFunc(h.handleListStudents)
	getStudentHandler := http.HandlerFunc(h.handleGetStudent)       // MODIFICAÇÃO
	updateStudentHandler := http.HandlerFunc(h.handleUpdateStudent) // MODIFICAÇÃO
	deleteStudentHandler := http.HandlerFunc(h.handleDeleteStudent) // MODIFICAÇÃO

	mux.Handle("POST /api/students", middleware.AuthMiddleware(createStudentHandler))
	mux.Handle("GET /api/students", middleware.AuthMiddleware(listStudentsHandler))

	// MODIFICAÇÃO: Novas rotas para um aluno específico, usando o ID na URL.
	mux.Handle("GET /api/students/{id}", middleware.AuthMiddleware(getStudentHandler))
	mux.Handle("PUT /api/students/{id}", middleware.AuthMiddleware(updateStudentHandler))
	mux.Handle("DELETE /api/students/{id}", middleware.AuthMiddleware(deleteStudentHandler))
}

type studentsHandler struct {
	db *sql.DB
}

// --- Estruturas de Requisição/Resposta ---
type CreateStudentRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
type StudentResponse struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// MODIFICAÇÃO: Nova struct para a requisição de atualização de aluno.
type UpdateStudentRequest struct {
	Name  *string `json:"name"`
	Email *string `json:"email"`
}

// --- Handlers ---
// MODIFICAÇÃO: Nova função para buscar um aluno específico.
func (h *studentsHandler) handleGetStudent(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	studentID := r.PathValue("id") // Pega o {id} da URL

	var student StudentResponse
	query := `SELECT id, name, email FROM students WHERE id = $1 AND trainer_id = $2`
	err := h.db.QueryRowContext(r.Context(), query, studentID, trainerID).Scan(&student.ID, &student.Name, &student.Email)
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

// MODIFICAÇÃO: Nova função para atualizar um aluno.
func (h *studentsHandler) handleUpdateStudent(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)
	studentID := r.PathValue("id")

	var req UpdateStudentRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	// Aqui poderíamos adicionar uma lógica mais complexa para updates parciais, mas por simplicidade vamos atualizar tudo.
	query := `UPDATE students SET name = $1, email = $2 WHERE id = $3 AND trainer_id = $4`
	result, err := h.db.ExecContext(r.Context(), query, req.Name, req.Email, studentID, trainerID)
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

// MODIFICAÇÃO: Nova função para deletar um aluno.
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

	w.WriteHeader(http.StatusNoContent) // 204 No Content é a resposta padrão para um DELETE bem-sucedido.
}

// As funções handleListStudents e handleCreateStudent permanecem as mesmas
func (h *studentsHandler) handleListStudents(w http.ResponseWriter, r *http.Request) {
	trainerID, ok := r.Context().Value(middleware.TrainerIDKey).(string)
	if !ok {
		http.Error(w, "ID do trainer não encontrado no contexto", http.StatusInternalServerError)
		return
	}
	query := `SELECT id, name, email FROM students WHERE trainer_id = $1 ORDER BY name ASC`
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
		if err := rows.Scan(&student.ID, &student.Name, &student.Email); err != nil {
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
		INSERT INTO students (name, email, password_hash, trainer_id)
		VALUES ($1, $2, $3, $4)
		RETURNING id, name, email
	`
	err = h.db.QueryRowContext(r.Context(), query, req.Name, req.Email, string(hashedPassword), trainerID).Scan(&newStudent.ID, &newStudent.Name, &newStudent.Email)
	if err != nil {
		log.Printf("Erro ao inserir aluno no banco de dados: %v", err)
		http.Error(w, "Erro interno do servidor", http.StatusInternalServerError)
		return
	}
	log.Printf("Novo aluno '%s' criado para o trainer ID %s", newStudent.Name, trainerID)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newStudent)
}
