// cmd/api/main.go
package main

import (
	"appfitness/internal/chat" // <-- IMPORTAMOS O PACOTE DE CHAT
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

	// --- Lógica do Chat ---
	// 1. Criamos uma nova instância do nosso Hub de chat.
	hub := chat.NewHub(db)
	// 2. Iniciamos o Hub numa goroutine separada.
	//    Ele vai correr em segundo plano para sempre, a gerir os clientes e as mensagens.
	go hub.Run()

	port := "8080"
	mux := http.NewServeMux()

	// --- Registo das Rotas ---
	handlers.RegisterTrainersRoutes(mux, db)
	handlers.RegisterStudentsRoutes(mux, db)
	handlers.RegisterWorkoutsRoutes(mux, db)
	handlers.RegisterWorkoutExercisesRoutes(mux, db)
	// 3. Registamos as rotas de chat, passando o nosso hub para o handler.
	handlers.RegisterChatRoutes(mux, hub)

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API do App Fitness está no ar!"))
	})

	log.Printf("Servidor iniciado na porta %s", port)
	err = http.ListenAndServe(":"+port, mux)
	if err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
