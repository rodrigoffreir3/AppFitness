import axios from 'axios';

// Em vez de apontar para uma porta específica (localhost:8080),
// apontamos para a raiz do site. O Caddy irá redirecionar.
const api = axios.create({
  baseURL: '/api', // Mude de 'http://localhost:8080/api' para apenas '/api'
});
// --- FIM DA CORREÇÃO ---

// Interceptor para adicionar o token (Lógica existente)
api.interceptors.request.use(
  (config) => {
    // Tenta obter o token de trainer ou student
    const trainerToken = localStorage.getItem('trainerAuthToken');
    const studentToken = localStorage.getItem('studentAuthToken');
    
    // Usa o token que estiver disponível
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

export default api;