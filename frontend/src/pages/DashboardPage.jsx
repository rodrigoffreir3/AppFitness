// src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('authToken');
    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <div>
      <h1>Dashboard do Treinador</h1>
      <p>Bem-vindo! Esta é a sua área privada.</p>
      <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px' }}>
        Sair (Logout)
      </button>
    </div>
  );
}

export default DashboardPage;