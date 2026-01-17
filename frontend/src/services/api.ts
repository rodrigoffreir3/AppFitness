import axios from 'axios';

// Configuração da URL base
const api = axios.create({
  baseURL: '/api', // O proxy do Vite redireciona isso para localhost:8080
});

// Interceptor de Requisição: Adiciona o token automaticamente
api.interceptors.request.use(
  (config) => {
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
      const isAuthRoute = config.url?.includes('/login') || config.url?.includes('/register') || config.url?.includes('/public');
      
      // Verifica se o usuário já está na página de login ou root
      const isAtPublicPage = window.location.pathname === '/' || window.location.pathname.includes('/login');

      // Logout forçado APENAS se:
      // 1. Não for rota de auth (erro de senha)
      // 2. Usuário não estiver já na tela de login
      // 3. For erro 401 ou 404 em rotas de perfil (/me)
      if (!isAuthRoute && !isAtPublicPage && (status === 401 || (status === 404 && config.url?.includes('/me')))) {
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