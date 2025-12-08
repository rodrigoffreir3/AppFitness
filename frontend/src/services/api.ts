import axios from 'axios';

// Configuração da URL base (o proxy do Vite ou Caddy redireciona)
const api = axios.create({
  baseURL: '/api',
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(
  (config) => {
    // Busca o token no localStorage (persistência de 72h)
    const trainerToken = localStorage.getItem('trainerAuthToken');
    const studentToken = localStorage.getItem('studentAuthToken');
    
    // Define qual token usar (prioridade para quem estiver logado)
    const token = trainerToken || studentToken;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta para tratamento de erros globais (Opcional, mas recomendado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aqui você pode tratar erros como 401 (Token expirado) no futuro
    return Promise.reject(error);
  }
);

export default api;