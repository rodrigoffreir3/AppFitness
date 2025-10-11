// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ProfilePage() {
  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#007bff'); // Cor padrão

  // Estados de controle da página
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect para buscar os dados do perfil quando a página carrega
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get('/trainers/me');
        const profile = response.data;
        
        // Preenche os estados com os dados vindos da API
        setName(profile.name || '');
        setLogoUrl(profile.brand_logo_url || '');
        setPrimaryColor(profile.brand_primary_color || '#007bff');
        
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError('Não foi possível carregar os dados do seu perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // O endpoint PUT que já existe no nosso backend Go
      await api.put('/trainers/me', {
        name: name,
        brand_logo_url: logoUrl,
        brand_primary_color: primaryColor,
      });
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError(err.response?.data || 'Ocorreu um erro ao salvar suas alterações.');
    }
  };

  if (loading) {
    return <div>A carregar perfil...</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <Link to="/">&larr; Voltar para o Dashboard</Link>
      <h1 style={{ marginTop: '1rem' }}>Meu Perfil e Personalização</h1>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem', border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Seu Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>URL do seu Logo</label>
          <input
            type="text"
            placeholder="https://exemplo.com/logo.png"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Cor Primária da sua Marca</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={{ width: '50px', height: '50px', border: 'none', padding: 0, cursor: 'pointer' }}
            />
            <span>{primaryColor}</span>
          </div>
        </div>

        <button type="submit" style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;