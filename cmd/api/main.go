package main

import (
	"appfitness/internal/chat"
	"appfitness/internal/database"
	"appfitness/internal/handlers"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Carrega as variáveis de ambiente
	err := godotenv.Overload()
	if err != nil {
		log.Println("Aviso: Não foi possível carregar o arquivo .env. Usando variáveis de ambiente do sistema.")
	}

	log.Printf("DEBUG: DB_HOST is set to: %s", os.Getenv("DB_HOST"))

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

	// Registro de Rotas Existentes
	handlers.RegisterTrainersRoutes(mux, db)
	handlers.RegisterStudentsRoutes(mux, db)
	handlers.RegisterWorkoutsRoutes(mux, db)
	handlers.RegisterWorkoutExercisesRoutes(mux, db)
	handlers.RegisterChatRoutes(mux, hub, db)
	handlers.RegisterAnnouncementsRoutes(mux, db)
	handlers.RegisterExercisesRoutes(mux, db)
	handlers.RegisterDietsRoutes(mux, db)
	handlers.RegisterSubscriptionRoutes(mux, db)
	handlers.RegisterWebhookRoutes(mux, db)

	// --- NOVO: Rota de Upload ---
	// CORREÇÃO: Adicionado "POST " explicitamente para evitar conflitos
	mux.HandleFunc("POST /api/upload", handlers.HandleUpload)

	// --- NOVO: Servidor de Arquivos Estáticos ---
	// Permite acessar http://localhost:8080/uploads/arquivo.pdf
	fs := http.FileServer(http.Dir("./uploads"))

	// CORREÇÃO: Adicionado "GET " explicitamente.
	// O StripPrefix remove "/uploads/" da URL antes de procurar na pasta
	mux.Handle("GET /uploads/", http.StripPrefix("/uploads/", fs))

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
