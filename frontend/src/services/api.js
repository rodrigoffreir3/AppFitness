// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// O interceptor agora é mais inteligente
api.interceptors.request.use(
  (config) => {
    // Procura primeiro pelo token do aluno
    let token = localStorage.getItem('studentAuthToken');

    // Se não encontrar o token do aluno, procura pelo do treinador
    if (!token) {
      token = localStorage.getItem('authToken');
    }

    if (token) {
      // Adiciona o token encontrado ao cabeçalho
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;