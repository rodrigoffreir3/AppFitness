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

	// Normaliza publicDomain para https
	if publicDomain != "" && !strings.HasPrefix(publicDomain, "http") {
		publicDomain = "https://" + publicDomain
	}
	publicDomain = strings.Replace(publicDomain, "http://", "https://", 1)

	// Endpoint resolver: usa cdn.metsuke.app.br se configurado, senão usa o endpoint padrão do R2
	endpointURL := fmt.Sprintf("https://%s.r2.cloudflarestorage.com", accountID)
	if publicDomain != "" {
		endpointURL = publicDomain
	}

	r2Resolver := aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{}) (aws.Endpoint, error) {
		return aws.Endpoint{
			URL:               endpointURL,
			HostnameImmutable: true, // Força o SDK a não modificar o host
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

	// UsePathStyle = true para que a URL seja cdn.metsuke.app.br/<key> e não <bucket>.cdn...
	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.UsePathStyle = true
	})
	presignClient := s3.NewPresignClient(client)

	log.Printf("Serviço de Storage R2 inicializado com endpoint: %s", endpointURL)

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

	// Gera a requisição assinada usando o SDK
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

	// Remove o nome do bucket da URL se ele aparecer no path
	// (acontece quando usamos custom domain + path style)
	bucketPrefix := "/" + s.bucketName + "/"
	finalURL := strings.Replace(req.URL, bucketPrefix, "/", 1)

	return finalURL, nil
}
