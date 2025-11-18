// cmd/api/main.go
package main

import (
	"appfitness/internal/chat"
	"appfitness/internal/database"
	"appfitness/internal/handlers"
	"log"
	"net/http"
	"os" // Importa o pacote os

	"github.com/joho/godotenv" // Importa o godotenv
	"github.com/rs/cors"
)

func main() {
	// Carrega as variáveis de ambiente do arquivo .env, sobrescrevendo as existentes
	err := godotenv.Overload()
	if err != nil {
		// Não é um erro fatal, podemos continuar se as variáveis estiverem no sistema
		log.Println("Aviso: Não foi possível carregar o arquivo .env. Usando variáveis de ambiente do sistema.")
	}

	// DEBUG: Imprime o valor de DB_HOST
	log.Printf("DEBUG: DB_HOST is set to: %s", os.Getenv("DB_HOST"))

	db, err := database.Connect()
	if err != nil {
		log.Fatalf("Não foi possível conectar ao banco de dados: %v", err)
	}
	defer db.Close()
	log.Println("Conexão com o banco de dados estabelecida com sucesso!")

	hub := chat.NewHub(db) // O Hub ainda precisa do db para salvar mensagens
	go hub.Run()

	port := "8080"
	mux := http.NewServeMux()

	handlers.RegisterTrainersRoutes(mux, db)
	handlers.RegisterStudentsRoutes(mux, db)
	handlers.RegisterWorkoutsRoutes(mux, db)
	handlers.RegisterWorkoutExercisesRoutes(mux, db)

	// --- CORREÇÃO AQUI ---
	// Agora passamos o 'hub' e o 'db'
	handlers.RegisterChatRoutes(mux, hub, db)
	// --- FIM DA CORREÇÃO ---

	handlers.RegisterAnnouncementsRoutes(mux, db)
	handlers.RegisterExercisesRoutes(mux, db)

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API do App Fitness está no ar!"))
	})

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})
	handler := c.Handler(mux)

	log.Printf("Servidor iniciado na porta %s", port)
	err = http.ListenAndServe(":"+port, handler)
	if err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
