// internal/middleware/auth_middleware.go
package middleware

import (
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

// trainerIDKey é um tipo customizado para evitar colisões de chaves no contexto.
type trainerIDKey string

// TrainerIDKey é a chave que usaremos para armazenar o ID do trainer no contexto da requisição.
const TrainerIDKey trainerIDKey = "trainerID"

// AuthMiddleware verifica o token JWT e, se for válido, adiciona o ID do trainer ao contexto da requisição.
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 1. Pegar o header de autorização
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Cabeçalho de autorização ausente", http.StatusUnauthorized)
			return
		}

		// 2. O header deve estar no formato "Bearer <token>"
		headerParts := strings.Split(authHeader, " ")
		if len(headerParts) != 2 || headerParts[0] != "Bearer" {
			http.Error(w, "Cabeçalho de autorização inválido", http.StatusUnauthorized)
			return
		}
		tokenString := headerParts[1]

		// 3. Validar o token
		jwtSecret := os.Getenv("JWT_SECRET")
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtSecret), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Token inválido", http.StatusUnauthorized)
			return
		}

		// 4. Extrair o ID do trainer (o "sub" claim) e adicionar ao contexto
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Token inválido", http.StatusUnauthorized)
			return
		}

		trainerID, ok := claims["sub"].(string)
		if !ok {
			http.Error(w, "Token inválido", http.StatusUnauthorized)
			return
		}

		// Adicionamos o ID do trainer ao contexto da requisição
		ctx := context.WithValue(r.Context(), TrainerIDKey, trainerID)

		// Chamamos o próximo handler na cadeia, passando o novo contexto
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
