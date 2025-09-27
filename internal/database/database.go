// internal/database/database.go
package database

import (
	"database/sql"
	"fmt"
	"os"

	// Importamos anonimamente o driver do PostgreSQL.
	// O pacote database/sql usará este driver para se conectar.
	_ "github.com/jackc/pgx/v5/stdlib"
)

// Connect abre uma conexão com o banco de dados PostgreSQL e a retorna.
func Connect() (*sql.DB, error) {
	// Montamos a string de conexão (DSN - Data Source Name)
	// usando variáveis de ambiente para segurança e flexibilidade.
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)

	// Abrimos a conexão com o banco de dados.
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, fmt.Errorf("falha ao abrir a conexão com o banco de dados: %w", err)
	}

	// Verificamos se a conexão é realmente válida.
	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("falha ao conectar com o banco de dados: %w", err)
	}

	return db, nil
}
