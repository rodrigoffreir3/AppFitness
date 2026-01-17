import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, KeyRound, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import api from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function StudentSecuritySettings() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handlePasswordChange = async () => {
    if (passwords.new_password !== passwords.confirm_password) {
        toast.error("As senhas não coincidem");
        return;
    }
    if (passwords.new_password.length < 6) {
        toast.error("A nova senha deve ter no mínimo 6 caracteres");
        return;
    }

    setLoading(true);
    try {
        // ENDPOINT DO ALUNO
        await api.put('/students/me/password', {
            old_password: passwords.old_password,
            new_password: passwords.new_password
        });
        toast.success("Senha atualizada com sucesso!");
        setPasswords({ old_password: '', new_password: '', confirm_password: '' });
    } catch (err: any) {
        toast.error("Erro ao trocar senha", { 
            description: err.response?.data || "Verifique sua senha atual." 
        });
    } finally {
        setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
      try {
          // ENDPOINT DO ALUNO
          await api.delete('/students/me');
          toast.success("Conta excluída.");
          logout(); 
      } catch (err) {
          toast.error("Erro ao excluir conta.");
      }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-2">
        <KeyRound className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Minha Segurança</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>Escolha uma senha forte para proteger seus dados.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Senha Atual</Label>
            <Input 
                type="password" 
                value={passwords.old_password}
                onChange={e => setPasswords({...passwords, old_password: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Nova Senha</Label>
            <Input 
                type="password"
                value={passwords.new_password}
                onChange={e => setPasswords({...passwords, new_password: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label>Confirmar Nova Senha</Label>
            <Input 
                type="password"
                value={passwords.confirm_password}
                onChange={e => setPasswords({...passwords, confirm_password: e.target.value})}
            />
          </div>
          <Button onClick={handlePasswordChange} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Atualizar Senha
          </Button>
        </CardContent>
      </Card>

      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Exclusão de Conta</AlertTitle>
        <AlertDescription className="mt-2">
          Deseja encerrar seu vínculo com a plataforma? Seus dados serão apagados.
        </AlertDescription>
        
        <div className="mt-4">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir Minha Conta
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                           Seu histórico de treinos será perdido permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                            Sim, excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
      </Alert>
    </div>
  );
}