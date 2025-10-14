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
          // A lógica de logout agora está no StudentLayout
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [navigate]);

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '2rem'}}>A carregar treinos...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Meus Treinos</h1>
      <p className="subtitle">Seu plano de treino semanal. Vamos começar!</p>

      {error && <p style={{ color: '#ff5555' }}>{error}</p>}

      <div className="workout-grid">
        {workouts.length > 0 ? (
          workouts.map(workout => (
            <Link key={workout.id} to={`/student/workout/${workout.id}`} className="workout-card">
              <div>
                <h2>{workout.name}</h2>
                <p><em>{workout.description || 'Descrição não disponível.'}</em></p>
              </div>
              <div className="card-footer">
                <span>Ver Treino</span>
                <span>→</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="workout-card">
            <h2>Nenhum treino encontrado</h2>
            <p>Você ainda não tem nenhum treino ativo. Fale com o seu treinador!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboardPage;