// src/pages/StudentWorkoutDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import './StudentWorkoutDetail.css'; // Importamos os novos estilos

function StudentWorkoutDetailPage() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
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

  if (loading) return <div style={{textAlign: 'center', marginTop: '2rem'}}>A carregar detalhes do treino...</div>;
  if (error) return <div style={{ color: '#ff5555', padding: '2rem' }}>{error}</div>;

  return (
    <div>
      <Link to="/student/dashboard" style={{marginBottom: '1.5rem', display: 'inline-block'}}>&larr; Voltar para Meus Treinos</Link>

      {workout && (
        <div className="workout-detail-header">
          <h1>{workout.name}</h1>
          <p>{workout.description}</p>
        </div>
      )}

      <ul className="exercise-list">
        {exercises.map((ex, index) => (
          <li key={ex.id} className="exercise-card">
            <div className="exercise-card-header">
              <div className="exercise-order">{index + 1}</div>
              <h2 className="exercise-name">{ex.exercise_name}</h2>
            </div>
            
            <div className="exercise-details-grid">
              <div className="detail-item">
                <div className="detail-item-label">Séries</div>
                <div className="detail-item-value">{ex.sets}</div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Repetições</div>
                <div className="detail-item-value">{ex.reps}</div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Descanso</div>
                <div className="detail-item-value">{ex.rest_period_seconds}s</div>
              </div>
            </div>

            {ex.notes && (
              <div className="notes-section">
                <strong>Notas do Treinador:</strong>
                <p>{ex.notes}</p>
              </div>
            )}
            {ex.execution_details && (
              <div className="notes-section">
                <strong>Instruções de Execução:</strong>
                <p>{ex.execution_details}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentWorkoutDetailPage;