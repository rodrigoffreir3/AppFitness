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

// Interceptor de Resposta: O "Limpa Trilhos" Automático
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, config } = error.response;
      
      // Logout forçado em caso de erro 401 ou 404 em rotas de perfil
      if (status === 401 || (status === 404 && config.url.includes('/me'))) {
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

// --- ADICIONADO: Função Auxiliar de Upload ---
// Usa a instância 'api' acima, então já vai com Token de autenticação
export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            // Authorization é injetado automaticamente pelo interceptor acima
        }
    });

    return response.data.url; // Retorna ex: "/uploads/xyz.pdf"
};