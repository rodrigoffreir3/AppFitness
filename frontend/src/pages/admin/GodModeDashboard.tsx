import { useEffect, useState } from 'react';
import { ShieldAlert, Users, Dumbbell, Activity, LogOut, Server, Power, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '@/services/api';

interface AdminStats {
  total_trainers: number;
  total_students: number;
  status: string;
}

interface Trainer {
  id: string;
  name: string;
  email: string;
  subscription_status: string;
  total_students: number;
  created_at: string;
}

// Dados mockados para o gráfico de crescimento (para manter o backend enxuto)
const mockChartData = [
  { name: 'Seg', acessos: 4000 },
  { name: 'Ter', acessos: 3000 },
  { name: 'Qua', acessos: 2000 },
  { name: 'Qui', acessos: 2780 },
  { name: 'Sex', acessos: 1890 },
  { name: 'Sáb', acessos: 2390 },
  { name: 'Dom', acessos: 3490 },
];

const GodModeDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    const token = localStorage.getItem('adminAuthToken');
    if (!token) {
      window.location.href = '/master';
      return;
    }

    try {
      const [statsRes, trainersRes] = await Promise.all([
        api.get<AdminStats>('/admin/dashboard'),
        api.get<Trainer[]>('/admin/trainers')
      ]);
      setStats(statsRes.data);
      setTrainers(trainersRes.data);
    } catch (err: any) {
      console.error(err);
      setError('Falha na telemetria. Conexão com o core perdida.');
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('adminAuthToken');
        window.location.href = '/master';
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    window.location.href = '/master';
  };

  // O Kill Switch (Bloqueia ou Desbloqueia o Personal)
  const toggleTrainerStatus = async (id: string, currentStatus: string) => {
    const action = currentStatus === 'blocked' ? 'Desbloquear' : 'BLOQUEAR';
    if (!window.confirm(`ATENÇÃO: Tem a certeza que deseja ${action} este inquilino?`)) return;

    try {
      await api.post(`/admin/trainers/${id}/toggle`);
      // Recarrega os dados silenciosamente para atualizar a tabela
      fetchData();
    } catch (err) {
      alert("Erro ao executar comando de bloqueio.");
    }
  };

  const filteredTrainers = trainers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-emerald-500 font-mono animate-pulse">Iniciando ctOS Master Control...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-emerald-500/30">
      {/* Barra de Navegação Superior */}
      <header className="border-b border-emerald-900/30 bg-slate-950/50 p-4 sticky top-0 backdrop-blur-md z-50 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-emerald-500 animate-pulse" />
            <h1 className="text-xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">Master <span className="text-emerald-500">Control</span></h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-red-900/50 text-red-500 hover:bg-red-950/50 hover:text-red-400 bg-black/50 backdrop-blur">
            <LogOut className="w-4 h-4 mr-2" /> Desconectar
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8 mt-4">
        {error && (
          <div className="bg-red-950/50 border border-red-500/50 p-4 rounded-lg text-red-400 font-mono text-sm animate-pulse">
            [SYS_ERR]: {error}
          </div>
        )}

        {/* Visão Geral (Grids) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-950 border-slate-800 relative overflow-hidden shadow-lg shadow-black">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Users className="w-32 h-32 text-emerald-500" /></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider relative z-10">Total de Inquilinos</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{stats?.total_trainers || 0}</div>
              <p className="text-xs text-emerald-500 mt-2 flex items-center font-mono"><Activity className="w-3 h-3 mr-1"/> Personais Ativos</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-950 border-slate-800 relative overflow-hidden shadow-lg shadow-black">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Dumbbell className="w-32 h-32 text-emerald-500" /></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider relative z-10">População Global</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{stats?.total_students || 0}</div>
              <p className="text-xs text-emerald-500 mt-2 flex items-center font-mono"><Activity className="w-3 h-3 mr-1"/> Alunos Treinando</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-950 border-slate-800 relative overflow-hidden shadow-lg shadow-black border-emerald-900/30">
            <div className="absolute top-0 right-0 p-4 opacity-5"><Server className="w-32 h-32 text-emerald-500" /></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider relative z-10">Telemetria</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold text-emerald-400 mt-2 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">{stats?.status || 'ONLINE'}</div>
              <p className="text-xs text-slate-500 mt-2 flex items-center font-mono"><Activity className="w-3 h-3 mr-1 text-emerald-500"/> Core System Nominal</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Desempenho (Estética ctOS) */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-lg shadow-black">
          <h2 className="text-sm font-bold text-slate-400 mb-6 flex items-center font-mono uppercase tracking-widest"><Activity className="w-4 h-4 mr-2 text-emerald-500"/> Tráfego de Rede / Volume</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcessos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px', color: '#10b981' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="acessos" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAcessos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela de Inquilinos */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg shadow-black">
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/50">
            <h2 className="text-sm font-bold text-slate-400 flex items-center font-mono uppercase tracking-widest"><Users className="w-4 h-4 mr-2 text-emerald-500"/> Gestão de Acessos</h2>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar inquilino..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black border border-slate-800 text-sm text-white rounded-lg pl-9 pr-4 py-2 focus:ring-1 focus:ring-emerald-500 outline-none w-full sm:w-64 font-mono placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/50 text-slate-500 font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Inquilino (Personal)</th>
                  <th className="px-6 py-4 font-medium">Contato</th>
                  <th className="px-6 py-4 font-medium">Alunos</th>
                  <th className="px-6 py-4 font-medium">Data de Ingresso</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Controle (Kill Switch)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredTrainers.map((trainer) => (
                  <tr key={trainer.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{trainer.name}</td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{trainer.email}</td>
                    <td className="px-6 py-4 text-emerald-500 font-bold">{trainer.total_students}</td>
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                      {new Date(trainer.created_at).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider ${
                        trainer.subscription_status === 'blocked' 
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}>
                        {trainer.subscription_status === 'blocked' ? 'Bloqueado' : 'Ativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toggleTrainerStatus(trainer.id, trainer.subscription_status)}
                        className={`font-mono text-xs uppercase tracking-wider border-0 ${
                          trainer.subscription_status === 'blocked'
                            ? 'bg-emerald-950/30 text-emerald-500 hover:bg-emerald-900/50 hover:text-emerald-400'
                            : 'bg-red-950/30 text-red-500 hover:bg-red-900/50 hover:text-red-400'
                        }`}
                      >
                        <Power className="w-3 h-3 mr-2" />
                        {trainer.subscription_status === 'blocked' ? 'Restaurar' : 'Bloquear'}
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredTrainers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500 font-mono text-sm">
                      Nenhum registro encontrado no banco de dados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GodModeDashboard;