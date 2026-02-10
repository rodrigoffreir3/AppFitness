package services

import (
	"context"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type StorageService struct {
	client        *s3.Client
	presignClient *s3.PresignClient
	bucketName    string
	publicDomain  string
}

func NewStorageService() *StorageService {
	accountID := os.Getenv("R2_ACCOUNT_ID")
	accessKey := os.Getenv("R2_ACCESS_KEY")
	secretKey := os.Getenv("R2_SECRET_KEY")
	bucketName := os.Getenv("R2_BUCKET_NAME")
	publicDomain := os.Getenv("R2_PUBLIC_DOMAIN")

	if accountID == "" || accessKey == "" || secretKey == "" || bucketName == "" {
		log.Println("AVISO: Credenciais do Cloudflare R2 não configuradas corretamente.")
		return nil
	}

	r2Resolver := aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{}) (aws.Endpoint, error) {
		return aws.Endpoint{
			URL: fmt.Sprintf("https://%s.r2.cloudflarestorage.com", accountID),
		}, nil
	})

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithEndpointResolverWithOptions(r2Resolver),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKey, secretKey, "")),
		config.WithRegion("auto"),
	)
	if err != nil {
		log.Printf("Erro ao carregar configuração do R2: %v", err)
		return nil
	}

	client := s3.NewFromConfig(cfg)
	presignClient := s3.NewPresignClient(client)

	log.Println("Serviço de Storage R2 inicializado.")

	return &StorageService{
		client:        client,
		presignClient: presignClient,
		bucketName:    bucketName,
		publicDomain:  publicDomain,
	}
}

// GetSignedURL gera uma URL assinada para um objeto privado
func (s *StorageService) GetSignedURL(objectKey string) (string, error) {
	if s == nil {
		return "", fmt.Errorf("storage service não inicializado")
	}

	// Limpa a chave caso venha com barra inicial
	objectKey = strings.TrimPrefix(objectKey, "/")

	// Gera a requisição assinada usando o SDK (vai gerar com o domínio r2.cloudflarestorage.com)
	req, err := s.presignClient.PresignGetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String(s.bucketName),
		Key:    aws.String(objectKey),
	}, func(o *s3.PresignOptions) {
		o.Expires = 2 * time.Hour
	})
	if err != nil {
		log.Printf("Erro ao assinar URL: %v", err)
		return "", err
	}

	// TRUQUE DO MESTRE: Substituir o domínio interno pelo seu Domínio Personalizado
	// A URL gerada pelo SDK é tipo: https://BUCKET.ACCOUNT.r2.cloudflarestorage.com/pasta/video.mp4?...tokens...
	// Nós queremos: https://cdn.metsuke.app.br/pasta/video.mp4?...tokens...

	finalURL := req.URL
	if s.publicDomain != "" {
		// Removemos a parte do protocolo para garantir
		domainClean := strings.TrimPrefix(s.publicDomain, "https://")
		domainClean = strings.TrimPrefix(domainClean, "http://")

		// Encontra onde começa o path (depois do domínio original)
		// O SDK gera algo como: https://bucket.account.r2.../KEY?params
		// Vamos substituir tudo antes do KEY pelo nosso domínio

		// Passo 1: Pega só a Query String (a assinatura)
		parts := strings.Split(req.URL, "?")
		if len(parts) < 2 {
			return req.URL, nil // Algo deu errado, retorna original
		}
		queryString := parts[1]

		// Passo 2: Reconstrói a URL usando seu domínio
		// Formato: https://cdn.metsuke.app.br/objectKey?assinatura
		finalURL = fmt.Sprintf("https://%s/%s?%s", domainClean, objectKey, queryString)
	}

	return finalURL, nil
}
