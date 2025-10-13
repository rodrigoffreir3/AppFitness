// src/components/StudentLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function StudentLayout() {
  const navigate = useNavigate();
  
  // Estados para buscar o branding do localStorage
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#007bff');

  useEffect(() => {
    // Busca os dados de branding que salvamos durante o login
    const savedLogo = localStorage.getItem('brandingLogo');
    const savedColor = localStorage.getItem('brandingColor');
    
    if (savedLogo) setLogoUrl(savedLogo);
    if (savedColor) setPrimaryColor(savedColor);

    // Aplica a cor como uma variável CSS global para que todos os componentes filhos possam usá-la
    document.documentElement.style.setProperty('--primary-color', savedColor || '#007bff');
  }, []);

  const handleLogout = () => {
    // Limpa tudo relacionado ao aluno
    localStorage.removeItem('studentAuthToken');
    localStorage.removeItem('brandingLogo');
    localStorage.removeItem('brandingColor');
    navigate('/student/login');
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header style={{ 
        backgroundColor: primaryColor, 
        color: 'white', 
        padding: '1rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" style={{ maxHeight: '40px', filter: 'brightness(0) invert(1)' }} />
        ) : (
          <h2 style={{margin: 0}}>App Fitness</h2>
        )}
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '8px 16px', 
            border: '1px solid white', 
            backgroundColor: 'transparent', 
            color: 'white', 
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          Sair
        </button>
      </header>

      <main style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        {/* O <Outlet> é onde as nossas páginas (Dashboard, Detalhe do Treino) serão renderizadas */}
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;
