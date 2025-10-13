// src/pages/StudentDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './StudentDashboard.css'; // 1. Importamos nossa nova folha de estilos

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
          localStorage.removeItem('studentAuthToken');
          localStorage.removeItem('brandingLogo');
          localStorage.removeItem('brandingColor');
          navigate('/student/login');
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
    // 2. Usamos classNames em vez de estilos inline
    <div className="dashboard-container">
      <h1>Meus Treinos</h1>
      <p>Clique em uma ficha para ver os detalhes e começar a treinar.</p>
      
      <hr />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {workouts.length > 0 ? (
        workouts.map(workout => (
          // 3. O Link agora tem um className para o estilo do card
          <Link key={workout.id} to={`/student/workout/${workout.id}`} className="workout-card">
            <div>
              <h2>{workout.name}</h2>
              <p><em>{workout.description}</em></p>
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
  );
}

export default StudentDashboardPage;