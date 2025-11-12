# --- ETAPA 1: Build (Construção) ---
# Usamos a imagem oficial do Go 1.24.4 (conforme o go.mod) baseada em Alpine (leve)
FROM golang:1.24.4-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os ficheiros de dependências
COPY go.mod go.sum ./

# Baixa todas as dependências
RUN go mod tidy
RUN go mod download

# Copia todo o código-fonte do backend
COPY . .

# Compila a aplicação
# -o /app/appfitness: Define o nome do ficheiro de saída
# -ldflags "-s -w": Remove informações de debug, tornando o binário menor
# ./cmd/api: O caminho para o nosso main.go
RUN go build -o /app/appfitness -ldflags "-s -w" ./cmd/api

# --- ETAPA 2: Final (Produção) ---
# Começamos com uma imagem Alpine limpa, que é muito pequena
FROM alpine:latest

# Define o diretório de trabalho
WORKDIR /app

# Copia APENAS o binário compilado da etapa 'builder'
COPY --from=builder /app/appfitness .

# (Opcional, mas boa prática: Garantir que o binário é executável)
RUN chmod +x /app/appfitness

# Expõe a porta 8080 (a porta que o main.go escuta)
EXPOSE 8080

# Comando para executar a aplicação quando o container iniciar
CMD [ "/app/appfitness" ]