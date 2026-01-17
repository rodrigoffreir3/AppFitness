import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TrainerInfo {
  name: string;
  brand_logo_url: string;
  is_active: boolean;
}

export default function StudentSelfRegistration() {
  const { trainerId } = useParams();
  const { login } = useAuth(); // Usando o hook do contexto (note que chamei de 'login' na interface do arquivo anterior)
  
  // Estados
  const [trainer, setTrainer] = useState<TrainerInfo | null>(null);
  const [loadingTrainer, setLoadingTrainer] = useState(true);
  const [errorTrainer, setErrorTrainer] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState('');

  // 1. Ao carregar a página, busca as infos públicas do treinador
  useEffect(() => {
    async function fetchTrainer() {
      try {
        const response = await api.get(`/public/trainers/${trainerId}`);
        setTrainer(response.data);
        
        if (!response.data.is_active) {
            setErrorTrainer("Este treinador não está aceitando novos alunos no momento.");
        }
      } catch (error) {
        console.error(error);
        setErrorTrainer("Link inválido ou treinador não encontrado.");
      } finally {
        setLoadingTrainer(false);
      }
    }
    if (trainerId) fetchTrainer();
  }, [trainerId]);

  // 2. Lida com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorSubmit('');

    if (formData.password !== formData.confirmPassword) {
      setErrorSubmit('As senhas não coincidem.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorSubmit('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {
      setLoadingSubmit(true);
      
      // Chama a rota pública de registro
      const response = await api.post('/public/students/register', {
        trainer_id: trainerId,
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Sucesso! Usa o LOGIN do contexto para salvar token, cores e redirecionar
      const { token, branding } = response.data;
      
      login(token, 'student', {
          logo_url: branding.brand_logo_url, // Mapeando campos do backend para o contexto
          primary_color: branding.brand_primary_color,
          secondary_color: branding.brand_secondary_color,
          payment_pix_key: branding.payment_pix_key,
          payment_link_url: branding.payment_link_url,
          payment_instructions: branding.payment_instructions
      });

    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setErrorSubmit('Este e-mail já está cadastrado. Tente fazer login.');
      } else if (err.response && err.response.data) {
          // Tenta mostrar mensagem de erro específica se for string, senão genérica
          setErrorSubmit(typeof err.response.data === 'string' ? err.response.data : 'Erro ao realizar cadastro.');
      } else {
        setErrorSubmit('Erro ao realizar cadastro. Tente novamente.');
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  // --- Renderização Condicional (Carregando / Erro) ---

  if (loadingTrainer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (errorTrainer || !trainer?.is_active) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md text-center">
            <CardHeader>
                <div className="mx-auto bg-red-100 p-3 rounded-full w-fit mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl text-red-700">Link Indisponível</CardTitle>
                <CardDescription className="mt-2">
                    {errorTrainer || "Este treinador não está aceitando cadastros no momento."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Link to="/">
                    <Button variant="outline">Voltar ao Início</Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    );
  }

  // --- Renderização Principal (Formulário) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
            {/* Foto do Treinador (Se tiver) */}
            {trainer.brand_logo_url ? (
                <div className="mx-auto mb-4 h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-sm bg-gray-100">
                    <img 
                        src={trainer.brand_logo_url} 
                        alt={trainer.name} 
                        className="h-full w-full object-cover"
                    />
                </div>
            ) : (
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                    {trainer.name.charAt(0).toUpperCase()}
                </div>
            )}
            
            <CardTitle className="text-2xl font-bold">Convite Especial</CardTitle>
            <CardDescription className="text-base">
                Você foi convidado(a) para a consultoria de <br/>
                <span className="font-semibold text-primary text-lg">{trainer.name}</span>
            </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorSubmit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorSubmit}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Seu Nome Completo</Label>
              <Input
                id="name"
                required
                placeholder="Ex: Maria Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Crie uma Senha</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirme a Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                placeholder="Repita a senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loadingSubmit}>
              {loadingSubmit ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Criando conta...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Finalizar Cadastro
                </>
              )}
            </Button>
            
            <p className="text-center text-sm text-gray-500 mt-4">
                Já tem uma conta? <Link to="/login/student" className="text-primary hover:underline">Fazer Login</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}