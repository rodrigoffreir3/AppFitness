// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa o useNavigate
import axios from 'axios'; // Importa o Axios
import './Auth.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para guardar mensagens de erro
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      // Usamos o axios para enviar um POST para a nossa API
      const response = await axios.post('http://localhost:8080/api/trainers', {
        name: name,
        email: email,
        password: password,
      });

      // Se a resposta for bem-sucedida (status 201)
      alert('Registo criado com sucesso!');
      navigate('/login'); // Redireciona para a página de login

    } catch (err) {
      // Se a API retornar um erro
      console.error("Erro no registo:", err);
      if (err.response && err.response.data) {
        setError(err.response.data); // Mostra o erro vindo da API (ex: email já em uso)
      } else {
        setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Criar Conta de Treinador</h2>
        
        {/* Mostra a mensagem de erro, se houver */}
        {error && <p className="auth-error">{error}</p>}

        {/* ... (o resto do formulário permanece igual) ... */}
        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="auth-button">Registar</button>
        <p className="auth-link">
          Já tem uma conta? <Link to="/login">Faça o login</Link>
        </p>
      </form>
    </div>
  );
}

// Adicione este estilo ao seu ficheiro Auth.css para a mensagem de erro
/*
.auth-error {
  color: #D8000C;
  background-color: #FFD2D2;
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1rem;
}
*/


export default RegisterPage;