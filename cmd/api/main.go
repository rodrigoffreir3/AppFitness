package main

import (
	"appfitness/internal/chat"
	"appfitness/internal/database"
	"appfitness/internal/handlers"
	"appfitness/internal/services" // Importação necessária para o Storage
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// 1. Carregar variáveis de ambiente
	// Overload garante que o .env local tenha prioridade, útil em dev
	if err := godotenv.Overload(); err != nil {
		log.Println("Aviso: .env não encontrado, usando variáveis de ambiente do sistema")
	}

	// 2. Conectar ao Banco de Dados
	db, err := database.Connect()
	if err != nil {
		log.Fatalf("Erro fatal ao conectar ao banco de dados: %v", err)
	}
	defer db.Close()
	log.Println("Conexão com o banco de dados estabelecida com sucesso!")

	// 3. Inicializar Storage (Cloudflare R2) - NOVO
	// Passamos as variáveis explicitamente para garantir a leitura correta
	storageService := services.NewStorageService(
		os.Getenv("R2_ACCOUNT_ID"),
		os.Getenv("R2_ACCESS_KEY"),
		os.Getenv("R2_SECRET_KEY"),
		os.Getenv("R2_BUCKET_NAME"),
		os.Getenv("R2_PUBLIC_DOMAIN"),
	)
	log.Println("Serviço de Storage R2 inicializado.")

	// 4. Inicializar Chat Hub
	hub := chat.NewHub(db)
	go hub.Run()

	// 5. Configurar Rotas
	mux := http.NewServeMux()

	// --- Rotas Padrão (Mantidas como estavam) ---
	// Estes handlers instanciam seus próprios serviços (Asaas, Email) internamente
	handlers.RegisterTrainersRoutes(mux, db)
	handlers.RegisterStudentsRoutes(mux, db)
	handlers.RegisterWorkoutsRoutes(mux, db) // Alteramos o handler, mas não a injeção dele
	handlers.RegisterAnnouncementsRoutes(mux, db)
	handlers.RegisterDietsRoutes(mux, db)
	handlers.RegisterSubscriptionRoutes(mux, db)
	handlers.RegisterWebhookRoutes(mux, db)
	handlers.RegisterAuthRoutes(mux, db)

	// --- Rotas de Exercícios (MODIFICADAS) ---
	// Estas duas agora exigem o storageService para assinar os vídeos
	handlers.RegisterWorkoutExercisesRoutes(mux, db, storageService)
	handlers.RegisterExercisesRoutes(mux, db, storageService)

	// --- Chat e Upload ---
	handlers.RegisterChatRoutes(mux, hub, db)
	// Mantendo o padrão do seu repo para upload simples
	mux.HandleFunc("POST /api/upload", handlers.HandleUpload)

	// --- Arquivos Estáticos ---
	fs := http.FileServer(http.Dir("./uploads"))
	mux.Handle("GET /uploads/", http.StripPrefix("/uploads/", fs))

	// Health Check simples
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API Metsuke Fitness Online! 🚀"))
	})

	// 6. Configurar CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173",      // Dev Local
			"https://metsuke.com",        // Produção
			"https://www.metsuke.com",    // Produção
			"https://app.metsuke.com.br", // Variação comum
		},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"Authorization", "Content-Type", "X-Requested-With"},
		AllowCredentials: true,
	})
	handler := c.Handler(mux)

	// 7. Iniciar Servidor
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Servidor iniciado na porta %s", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
