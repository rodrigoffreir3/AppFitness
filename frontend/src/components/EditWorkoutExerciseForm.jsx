// src/components/EditWorkoutExerciseForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function EditWorkoutExerciseForm({ workoutId, exerciseToEdit, onExerciseUpdated, onCancel }) {
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [rest, setRest] = useState('');
  const [notes, setNotes] = useState('');
  const [executionDetails, setExecutionDetails] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (exerciseToEdit) {
      setSets(exerciseToEdit.sets);
      setReps(exerciseToEdit.reps);
      setRest(exerciseToEdit.rest_period_seconds);
      setNotes(exerciseToEdit.notes);
      setExecutionDetails(exerciseToEdit.execution_details);
    }
  }, [exerciseToEdit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      // Usamos o endpoint PUT para atualizar o exercício específico (we_id)
      await api.put(`/workouts/${workoutId}/exercises/${exerciseToEdit.id}`, {
        sets: parseInt(sets, 10),
        reps,
        rest_period_seconds: parseInt(rest, 10),
        notes,
        execution_details: executionDetails,
      });
      alert('Exercício atualizado com sucesso!');
      onExerciseUpdated(); // Avisa o componente pai para recarregar os dados
    } catch (err) {
      console.error("Erro ao atualizar exercício:", err);
      setError(err.response?.data || 'Erro ao atualizar exercício.');
    }
  };

  if (!exerciseToEdit) return null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem', borderRadius: '8px' }}>
      <h3>Editando: {exerciseToEdit.exercise_name}</h3>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}

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
          <label>Detalhes da Execução: </label>
          <textarea value={executionDetails} onChange={(e) => setExecutionDetails(e.target.value)} style={{ width: '100%', minHeight: '80px' }}/>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Salvar Alterações</button>
          <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default EditWorkoutExerciseForm;