package services

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type StorageService struct {
	presignClient *s3.PresignClient
	bucketName    string
	publicDomain  string // ex: cdn.metsuke.com (para remover se estiver salvo no banco)
}

func NewStorageService(accountId, accessKey, secretKey, bucketName, publicDomain string) *StorageService {
	// Configura o Endpoint do Cloudflare R2
	r2Resolver := aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{}) (aws.Endpoint, error) {
		return aws.Endpoint{
			URL: fmt.Sprintf("https://%s.r2.cloudflarestorage.com", accountId),
		}, nil
	})

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithEndpointResolverWithOptions(r2Resolver),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKey, secretKey, "")),
		config.WithRegion("auto"),
	)
	if err != nil {
		log.Fatalf("Erro ao carregar config R2: %v", err)
	}

	client := s3.NewFromConfig(cfg)

	return &StorageService{
		presignClient: s3.NewPresignClient(client),
		bucketName:    bucketName,
		publicDomain:  publicDomain,
	}
}

// GetSignedURL gera um link temporário para o vídeo
func (s *StorageService) GetSignedURL(objectKey string) (string, error) {
	// Se o banco salvou a URL completa (ex: https://cdn.metsuke.com/videos/aula1.mp4),
	// precisamos extrair apenas a chave (videos/aula1.mp4).
	if strings.Contains(objectKey, s.publicDomain) {
		parts := strings.Split(objectKey, s.publicDomain+"/")
		if len(parts) > 1 {
			objectKey = parts[1]
		}
	}
	// Remove protocolo se houver
	objectKey = strings.TrimPrefix(objectKey, "https://")
	objectKey = strings.TrimPrefix(objectKey, "http://")

	// Gera a URL assinada válida por 2 horas (tempo suficiente para um treino)
	request, err := s.presignClient.PresignGetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String(s.bucketName),
		Key:    aws.String(objectKey),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = 2 * time.Hour
	})

	if err != nil {
		return "", fmt.Errorf("erro ao assinar url: %w", err)
	}

	return request.URL, nil
}
