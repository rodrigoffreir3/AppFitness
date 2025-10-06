// src/components/AddStudentForm.jsx
import React, { useState } from 'react';
import api from '../services/api';

// O componente recebe duas "propriedades":
// onStudentAdded: uma função para nos avisar quando um aluno for adicionado.
// onCancel: uma função para fechar o formulário.
function AddStudentForm({ onStudentAdded, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/students', { name, email, password });
      alert('Aluno adicionado com sucesso!');
      onStudentAdded(response.data); // Avisa o componente pai que o aluno foi adicionado
    } catch (err) {
      console.error("Erro ao adicionar aluno:", err);
      setError(err.response?.data || 'Erro ao adicionar aluno.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem', borderRadius: '8px' }}>
      <h3>Cadastrar Novo Aluno</h3>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '0.5rem' }}>
          <label>Nome: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>Senha Provisória: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Salvar Aluno</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default AddStudentForm;