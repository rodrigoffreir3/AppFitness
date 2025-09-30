// internal/chat/client.go
package chat

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

const (
	// Tempo de espera para escrever uma mensagem para o par.
	writeWait = 10 * time.Second

	// Tempo máximo para ler a próxima mensagem pong do par.
	pongWait = 60 * time.Second

	// Enviar pings para o par com este período. Deve ser menor que pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Tamanho máximo da mensagem permitido do par.
	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	// Precisamos de verificar a origem para permitir ligações de diferentes domínios.
	// Para desenvolvimento, podemos permitir tudo. Em produção, devemos restringir isto.
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Client é um intermediário entre a ligação websocket e o hub.
type Client struct {
	hub *Hub

	// O ID do utilizador (trainer ou student).
	userID string

	// A ligação websocket.
	conn *websocket.Conn

	// Canal de mensagens enviadas.
	send chan []byte
}

// readPump bombeia mensagens do websocket para o hub.
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		// Envia a mensagem lida para o canal de broadcast do hub.
		// Adiciona o sender_id à mensagem antes de enviá-la ao hub.
		var msg Message
		if err := json.Unmarshal(message, &msg); err == nil {
			msg.SenderID = c.userID
			modifiedMessage, _ := json.Marshal(msg)
			c.hub.broadcast <- modifiedMessage
		} else {
			log.Printf("Erro ao decodificar mensagem do cliente %s: %v", c.userID, err)
		}
	}
}

// writePump bombeia mensagens do hub para o websocket.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// O hub fechou o canal.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// ServeWs trata os pedidos de websocket do par.
func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request, userID string) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{hub: hub, userID: userID, conn: conn, send: make(chan []byte, 256)}
	client.hub.register <- client

	// Permite a execução concorrente de leituras e escritas.
	go client.writePump()
	go client.readPump()
}
