// src/components/CreateWorkoutForm.jsx
import React, { useState } from 'react';
import api from '../services/api';

function CreateWorkoutForm({ studentId, onWorkoutCreated, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/workouts', {
        student_id: studentId,
        name,
        description,
      });
      alert('Ficha de treino criada com sucesso!');
      onWorkoutCreated(response.data); // Avisa a página pai que o treino foi criado
    } catch (err) {
      console.error("Erro ao criar treino:", err);
      setError(err.response?.data || 'Erro ao criar a ficha de treino.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem', borderRadius: '8px' }}>
      <h3>Nova Ficha de Treino</h3>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '0.5rem' }}>
          <label>Nome do Treino (ex: Treino A): </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>Descrição: </label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', minHeight: '60px' }}/>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Salvar Ficha</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default CreateWorkoutForm;