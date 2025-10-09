// src/pages/StudentWorkoutDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function StudentWorkoutDetailPage() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        // ATENÇÃO: Precisaremos de um novo endpoint para buscar os detalhes de um treino específico para o aluno.
        const response = await api.get(`/students/me/workouts/${workoutId}`);
        setWorkout(response.data.workout);
        setExercises(response.data.exercises);
      } catch (err) {
        console.error("Erro ao buscar detalhes do treino:", err);
        setError('Não foi possível carregar os detalhes do treino.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [workoutId]);

  if (loading) return <div>A carregar detalhes do treino...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <Link to="/student/dashboard">&larr; Voltar para Meus Treinos</Link>

      {workout && (
        <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
          <h1>{workout.name}</h1>
          <p>{workout.description}</p>
        </div>
      )}

      <hr />

      <h2 style={{ marginTop: '1.5rem' }}>Seus Exercícios</h2>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {exercises.map(ex => (
          <li key={ex.id} style={{ marginBottom: '1.5rem', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
            <strong style={{ fontSize: '1.2rem' }}>{ex.order}. {ex.exercise_name}</strong>
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontWeight: 'bold' }}>{ex.sets} séries x {ex.reps} reps</span>
              <span style={{ marginLeft: '1rem' }}>({ex.rest_period_seconds}s de descanso)</span>
            </div>
            {ex.notes && <p style={{ marginTop: '0.5rem' }}><em>Notas: {ex.notes}</em></p>}
            {ex.execution_details && (
              <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#f0f2f5', borderRadius: '4px' }}>
                <strong>Instruções de Execução:</strong>
                <p style={{ color: '#333', whiteSpace: 'pre-wrap' }}>{ex.execution_details}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentWorkoutDetailPage;