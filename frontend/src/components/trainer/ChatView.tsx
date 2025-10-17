import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatView = () => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  
  const students = [
    { id: 1, name: "João Silva", lastMessage: "Obrigado!", unread: 2 },
    { id: 2, name: "Maria Santos", lastMessage: "Pode ser amanhã?", unread: 0 },
  ];

  const messages = [
    { id: 1, from: "student", text: "Boa tarde, professor!", time: "14:30" },
    { id: 2, from: "trainer", text: "Boa tarde! Como vai?", time: "14:32" },
    { id: 3, from: "student", text: "Tudo bem! Sobre o treino...", time: "14:33" },
  ];

  const handleSend = () => {
    // TODO: Enviar mensagem via WebSocket
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Chat</h1>
        <p className="text-muted-foreground">Converse com seus alunos</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 h-[600px]">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Conversas</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student.id)}
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors border-b ${
                    selectedStudent === student.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {student.lastMessage}
                      </p>
                    </div>
                    {student.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1">
                        {student.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>
              {students.find((s) => s.id === selectedStudent)?.name || "Selecione um aluno"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === "trainer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.from === "trainer"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatView;
