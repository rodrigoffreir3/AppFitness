// internal/middleware/auth_middleware.go
package middleware

import (
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type trainerIDKey string

const TrainerIDKey trainerIDKey = "trainerID"

// AuthMiddleware (MODIFICADO)
// Agora verifica o token no query param "token" (para WebSockets)
// ou no header "Authorization" (para REST).
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// --- INÍCIO DA MODIFICAÇÃO ---
		var tokenString string

		// 1. Tentar obter o token do query parameter (para WebSockets)
		tokenString = r.URL.Query().Get("token")

		// 2. Se não estiver no query param, tentar obter do header (para REST)
		if tokenString == "" {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "Cabeçalho de autorização ausente", http.StatusUnauthorized)
				return
			}

			headerParts := strings.Split(authHeader, " ")
			if len(headerParts) != 2 || headerParts[0] != "Bearer" {
				http.Error(w, "Cabeçalho de autorização inválido", http.StatusUnauthorized)
				return
			}
			tokenString = headerParts[1]
		}
		// --- FIM DA MODIFICAÇÃO ---

		// 3. Validar o token (lógica existente)
		jwtSecret := os.Getenv("JWT_SECRET")
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtSecret), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Token inválido", http.StatusUnauthorized)
			return
		}

		// 4. Extrair o ID (lógica existente)
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Token inválido", http.StatusUnauthorized)
			return
		}

		trainerID, ok := claims["sub"].(string) // "sub" é o ID (seja trainer ou student)
		if !ok {
			http.Error(w, "Token inválido", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), TrainerIDKey, trainerID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
