// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importamos o Axios
import './Auth.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mensagens de erro
  const navigate = useNavigate();

  // Função que será chamada ao submeter o formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Usamos o axios para enviar um POST para a nossa API de login
      const response = await axios.post('http://localhost:8080/api/login', {
        email: email,
        password: password,
      });

      // Se a resposta for bem-sucedida (status 200), a API retorna o token
      const { token } = response.data;

      // Guardamos o token no localStorage do navegador.
      // Isto permite-nos "lembrar" que o utilizador está logado.
      localStorage.setItem('authToken', token);

      alert('Login bem-sucedido!');
      navigate('/'); // Redireciona para a página principal (dashboard)

    } catch (err) {
      // Se a API retornar um erro (ex: 401 Unauthorized)
      console.error("Erro no login:", err);
      if (err.response && err.response.data) {
        setError(err.response.data); // Mostra o erro vindo da API (ex: Email ou senha inválidos)
      } else {
        setError('Não foi possível conectar ao servidor.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login do Treinador</h2>
        
        {error && <p className="auth-error">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-button">Entrar</button>
        
        <p className="auth-link">
          Não tem uma conta? <Link to="/register">Crie uma agora</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;