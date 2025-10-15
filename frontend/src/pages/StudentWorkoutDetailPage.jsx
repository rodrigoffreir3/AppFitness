// src/pages/StudentWorkoutDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import './StudentWorkoutDetail.css';

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

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>A carregar detalhes do treino...</div>;
  if (error) return <div style={{ color: '#ef4444', padding: '2rem' }}>{error}</div>;

  return (
    <div>
      <Link to="/student/dashboard" className="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        Voltar aos Treinos
      </Link>

      {workout && (
        <div className="workout-header">
          <h1>{workout.name}</h1>
          <p>{workout.description}</p>
        </div>
      )}

      <ul className="exercise-list">
        {exercises.map(ex => (
          <li key={ex.id} className="exercise-card">
            <div className="exercise-image-container">
              {/* No futuro, usaremos ex.image_url aqui */}
              {/* <img src={ex.image_url} alt={ex.exercise_name} /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#cbd5e1" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
              </svg>
            </div>
            <div className="exercise-content">
              <div className="exercise-header">
                <h2>{ex.exercise_name}</h2>
              </div>
              <div className="exercise-info-grid">
                <div className="info-item">
                  <div className="label">Séries</div>
                  <div className="value">{ex.sets}</div>
                </div>
                <div className="info-item">
                  <div className="label">Reps</div>
                  <div className="value">{ex.reps}</div>
                </div>
                <div className="info-item">
                  <div className="label">Descanso</div>
                  <div className="value">{ex.rest_period_seconds}s</div>
                </div>
              </div>

              {(ex.notes || ex.execution_details) && (
                <div className="notes-section">
                  {ex.execution_details && (
                    <div>
                      <h3>Como Executar</h3>
                      <p>{ex.execution_details}</p>
                    </div>
                  )}
                  {ex.notes && (
                    <div style={{marginTop: ex.execution_details ? '1.5rem' : '0'}}>
                      <h3>Notas do Treinador</h3>
                      <p>{ex.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentWorkoutDetailPage;
