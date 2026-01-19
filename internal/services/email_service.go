package services

import (
	"fmt"
	"net/smtp"
	"os"
)

type EmailService struct {
	host     string
	port     string
	user     string
	password string
	from     string
	baseURL  string
}

func NewEmailService() *EmailService {
	// Pega a URL do frontend ou usa padrão local
	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:5173"
	}

	return &EmailService{
		host:     os.Getenv("SMTP_HOST"),
		port:     os.Getenv("SMTP_PORT"),
		user:     os.Getenv("SMTP_USER"),
		password: os.Getenv("SMTP_PASSWORD"),
		from:     os.Getenv("SMTP_FROM"),
		baseURL:  frontendURL,
	}
}

func (s *EmailService) SendResetPasswordEmail(toEmail, token string) error {
	resetLink := fmt.Sprintf("%s/redefinir-senha?token=%s", s.baseURL, token)

	// --- CORREÇÃO AQUI: Cabeçalhos Completos (RFC 822) ---
	// O Resend exige que o "From" esteja aqui no texto também
	headers := make(map[string]string)
	headers["From"] = s.from
	headers["To"] = toEmail
	headers["Subject"] = "Redefinicao de Senha - AppFitness"
	headers["MIME-Version"] = "1.0"
	headers["Content-Type"] = "text/html; charset=\"UTF-8\""

	message := ""
	for k, v := range headers {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" // Linha vazia obrigatória entre headers e corpo

	htmlBody := fmt.Sprintf(`
		<html>
			<body style="font-family: Arial, sans-serif; color: #333;">
				<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
					<h2 style="color: #2563eb;">Recuperação de Senha</h2>
					<p>Olá,</p>
					<p>Recebemos uma solicitação para redefinir a senha da sua conta no AppFitness.</p>
					<p>Clique no botão abaixo para criar uma nova senha:</p>
					<div style="text-align: center; margin: 30px 0;">
						<a href="%s" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
							Redefinir Minha Senha
						</a>
					</div>
					<p style="font-size: 14px; color: #666;">Se o botão não funcionar, copie e cole este link no seu navegador:</p>
					<p style="font-size: 12px; word-break: break-all; color: #888;">%s</p>
					<hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
					<p style="font-size: 12px; color: #999;">Este link expira em 1 hora. Se você não solicitou isso, ignore este e-mail.</p>
				</div>
			</body>
		</html>
	`, resetLink, resetLink)

	message += htmlBody

	auth := smtp.PlainAuth("", s.user, s.password, s.host)
	addr := fmt.Sprintf("%s:%s", s.host, s.port)

	// Envio
	err := smtp.SendMail(addr, auth, s.from, []string{toEmail}, []byte(message))
	if err != nil {
		return fmt.Errorf("erro ao enviar email SMTP: %v", err)
	}

	return nil
}
