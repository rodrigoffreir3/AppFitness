// cmd/api/main.go
package main

import (
	"appfitness/internal/chat"
	"appfitness/internal/database"
	"appfitness/internal/handlers"
	"log"
	"net/http"

	"github.com/rs/cors" // <-- Importa o pacote de CORS
)

func main() {
	db, err := database.Connect()
	if err != nil {
		log.Fatalf("Não foi possível conectar ao banco de dados: %v", err)
	}
	defer db.Close()
	log.Println("Conexão com o banco de dados estabelecida com sucesso!")

	hub := chat.NewHub(db)
	go hub.Run()

	port := "8080"
	mux := http.NewServeMux()

	handlers.RegisterTrainersRoutes(mux, db)
	handlers.RegisterStudentsRoutes(mux, db)
	handlers.RegisterWorkoutsRoutes(mux, db)
	handlers.RegisterWorkoutExercisesRoutes(mux, db)
	handlers.RegisterChatRoutes(mux, hub)
	handlers.RegisterAnnouncementsRoutes(mux, db)

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API do App Fitness está no ar!"))
	})

	// --- CONFIGURAÇÃO DO CORS ---
	// Permite que o nosso frontend em localhost:5173 se comunique com a API.
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})
	handler := c.Handler(mux) // "Embrulha" o nosso router com o middleware de CORS.

	log.Printf("Servidor iniciado na porta %s", port)
	// Usamos o 'handler' com CORS em vez do 'mux' diretamente.
	err = http.ListenAndServe(":"+port, handler)
	if err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
