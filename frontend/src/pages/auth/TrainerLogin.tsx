import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Componentes UI que você já tem
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from '@/services/api'; // Nossa ponte para o backend
import { useAuth } from '@/contexts/AuthContext'; // Nosso painel de controle

export default function TrainerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Pegamos a função login do nosso contexto

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Usamos o api.ts para chamar o backend Go
      const response = await api.post('/login', { // Endpoint do backend para login do treinador
        email: email,
        password: password,
      });

      // Se o login for bem-sucedido, a API Go retorna um token
      const { token } = response.data; 

      // Usamos a função login do AuthContext para guardar o token e o tipo de usuário
      login(token, 'trainer'); 
      
      // Redireciona para o dashboard do treinador
      navigate('/trainer/dashboard'); 

    } catch (err: any) {
      console.error("Erro no login:", err);
      if (err.response && err.response.data) {
        setError(err.response.data); // Mostra erro vindo da API (ex: Email ou senha inválidos)
      } else {
        setError('Não foi possível conectar ao servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login do Treinador</CardTitle>
          <CardDescription className="text-center">
            Acesse sua conta para gerenciar seus alunos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md text-center">{error}</p>}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            {/* Adicione links para Registro ou Login de Aluno se necessário */}
            <div className="mt-4 text-center text-sm">
               Não é um treinador?{" "}
              <Link to="/login/student" className="underline">
                Acessar como Aluno
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}