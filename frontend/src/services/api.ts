import axios from 'axios';

// Configuração da URL base
const api = axios.create({
  baseURL: '/api', // O proxy do Vite redireciona isso para localhost:8080
});

// Interceptor de Requisição: Adiciona o token automaticamente
api.interceptors.request.use(
  (config) => {
    // 1. PRIORIDADE MÁXIMA: Token do God Mode (Super Admin)
    const adminToken = localStorage.getItem('adminAuthToken');
    if (adminToken) {
      config.headers['Authorization'] = `Bearer ${adminToken}`;
      return config;
    }

    // 2. Fallback: Tokens normais (Treinador ou Aluno)
    const userType = localStorage.getItem('userType');
    let token = null;

    if (userType === 'trainer') {
      token = localStorage.getItem('trainerAuthToken');
    } else if (userType === 'student') {
      token = localStorage.getItem('studentAuthToken');
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta: O "Limpa Trilhos" Automático (AGORA INTELIGENTE)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, config } = error.response;
      
      // Verifica se é uma rota de autenticação (Login/Registro) para não redirecionar em caso de erro de senha
      const isAuthRoute = config.url?.includes('/login') || config.url?.includes('/register') || config.url?.includes('/public') || config.url?.includes('/admin/login');
      
      // Verifica se o usuário já está na página de login ou root
      const isAtPublicPage = window.location.pathname === '/' || window.location.pathname.includes('/login');

      // --- GOD MODE BYPASS ---
      // Se estiver na rota do painel master e der 401, manda para o login do master, não para o início!
      const isGodMode = window.location.pathname.includes('/master');
      if (isGodMode && status === 401 && !isAuthRoute) {
         console.warn("God Mode: Token inválido ou expirado.");
         localStorage.removeItem('adminAuthToken');
         window.location.href = '/master';
         return Promise.reject(error);
      }

      // Logout forçado APENAS se:
      // 1. Não for rota de auth (erro de senha)
      // 2. Usuário não estiver já na tela de login
      // 3. For erro 401 ou 404 em rotas de perfil (/me)
      // 4. Não for o God Mode (já tratado acima)
      if (!isAuthRoute && !isAtPublicPage && !isGodMode && (status === 401 || (status === 404 && config.url?.includes('/me')))) {
        console.warn("Sessão inválida detectada. Realizando logout forçado...");
        localStorage.clear();
        document.documentElement.style.removeProperty('--primary');
        document.documentElement.style.removeProperty('--secondary');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// --- Função Auxiliar de Upload ---
export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return response.data.url; 
};