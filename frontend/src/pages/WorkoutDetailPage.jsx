// src/pages/WorkoutDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function WorkoutDetailPage() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscamos os detalhes do treino e a lista de exercícios associados
        const [workoutResponse, exercisesResponse] = await Promise.all([
          api.get(`/workouts/${workoutId}`),
          api.get(`/workouts/${workoutId}/exercises`)
        ]);

        setWorkout(workoutResponse.data);
        setExercises(exercisesResponse.data);
      } catch (err) {
        console.error("Erro ao buscar dados do treino:", err);
        setError('Não foi possível carregar os dados do treino.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workoutId]);

  if (loading) return <div>A carregar...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      {/* O 'workout?' é uma verificação para garantir que o workout não é nulo antes de tentar aceder ao studentId */}
      {workout && <Link to={`/students/${workout.student_id}`}>&larr; Voltar para a página do aluno</Link>}

      {workout && (
        <div style={{ marginTop: '1rem' }}>
          <h1>{workout.name}</h1>
          <p>{workout.description}</p>
        </div>
      )}

      <hr style={{ margin: '1.5rem 0' }} />

      <div>
        <h2>Exercícios do Treino</h2>
        {exercises.length > 0 ? (
          <ul>
            {exercises.map(ex => (
              <li key={ex.id}>
                <strong>{ex.exercise_name}</strong> ({ex.sets}x {ex.reps})
                <p style={{ marginLeft: '1rem', color: '#555' }}><em>{ex.execution_details}</em></p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Esta ficha de treino ainda não tem exercícios.</p>
        )}

        <button style={{ marginTop: '1rem' }}>+ Adicionar Exercício</button>
      </div>
    </div>
  );
}

export default WorkoutDetailPage;