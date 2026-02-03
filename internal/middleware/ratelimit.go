package middleware

import (
	"net/http"
	"strings"
	"sync"
	"time"
)

// Estrutura do Rate Limiter
type RateLimiter struct {
	mu       sync.Mutex
	visitors map[string][]time.Time
	limit    int
	window   time.Duration
}

// Cria um novo limitador
func NewRateLimiter(limit int, window time.Duration) *RateLimiter {
	rl := &RateLimiter{
		visitors: make(map[string][]time.Time),
		limit:    limit,
		window:   window,
	}

	// Limpeza automática de memória a cada minuto
	go func() {
		for {
			time.Sleep(time.Minute)
			rl.mu.Lock()
			for ip, stamps := range rl.visitors {
				// Remove registros antigos
				var valid []time.Time
				now := time.Now()
				for _, t := range stamps {
					if now.Sub(t) < window {
						valid = append(valid, t)
					}
				}
				if len(valid) == 0 {
					delete(rl.visitors, ip)
				} else {
					rl.visitors[ip] = valid
				}
			}
			rl.mu.Unlock()
		}
	}()

	return rl
}

// O Middleware em si
func (rl *RateLimiter) Limit(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Tenta pegar o IP real (atrás do Caddy/Cloudflare)
		ip := r.Header.Get("X-Forwarded-For")
		if ip == "" {
			ip = r.RemoteAddr
		}
		// Se tiver múltiplos IPs (proxy chain), pega o primeiro
		if strings.Contains(ip, ",") {
			ip = strings.Split(ip, ",")[0]
		}

		rl.mu.Lock()
		defer rl.mu.Unlock()

		now := time.Now()
		timestamps := rl.visitors[ip]

		// Filtra apenas requisições dentro da janela de tempo atual
		var valid []time.Time
		for _, t := range timestamps {
			if now.Sub(t) < rl.window {
				valid = append(valid, t)
			}
		}

		// Se passou do limite, bloqueia
		if len(valid) >= rl.limit {
			http.Error(w, "Muitas tentativas. Aguarde um momento.", http.StatusTooManyRequests)
			return
		}

		// Adiciona a tentativa atual e permite passar
		valid = append(valid, now)
		rl.visitors[ip] = valid

		next.ServeHTTP(w, r)
	})
}
