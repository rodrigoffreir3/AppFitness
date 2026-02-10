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

	// 3. Inicializar Storage (Cloudflare R2) - CORRIGIDO
	// Agora chamamos sem argumentos, pois ele lê as variáveis de ambiente sozinho (Truque do Mestre)
	storageService := services.NewStorageService()

	if storageService != nil {
		log.Println("Serviço de Storage R2 inicializado com sucesso.")
	} else {
		log.Println("AVISO: Serviço de Storage R2 não foi inicializado (verifique logs anteriores).")
	}

	// 4. Inicializar Chat Hub
	hub := chat.NewHub(db)
	go hub.Run()

	// 5. Configurar Rotas
	mux := http.NewServeMux()

	// --- Rotas Padrão ---
	handlers.RegisterTrainersRoutes(mux, db)
	handlers.RegisterStudentsRoutes(mux, db)
	handlers.RegisterWorkoutsRoutes(mux, db)
	handlers.RegisterAnnouncementsRoutes(mux, db)
	handlers.RegisterDietsRoutes(mux, db)
	handlers.RegisterSubscriptionRoutes(mux, db)
	handlers.RegisterWebhookRoutes(mux, db)
	handlers.RegisterAuthRoutes(mux, db)

	// --- Rotas de Exercícios (COM STORAGE) ---
	// Agora passando o storageService corretamente para assinar os vídeos
	handlers.RegisterWorkoutExercisesRoutes(mux, db, storageService)
	handlers.RegisterExercisesRoutes(mux, db, storageService)

	// --- Chat e Upload ---
	handlers.RegisterChatRoutes(mux, hub, db)
	mux.HandleFunc("POST /api/upload", handlers.HandleUpload)

	// --- Arquivos Estáticos ---
	fs := http.FileServer(http.Dir("./uploads"))
	mux.Handle("GET /uploads/", http.StripPrefix("/uploads/", fs))

	// Health Check simples
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API Metsuke Fitness Online! 🚀"))
	})

	// 6. Configurar CORS (Sua porta 5173 está aqui!)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173", // <--- SEU FRONTEND LOCAL
			"https://metsuke.com",   // Produção
			"https://www.metsuke.com",
			"https://app.metsuke.com.br",
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
