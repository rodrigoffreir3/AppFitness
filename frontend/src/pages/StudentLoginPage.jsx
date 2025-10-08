// src/pages/StudentLoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Reutilizamos o nosso serviço de API
import './Auth.css'; // Reutilizamos o mesmo estilo

function StudentLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Chamamos o endpoint de login do aluno que já criámos
      const response = await api.post('/students/login', { email, password });

      const { token } = response.data;

      // Guardamos o token. Usamos uma chave diferente para não dar conflito com o token do treinador.
      localStorage.setItem('studentAuthToken', token);

      alert('Login de aluno bem-sucedido!');
      navigate('/student/dashboard'); // Redireciona para o futuro dashboard do aluno

    } catch (err) {
      console.error("Erro no login do aluno:", err);
      setError(err.response?.data || 'Erro ao tentar fazer login.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Área do Aluno</h2>

        {error && <p className="auth-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="auth-button">Entrar</button>

        {/* Link para a página de login do treinador, caso ele caia aqui por engano */}
        <p className="auth-link">
          <Link to="/login">Acessar como Treinador</Link>
        </p>
      </form>
    </div>
  );
}

export default StudentLoginPage;