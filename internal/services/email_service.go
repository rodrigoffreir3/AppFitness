package services

import (
	"fmt"
	"log"
	"os"

	"github.com/resend/resend-go/v2"
)

type EmailService struct {
	client *resend.Client
	from   string
}

func NewEmailService() *EmailService {
	apiKey := os.Getenv("RESEND_API_KEY")
	fromEmail := os.Getenv("EMAIL_FROM")

	if apiKey == "" || fromEmail == "" {
		log.Println("AVISO: RESEND_API_KEY ou EMAIL_FROM ausentes. O envio de e-mails pode falhar.")
	}

	client := resend.NewClient(apiKey)

	return &EmailService{
		client: client,
		from:   fmt.Sprintf("Metsuke Fitness <%s>", fromEmail),
	}
}

func (s *EmailService) SendWelcomeEmail(toEmail, name, password string) error {
	// AJUSTE: URL do Metsuke
	link := "https://metsuke.app.br/login/trainer"

	subject := "Bem-vindo ao Metsuke Fitness! 🚀"
	body := fmt.Sprintf(`Olá %s,
Sua conta foi criada com sucesso!

Acesse a plataforma em: %s

Sua senha temporária é: %s

Por favor, altere sua senha após o primeiro login.`, name, link, password)

	return s.send(toEmail, subject, body)
}

func (s *EmailService) SendPasswordResetEmail(toEmail, token string) error {
	// AJUSTE: URL do Metsuke
	link := fmt.Sprintf("https://metsuke.app.br/redefinir-senha?token=%s", token)

	subject := "Recuperação de Senha - Metsuke Fitness 🟢"
	body := fmt.Sprintf(`Você solicitou a recuperação de senha.
Clique no link abaixo para criar uma nova senha:

%s

Se você não solicitou isso, ignore este e-mail.`, link)

	return s.send(toEmail, subject, body)
}

func (s *EmailService) send(to, subject, body string) error {
	params := &resend.SendEmailRequest{
		From:    s.from,
		To:      []string{to},
		Subject: subject,
		Text:    body, // Mantido como texto simples para garantir a compatibilidade cirúrgica
	}

	sent, err := s.client.Emails.Send(params)
	if err != nil {
		log.Printf("Erro ao enviar email para %s: %v", to, err)
		return err
	}

	log.Printf("E-mail transacional enviado com sucesso! ID: %s", sent.Id)
	return nil
}
