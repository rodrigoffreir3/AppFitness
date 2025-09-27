// cmd/api/main.go
package main

import (
	"appfitness/internal/database"
	"appfitness/internal/handlers"
	"log"
	"net/http"
)

func main() {
	db, err := database.Connect()
	if err != nil {
		log.Fatalf("Não foi possível conectar ao banco de dados: %v", err)
	}
	defer db.Close()
	log.Println("Conexão com o banco de dados estabelecida com sucesso!")

	port := "8080"
	mux := http.NewServeMux()

	// Registramos as rotas de trainers, passando o mux e a conexão com o banco.
	handlers.RegisterTrainersRoutes(mux, db)

	// Registra as novas rotas de alunos
	handlers.RegisterStudentsRoutes(mux, db)

	// Registra as novas rotas de treinos.
	handlers.RegisterWorkoutsRoutes(mux, db)

	// Registra as rotas para os exercícios do treino
	handlers.RegisterWorkoutExercisesRoutes(mux, db)

	// Podemos manter uma rota raiz para verificar se a API está no ar.
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API do App Fitness está no ar!"))
	})

	log.Printf("Servidor iniciado na porta %s", port)
	err = http.ListenAndServe(":"+port, mux)
	if err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
