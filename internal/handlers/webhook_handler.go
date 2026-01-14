package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
)

// Estrutura do Payload que o Asaas envia
type AsaasWebhookEvent struct {
	Event   string `json:"event"`
	Payment struct {
		ID                string  `json:"id"`
		ExternalReference string  `json:"externalReference"` // Aqui vem o ID do Treinador
		BillingType       string  `json:"billingType"`
		Value             float64 `json:"value"`
		Status            string  `json:"status"`
	} `json:"payment"`
}

type webhookHandler struct {
	db *sql.DB
}

// Registra a rota (chamaremos no main.go)
func RegisterWebhookRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &webhookHandler{db: db}

	// Rota pública (O Asaas não tem login, ele usa um token de cabeçalho que veremos na Fase de Segurança)
	mux.HandleFunc("POST /api/webhook/asaas", h.handleAsaasWebhook)
}

func (h *webhookHandler) handleAsaasWebhook(w http.ResponseWriter, r *http.Request) {
	// 1. Decodificar o JSON recebido
	var payload AsaasWebhookEvent
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		log.Printf("Erro ao decodificar webhook: %v", err)
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	log.Printf("Webhook Recebido: Evento=%s | TrainerID=%s | Valor=%.2f",
		payload.Event, payload.Payment.ExternalReference, payload.Payment.Value)

	// 2. Verificar se é um evento de Pagamento Confirmado
	// O Asaas manda vários eventos (CRIADO, VENCIDO, etc). Só queremos o dinheiro no bolso.
	if payload.Event == "PAYMENT_CONFIRMED" || payload.Event == "PAYMENT_RECEIVED" {

		trainerID := payload.Payment.ExternalReference

		if trainerID == "" {
			log.Println("Webhook ignorado: ExternalReference (TrainerID) vazio.")
			w.WriteHeader(http.StatusOK)
			return
		}

		// 3. ATIVAR O TREINADOR NO BANCO
		// Atualizamos o status para ACTIVE e renovamos a data se necessário (lógica simples por enquanto)
		query := `
			UPDATE trainers 
			SET subscription_status = 'ACTIVE', 
			    updated_at = NOW() 
			WHERE id = $1
		`

		result, err := h.db.ExecContext(r.Context(), query, trainerID)
		if err != nil {
			log.Printf("Erro crítico ao ativar treinador %s: %v", trainerID, err)
			http.Error(w, "Internal Error", http.StatusInternalServerError)
			return
		}

		rows, _ := result.RowsAffected()
		log.Printf("SUCESSO: Treinador %s ativado! Linhas afetadas: %d", trainerID, rows)
	}

	// 4. Sempre responder 200 OK para o Asaas não ficar tentando reenviar
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status":"received"}`))
}
