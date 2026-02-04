package services

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
)

type EmailService struct {
	auth smtp.Auth
	addr string
	from string
}

func NewEmailService() *EmailService {
	host := os.Getenv("SMTP_HOST")
	port := os.Getenv("SMTP_PORT")
	user := os.Getenv("SMTP_USER")
	pass := os.Getenv("SMTP_PASS")

	auth := smtp.PlainAuth("", user, pass, host)
	return &EmailService{
		auth: auth,
		addr: host + ":" + port,
		from: user,
	}
}

func (s *EmailService) SendWelcomeEmail(toEmail, name, password string) error {
	// AJUSTE: URL do Metsuke
	link := "https://metsuke.app.br/login"

	subject := "Bem-vindo ao Metsuke"
	body := fmt.Sprintf(`Olá %s,
Sua conta foi criada com sucesso!

Acesse a plataforma em: %s

Sua senha temporária é: %s

Por favor, altere sua senha após o primeiro login.`, name, link, password)

	return s.send(toEmail, subject, body)
}

func (s *EmailService) SendPasswordResetEmail(toEmail, token string) error {
	// AJUSTE: URL do Metsuke
	link := fmt.Sprintf("https://metsuke.app.br/reset-password?token=%s", token)

	subject := "Recuperação de Senha - Metsuke"
	body := fmt.Sprintf(`Você solicitou a recuperação de senha.
Clique no link abaixo para criar uma nova senha:

%s

Se você não solicitou isso, ignore este e-mail.`, link)

	return s.send(toEmail, subject, body)
}

func (s *EmailService) send(to, subject, body string) error {
	msg := []byte(fmt.Sprintf("To: %s\r\n"+
		"Subject: %s\r\n"+
		"\r\n"+
		"%s\r\n", to, subject, body))

	err := smtp.SendMail(s.addr, s.auth, s.from, []string{to}, msg)
	if err != nil {
		log.Printf("Erro ao enviar email para %s: %v", to, err)
		return err
	}
	return nil
}
