import axios from 'axios';

// Configuração da URL base
const api = axios.create({
  baseURL: '/api',
});

// Interceptor para adicionar o token automaticamente
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

    // 3. Injetar no header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;