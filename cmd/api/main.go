package main

import (
	"appfitness/internal/chat"
	"appfitness/internal/database"
	"appfitness/internal/handlers"
	"appfitness/internal/services" // <--- 1. Importar services
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

	// --- 2. INICIALIZA O STORAGE (R2) ---
	storageService := services.NewStorageService(
		os.Getenv("R2_ACCOUNT_ID"),
		os.Getenv("R2_ACCESS_KEY"),
		os.Getenv("R2_SECRET_KEY"),
		os.Getenv("R2_BUCKET_NAME"),
		os.Getenv("R2_PUBLIC_DOMAIN"),
	)
	log.Println("Serviço de Storage R2 inicializado.")

	hub := chat.NewHub(db)
	go hub.Run()

	port := "8080"
	mux := http.NewServeMux()

	// Registro de Rotas Existentes
	handlers.RegisterTrainersRoutes(mux, db)
	handlers.RegisterStudentsRoutes(mux, db)
	handlers.RegisterWorkoutsRoutes(mux, db)

	// --- 3. INJETAR O STORAGE NAS ROTAS DE EXERCÍCIOS ---
	// Estas duas rotas agora precisam do storageService para assinar os vídeos
	handlers.RegisterWorkoutExercisesRoutes(mux, db, storageService)
	handlers.RegisterExercisesRoutes(mux, db, storageService)

	handlers.RegisterChatRoutes(mux, hub, db)
	handlers.RegisterAnnouncementsRoutes(mux, db)
	// handlers.RegisterExercisesRoutes removido daqui pois foi chamado acima
	handlers.RegisterDietsRoutes(mux, db)
	handlers.RegisterSubscriptionRoutes(mux, db)
	handlers.RegisterWebhookRoutes(mux, db)
	handlers.RegisterAuthRoutes(mux, db)

	// --- Rota de Upload ---
	mux.HandleFunc("POST /api/upload", handlers.HandleUpload)

	// --- Servidor de Arquivos Estáticos ---
	fs := http.FileServer(http.Dir("./uploads"))
	mux.Handle("GET /uploads/", http.StripPrefix("/uploads/", fs))

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("API do App Fitness está no ar!"))
	})

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "https://metsuke.com", "https://www.metsuke.com"}, // Adicionei prod por precaução
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
