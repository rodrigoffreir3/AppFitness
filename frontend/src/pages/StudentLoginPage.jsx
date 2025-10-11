// src/pages/StudentLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import './Auth.css'; 

function StudentLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // --- NOVO ESTADO E EFEITO ---
  // Estados para guardar as informações de branding
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#007bff'); // Cor padrão

  // Este efeito aplica a cor customizada ao fundo e botões
  useEffect(() => {
    // Usando variáveis CSS para aplicar a cor dinamicamente
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [primaryColor]);
  // --- FIM DO NOVO BLOCO ---

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/students/login', { email, password });

      // --- MUDANÇA AQUI: Capturamos o token E o branding ---
      const { token, branding } = response.data;

      localStorage.setItem('studentAuthToken', token);
      
      // Guardamos o branding no localStorage para usar em outras páginas
      if (branding) {
        localStorage.setItem('brandingLogo', branding.logo_url || '');
        localStorage.setItem('brandingColor', branding.primary_color || '#007bff');
        setLogoUrl(branding.logo_url);
        setPrimaryColor(branding.primary_color);
      }
      // --- FIM DA MUDANÇA ---

      alert('Login de aluno bem-sucedido!');
      navigate('/student/dashboard');

    } catch (err) {
      console.error("Erro no login do aluno:", err);
      setError(err.response?.data || 'Erro ao tentar fazer login.');
    }
  };

  return (
    // Aplicamos a cor de fundo dinamicamente
    <div className="auth-container" style={{ backgroundColor: primaryColor, transition: 'background-color 0.5s' }}>
      <form className="auth-form" onSubmit={handleSubmit}>
        
        {/* --- NOVO BLOCO: Exibir o Logo --- */}
        {logoUrl && (
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img src={logoUrl} alt="Logo do Treinador" style={{ maxHeight: '80px', maxWidth: '200px' }} />
          </div>
        )}
        {/* --- FIM DO NOVO BLOCO --- */}
        
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

        {/* Aplicamos a cor do botão dinamicamente */}
        <button type="submit" className="auth-button" style={{ backgroundColor: primaryColor }}>Entrar</button>

        <p className="auth-link">
          <Link to="/login" style={{color: primaryColor}}>Acessar como Treinador</Link>
        </p>
      </form>
    </div>
  );
}

export default StudentLoginPage;