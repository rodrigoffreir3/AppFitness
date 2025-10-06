// src/components/EditStudentForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

// O componente recebe o aluno a ser editado (studentToEdit) e as funções de controlo
function EditStudentForm({ studentToEdit, onStudentUpdated, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // O useEffect aqui serve para pré-preencher o formulário quando o componente aparece
  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setEmail(studentToEdit.email);
    }
  }, [studentToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Usamos o método 'put' do axios para o nosso endpoint de atualização
      await api.put(`/students/${studentToEdit.id}`, { name, email });
      alert('Aluno atualizado com sucesso!');
      // Avisa o componente pai que a atualização foi feita, passando os novos dados
      onStudentUpdated({ ...studentToEdit, name, email });
    } catch (err) {
      console.error("Erro ao atualizar aluno:", err);
      setError(err.response?.data || 'Erro ao atualizar aluno.');
    }
  };

  if (!studentToEdit) return null; // Não mostra nada se não houver um aluno para editar

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem', borderRadius: '8px' }}>
      <h3>Editar Aluno: {studentToEdit.name}</h3>
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
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Salvar Alterações</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditStudentForm;