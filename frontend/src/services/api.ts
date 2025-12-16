import axios from 'axios';

// Configuração da URL base
const api = axios.create({
  baseURL: '/api',
});

// Interceptor de Requisição: Adiciona o token automaticamente
api.interceptors.request.use(
  (config) => {
    // 1. Descobrir quem está logado
    const userType = localStorage.getItem('userType');
    let token = null;

    // 2. Pegar o token correto baseado no tipo
    if (userType === 'trainer') {
      token = localStorage.getItem('trainerAuthToken');
    } else if (userType === 'student') {
      token = localStorage.getItem('studentAuthToken');
    }

    // 3. Injetar no header se existir
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Resposta: O "Limpa Trilhos" Automático
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se recebermos um erro de resposta...
    if (error.response) {
      const { status, config } = error.response;
      
      // Verificamos se é erro de Autenticação (401) ou Usuário não encontrado (404 em rotas de perfil)
      // O '/me' é crucial para não deslogar se for apenas uma página não encontrada qualquer
      if (status === 401 || (status === 404 && config.url.includes('/me'))) {
        
        console.warn("Sessão inválida detectada. Realizando logout forçado...");
        
        // 1. Limpa os dados podres do navegador
        localStorage.clear();
        
        // 2. Remove a maquilhagem (cores do tema)
        document.documentElement.style.removeProperty('--primary');
        document.documentElement.style.removeProperty('--secondary');
        
        // 3. Redireciona para a home (o window.location força o refresh real)
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;