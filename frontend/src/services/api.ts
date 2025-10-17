import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Interceptor para adicionar o token de autenticação a cada requisição
api.interceptors.request.use(
  (config) => {
    // Tenta pegar o token do treinador primeiro
    let token = localStorage.getItem('trainerAuthToken');

    // Se não encontrar, tenta pegar o do aluno
    if (!token) {
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

export default api;
