// src/components/AddExerciseToWorkoutForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function AddExerciseToWorkoutForm({ workoutId, onExerciseAdded, onCancel }) {
  // Estado para todos os exercícios da biblioteca (para o dropdown)
  const [libraryExercises, setLibraryExercises] = useState([]);

  // Estados para os campos do formulário
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [rest, setRest] = useState('');
  const [notes, setNotes] = useState('');
  const [executionDetails, setExecutionDetails] = useState('');
  const [error, setError] = useState('');

  // Busca todos os exercícios da biblioteca quando o componente é montado
  useEffect(() => {
    const fetchLibraryExercises = async () => {
      try {
        // Precisamos criar este endpoint no backend
        const response = await api.get('/exercises'); 
        setLibraryExercises(response.data);
        if (response.data.length > 0) {
          setSelectedExerciseId(response.data[0].id); // Seleciona o primeiro por padrão
        }
      } catch (err) {
        console.error("Erro ao buscar exercícios da biblioteca:", err);
        setError('Não foi possível carregar a lista de exercícios.');
      }
    };
    fetchLibraryExercises();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await api.post(`/workouts/${workoutId}/exercises`, {
        exercise_id: selectedExerciseId,
        sets: parseInt(sets, 10),
        reps,
        rest_period_seconds: parseInt(rest, 10),
        notes,
        execution_details: executionDetails,
        order: 1, // Por agora, a ordem é sempre 1. Podemos melhorar isto depois.
      });
      alert('Exercício adicionado com sucesso!');
      onExerciseAdded(response.data);
    } catch (err) {
      console.error("Erro ao adicionar exercício:", err);
      setError(err.response?.data || 'Erro ao adicionar exercício.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem', borderRadius: '8px' }}>
      <h3>Adicionar Exercício ao Treino</h3>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ marginBottom: '0.5rem' }}>
          <label>Exercício: </label>
          <select value={selectedExerciseId} onChange={(e) => setSelectedExerciseId(e.target.value)} required>
            {libraryExercises.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
          <div>
            <label>Séries: </label>
            <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} required style={{ width: '60px' }} />
          </div>
          <div>
            <label>Reps: </label>
            <input type="text" value={reps} onChange={(e) => setReps(e.target.value)} required style={{ width: '80px' }}/>
          </div>
          <div>
            <label>Descanso (s): </label>
            <input type="number" value={rest} onChange={(e) => setRest(e.target.value)} style={{ width: '60px' }}/>
          </div>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>Observações: </label>
          <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: '100%' }}/>
        </div>

        <div style={{ marginBottom: '0.5rem' }}>
          <label>Detalhes da Execução (para o aluno): </label>
          <textarea value={executionDetails} onChange={(e) => setExecutionDetails(e.target.value)} style={{ width: '100%', minHeight: '80px' }}/>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Salvar Exercício</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default AddExerciseToWorkoutForm;