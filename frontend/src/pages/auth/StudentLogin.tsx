import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ADICIONADO: Link
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/students/login', { email, password });
      const { token, branding } = response.data;
      
      // Login com dados completos
      login(token, 'student', branding);
      
      toast({ title: "Login realizado!", description: "Redirecionando..." });
      navigate("/student/dashboard");
    } catch (error: any) {
      console.error(error);
      
      let msg = "Email ou senha incorretos";
      
      if (error.response) {
         if (error.response.status === 404) {
           msg = "Esta conta não existe ou foi excluída.";
         } else if (error.response.status === 403) {
           msg = "Acesso negado.";
         }
      }

      toast({ 
        title: "Erro no login", 
        description: msg, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Área do Aluno</CardTitle>
          <CardDescription className="text-center">Entre para acessar seus treinos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            </div>
            <div className="space-y-2">
              {/* BLOCO ADICIONADO: Link de Esqueci Senha */}
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link 
                  to="/esqueci-senha" 
                  className="text-xs text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentLogin;