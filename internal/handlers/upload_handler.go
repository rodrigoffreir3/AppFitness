package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	// ATENÇÃO: Se der erro de import no "github.com/google/uuid",
	// certifique-se de que ele está no go.mod ou use um gerador simples
	"github.com/google/uuid"
)

const MaxUploadSize = 20 << 20 // 20 MB

func HandleUpload(w http.ResponseWriter, r *http.Request) {
	// 1. Configurar CORS (Se necessário aqui, ou globalmente)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	// 2. Limitar tamanho do arquivo
	r.Body = http.MaxBytesReader(w, r.Body, MaxUploadSize)
	if err := r.ParseMultipartForm(MaxUploadSize); err != nil {
		http.Error(w, "Arquivo muito grande (Max 20MB)", http.StatusBadRequest)
		return
	}

	// 3. Ler o arquivo do form (campo "file")
	file, fileHeader, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Erro ao recuperar arquivo", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// 4. Validar extensão (Segurança básica)
	ext := strings.ToLower(filepath.Ext(fileHeader.Filename))
	if ext != ".jpg" && ext != ".jpeg" && ext != ".png" && ext != ".pdf" {
		http.Error(w, "Apenas imagens (JPG/PNG) e PDF são permitidos", http.StatusBadRequest)
		return
	}

	// 5. Criar pasta se não existir
	uploadDir := "./uploads"
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		os.Mkdir(uploadDir, os.ModePerm)
	}

	// 6. Gerar nome único para não sobrescrever
	newFileName := fmt.Sprintf("%s%s", uuid.New().String(), ext)
	dstPath := filepath.Join(uploadDir, newFileName)

	// 7. Salvar no disco
	dst, err := os.Create(dstPath)
	if err != nil {
		http.Error(w, "Erro ao salvar arquivo no servidor", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "Erro ao escrever arquivo", http.StatusInternalServerError)
		return
	}

	// 8. Retornar a URL pública
	// Nota: Em produção, isso seria seu dominio.com/uploads/...
	// No Docker local, o Frontend vai usar a URL relativa ou base
	fileURL := fmt.Sprintf("/uploads/%s", newFileName)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"url": fileURL,
	})
}
