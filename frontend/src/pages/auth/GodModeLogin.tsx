// frontend/src/pages/auth/GodModeLogin.tsx
import { useState } from 'react';
import { ShieldAlert, Key, Smartphone, Loader2 } from 'lucide-react';
import api from '@/services/api';

const GodModeLogin = () => {
  const [password, setPassword] = useState('');
  const [totpToken, setTotpToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/admin/login', {
        password,
        totp_token: totpToken,
      });

      // Salva o token dourado no localStorage
      localStorage.setItem('adminAuthToken', response.data.token);
      
      // Redireciona para o painel de comando (que vamos criar a seguir)
      window.location.href = '/master/dashboard';
    } catch (err: any) {
      setError(err.response?.data || 'Acesso negado. Intrusão detectada.');
      setTotpToken(''); // Limpa o token para forçar nova digitação
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-950 border border-slate-800 p-8 rounded-2xl shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
        
        {/* Barra superior pulsante */}
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 animate-pulse"></div>

        <div className="text-center mb-8">
          <ShieldAlert className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white uppercase tracking-widest">Defesa Ativa</h2>
          <p className="text-xs text-slate-500 mt-2 font-mono">Autenticação MFA Exigida</p>
        </div>

        {error && (
          <div className="bg-red-950/50 border border-red-500/50 p-3 rounded-lg text-red-400 text-xs font-bold text-center mb-6 font-mono animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Chave Mestra</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="w-4 h-4 text-slate-500" />
              </div>
              <input 
                type="password" 
                required 
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block pl-10 p-3 text-sm transition-all outline-none" 
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Token TOTP</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Smartphone className="w-4 h-4 text-slate-500" />
              </div>
              <input 
                type="text" 
                required 
                pattern="[0-9]{6}" 
                maxLength={6}
                value={totpToken}
                onChange={(e) => setTotpToken(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-center tracking-[1em] rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block pl-10 p-3 text-lg transition-all outline-none" 
                placeholder="000000"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 px-4 rounded-lg transition-colors uppercase tracking-widest text-sm shadow-lg shadow-emerald-900/50 mt-4 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Desbloquear'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GodModeLogin;