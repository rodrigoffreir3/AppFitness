package handlers

import (
	"appfitness/internal/middleware"
	"appfitness/internal/services"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time" // Adicionado corretamente aqui no topo
)

type SubscribeRequest struct {
	CpfCnpj string `json:"cpf_cnpj"` // Necessário para criar o cliente no Asaas
}

type SubscribeResponse struct {
	PaymentUrl string `json:"payment_url"`
}

type subscriptionHandler struct {
	db *sql.DB
}

func RegisterSubscriptionRoutes(mux *http.ServeMux, db *sql.DB) {
	h := &subscriptionHandler{db: db}

	// Rota para iniciar a assinatura
	mux.Handle("POST /api/subscription/subscribe", middleware.AuthMiddleware(http.HandlerFunc(h.handleSubscribe)))
}

func (h *subscriptionHandler) handleSubscribe(w http.ResponseWriter, r *http.Request) {
	trainerID := r.Context().Value(middleware.TrainerIDKey).(string)

	var req SubscribeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "JSON inválido", http.StatusBadRequest)
		return
	}

	if req.CpfCnpj == "" {
		http.Error(w, "CPF/CNPJ é obrigatório para assinar", http.StatusBadRequest)
		return
	}

	// 1. Buscar dados do treinador no banco
	var name, email, currentAsaasID string
	err := h.db.QueryRowContext(r.Context(), "SELECT name, email, customer_id_asaas FROM trainers WHERE id=$1", trainerID).Scan(&name, &email, &currentAsaasID)
	if err != nil {
		http.Error(w, "Treinador não encontrado", http.StatusInternalServerError)
		return
	}

	// 2. Garantir que existe cliente no Asaas
	customerID := currentAsaasID
	if customerID == "" {
		// Cria no Asaas se não existir
		newID, err := services.CreateAsaasCustomer(name, email, req.CpfCnpj, trainerID)
		if err != nil {
			log.Printf("Erro ao criar cliente Asaas: %v", err)
			http.Error(w, "Erro ao processar cadastro financeiro", http.StatusInternalServerError)
			return
		}
		customerID = newID

		// Salva o ID no banco para não criar duplicado depois
		_, err = h.db.ExecContext(r.Context(), "UPDATE trainers SET customer_id_asaas=$1 WHERE id=$2", customerID, trainerID)
		if err != nil {
			log.Printf("Erro ao salvar ID Asaas: %v", err)
		}
	}

	// 3. Criar a Assinatura
	// Valor: 49.90 (Exemplo)
	// Vencimento: Amanhã (para pagar logo e liberar)
	// Descrição: "Assinatura Mensal AppFitness"

	dueDate := time.Now().AddDate(0, 0, 1).Format("2006-01-02") // Amanhã

	subRes, err := services.CreateAsaasSubscription(customerID, 49.90, dueDate, "Assinatura Mensal AppFitness")
	if err != nil {
		log.Printf("Erro ao criar assinatura: %v", err)
		http.Error(w, "Erro ao gerar cobrança", http.StatusInternalServerError)
		return
	}

	// 4. Atualizar banco com o ID da assinatura e status PENDING
	_, err = h.db.ExecContext(r.Context(),
		"UPDATE trainers SET subscription_id=$1, subscription_status='PENDING' WHERE id=$2",
		subRes.ID, trainerID)

	if err != nil {
		log.Printf("Erro ao atualizar status local: %v", err)
	}

	// 5. Retornar o Link de Pagamento
	paymentLink := subRes.InvoiceUrl
	if paymentLink == "" {
		// Tenta buscar o link da primeira cobrança gerada caso a assinatura não retorne direto
		link, err := services.GetSubscriptionPaymentLink(subRes.ID)
		if err == nil {
			paymentLink = link
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(SubscribeResponse{PaymentUrl: paymentLink})
}
