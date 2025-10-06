// src/services/api.js
import axios from 'axios';

// Cria uma "instância" do axios com configurações pré-definidas.
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // A URL base da nossa API Go
});

// Isto é um "interceptor". Ele "intercepta" cada pedido antes de ser enviado.
api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Se o token existir, adiciona-o ao cabeçalho de Authorization
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Exportamos a nossa instância configurada do api para ser usada em todo o projeto.
export default api;