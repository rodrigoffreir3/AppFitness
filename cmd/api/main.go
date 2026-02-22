// cmd/api/main.go
package main

import (
	"appfitness/internal/chat"
	"appfitness/internal/database"
	"appfitness/internal/handlers"
	"appfitness/internal/services"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"
)

func main() {
	// 1. Conectar ao Banco de Dados (Docker já injetou o .env na memória)
	db, err := database.Connect()
	if err != nil {
		log.Fatalf("Erro fatal ao conectar ao banco de dados: %v", err)
	}
	defer db.Close()
	log.Println("Conexão com o banco de dados estabelecida com sucesso!")

	// 2. Inicializar Storage (Cloudflare R2)
	storageService := services.NewStorageService()
	if storageService != nil {
		log.Println("Serviço de Storage R2 inicializado com sucesso.")
	} else {
		log.Println("AVISO: Serviço de Storage R2 não foi inicializado (verifique logs anteriores).")
	}

	// 3. Inicializar Chat Hub
	hub := chat.NewHub(db)
	go hub.Run()

	// 4. Configurar Rotas
	mux := http.NewServeMux()

	// --- Rotas Padrão ---
	handlers.RegisterTrainersRoutes(mux, db)
	handlers.RegisterStudentsRoutes(mux, db, storageService)
	handlers.RegisterWorkoutsRoutes(mux, db)
	handlers.RegisterAnnouncementsRoutes(mux, db)
	handlers.RegisterDietsRoutes(mux, db)
	handlers.RegisterSubscriptionRoutes(mux, db)
	handlers.RegisterWebhookRoutes(mux, db)
	handlers.RegisterAuthRoutes(mux, db)

	// --- Rotas do God Mode (Super Admin) ---
	handlers.RegisterAdminRoutes(mux, db)

	// --- Rotas de Exercícios ---
	handlers.RegisterWorkoutExercisesRoutes(mux, db, storageService)
	handlers.RegisterExercisesRoutes(mux, db, storageService)

	// --- Chat e Upload ---
	handlers.RegisterChatRoutes(mux, hub, db)
	mux.HandleFunc("POST /api/upload", handlers.HandleUpload)

	// --- Arquivos Estáticos ---
	fs := http.FileServer(http.Dir("./uploads"))
	mux.Handle("GET /uploads/", http.StripPrefix("/uploads/", fs))

	// Health Check
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API Metsuke Fitness Online! 🚀"))
	})

	// 5. Configurar CORS (DOMÍNIOS ATUALIZADOS PARA A VPS)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173",
			"https://metsuke.app.br",
			"https://www.metsuke.app.br",
		},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"Authorization", "Content-Type", "X-Requested-With"},
		AllowCredentials: true,
	})
	handler := c.Handler(mux)

	// 6. Iniciar Servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Servidor iniciado na porta %s", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
