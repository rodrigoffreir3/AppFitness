import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dumbbell, AlertCircle, Loader2 } from 'lucide-react';
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const TrainerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Hook de autenticação atualizado
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/trainers/login', { email, password });
      
      // Recebe token e objeto de branding completo
      const { token, branding } = response.data;
      
      // Login com a nova assinatura (token, tipo, objeto branding)
      login(token, 'trainer', branding);
      
      navigate('/trainer/dashboard');
    } catch (err: any) {
      console.error("Erro no login:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 404)) {
        setError('Email ou senha inválidos.');
      } else {
        setError('Não foi possível conectar ao servidor.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <Dumbbell className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Login do Treinador</CardTitle>
          <CardDescription>Acesse sua plataforma de gestão</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                <AlertCircle className="w-4 h-4" />
                <p>{error}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                disabled={isLoading}
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              {/* LINK ADICIONADO AQUI: Entre o Label e o Input */}
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link 
                  to="/esqueci-senha" 
                  className="text-xs text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                disabled={isLoading} 
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Entrar'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            É um aluno? <Link to="/login/student" className="underline text-primary hover:text-primary/80">Acesse aqui</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerLogin;