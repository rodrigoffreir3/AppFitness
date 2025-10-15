// src/pages/StudentDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './StudentDashboard.css';

function StudentDashboardPage() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.get('/students/me/workouts');
        setWorkouts(response.data);
      } catch (err) {
        console.error("Erro ao buscar treinos do aluno:", err);
        setError('Não foi possível carregar seus treinos.');
        if (err.response && err.response.status === 401) {
          // A lógica de logout já está no StudentLayout, que redirecionará se necessário
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [navigate]);

  if (loading) {
    return <div style={{textAlign: 'center', padding: '4rem'}}>A carregar treinos...</div>;
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Seu Plano de Treino</h1>
        <p>Consistência é a chave para o sucesso. Vamos lá!</p>
      </div>

      {error && <p style={{ color: '#ef4444', marginBottom: '1.5rem' }}>{error}</p>}

      <div className="workouts-grid">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <Link key={workout.id} to={`/student/workout/${workout.id}`} style={{ textDecoration: 'none' }}>
              <div className="workout-card">
                <div>
                  <h2>{workout.name}</h2>
                  <p className="description">{workout.description || 'Um treino focado nos seus objetivos.'}</p>
                </div>
                <div className="workout-card-footer">
                  <div className="start-workout-btn">
                    Iniciar Treino
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="workout-card">
            <h2>Nenhum treino encontrado</h2>
            <p className="description">Parece que você ainda não tem um treino ativo. Peça para seu treinador criar um para você!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboardPage;