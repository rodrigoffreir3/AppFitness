package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

// --- ESTRUTURAS (STRUCTS) ---

type AsaasCustomerRequest struct {
	Name              string `json:"name"`
	CpfCnpj           string `json:"cpfCnpj"`
	Email             string `json:"email"`
	MobilePhone       string `json:"mobilePhone,omitempty"`
	ExternalReference string `json:"externalReference"`
}

type AsaasCustomerResponse struct {
	ID string `json:"id"`
}

// Estrutura para Assinatura (Recorrência)
type AsaasSubscriptionRequest struct {
	Customer          string  `json:"customer"`
	BillingType       string  `json:"billingType"` // "UNDEFINED", "BOLETO", "CREDIT_CARD", "PIX"
	Value             float64 `json:"value"`
	NextDueDate       string  `json:"nextDueDate"` // YYYY-MM-DD
	Description       string  `json:"description"`
	Cycle             string  `json:"cycle"` // "MONTHLY", "QUARTERLY", "YEARLY"
	ExternalReference string  `json:"externalReference"`
}

type AsaasSubscriptionResponse struct {
	ID          string  `json:"id"`
	Status      string  `json:"status"` // "ACTIVE", "EXPIRED"
	BillingType string  `json:"billingType"`
	Value       float64 `json:"value"`
	InvoiceUrl  string  `json:"invoiceUrl"` // Link para o cliente pagar/escolher cartão
}

// --- SERVIÇO ---

// Cria o Cliente no Asaas
func CreateAsaasCustomer(name, email, cpf, trainerID string) (string, error) {
	apiKey := os.Getenv("ASAAS_API_KEY")
	apiURL := os.Getenv("ASAAS_API_URL")

	reqBody := AsaasCustomerRequest{
		Name:              name,
		Email:             email,
		CpfCnpj:           cpf,
		ExternalReference: trainerID,
	}

	// CORREÇÃO AQUI: Capturamos a resposta completa primeiro
	res, err := postToAsaas[AsaasCustomerRequest, AsaasCustomerResponse](apiURL+"/customers", apiKey, reqBody)
	if err != nil {
		return "", err
	}

	// E retornamos apenas o ID
	return res.ID, nil
}

// Cria a Assinatura (Recorrência)
func CreateAsaasSubscription(customerID string, value float64, nextDueDate string, description string) (*AsaasSubscriptionResponse, error) {
	apiKey := os.Getenv("ASAAS_API_KEY")
	apiURL := os.Getenv("ASAAS_API_URL")

	reqBody := AsaasSubscriptionRequest{
		Customer: customerID,
		// AO USAR "UNDEFINED", o Asaas mostra Pix, Boleto E CARTÃO DE CRÉDITO na tela de pagamento.
		BillingType: "UNDEFINED",
		Value:       value,
		NextDueDate: nextDueDate,
		Cycle:       "MONTHLY", // Cobrança Mensal
		Description: description,
	}

	res, err := postToAsaas[AsaasSubscriptionRequest, AsaasSubscriptionResponse](apiURL+"/subscriptions", apiKey, reqBody)
	if err != nil {
		return nil, err
	}

	return &res, nil
}

// --- FUNÇÃO AUXILIAR GENÉRICA PARA CHAMADAS HTTP ---
func postToAsaas[T any, R any](url, apiKey string, body T) (R, error) {
	var result R

	jsonData, err := json.Marshal(body)
	if err != nil {
		return result, err
	}

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	req.Header.Add("access_token", apiKey)
	req.Header.Add("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return result, err
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)

	if resp.StatusCode != 200 {
		fmt.Printf("Erro Asaas Body: %s\n", string(respBody))
		return result, fmt.Errorf("erro asaas (%d): %s", resp.StatusCode, string(respBody))
	}

	if err := json.Unmarshal(respBody, &result); err != nil {
		return result, err
	}

	return result, nil
}

// Busca link de pagamento da assinatura (primeira cobrança)
func GetSubscriptionPaymentLink(subscriptionID string) (string, error) {
	apiKey := os.Getenv("ASAAS_API_KEY")
	apiURL := os.Getenv("ASAAS_API_URL")

	url := fmt.Sprintf("%s/payments?subscription=%s&status=PENDING&limit=1", apiURL, subscriptionID)

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("access_token", apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var listRes struct {
		Data []struct {
			InvoiceUrl string `json:"invoiceUrl"`
		} `json:"data"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&listRes); err != nil {
		return "", err
	}

	if len(listRes.Data) > 0 {
		return listRes.Data[0].InvoiceUrl, nil
	}

	return "", fmt.Errorf("nenhuma cobrança gerada ainda")
}
