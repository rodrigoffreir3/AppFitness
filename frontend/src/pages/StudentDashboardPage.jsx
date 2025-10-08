// src/pages/StudentDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; // Usamos o nosso serviço de API centralizado

function StudentDashboardPage() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState(''); // Estado para o nome do aluno

  // O useEffect vai buscar os dados quando o componente carregar
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Usamos o nosso serviço de API para fazer o GET. O token do aluno será
        // adicionado automaticamente pelo nosso interceptor no 'api.js'.
        const response = await api.get('/students/me/workouts');
        setWorkouts(response.data);

        // Se quisermos o nome do aluno, teríamos que buscar de outro endpoint ou
        // idealmente, o backend poderia nos dar essa informação no futuro.
        // Por agora, vamos focar em exibir os treinos.

      } catch (err) {
        console.error("Erro ao buscar treinos do aluno:", err);
        setError('Não foi possível carregar seus treinos.');
        if (err.response && err.response.status === 401) {
          handleLogout(); // Se o token for inválido, faz logout
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []); // O array vazio [] significa que este efeito corre apenas uma vez.

  const handleLogout = () => {
    localStorage.removeItem('studentAuthToken');
    navigate('/student/login');
  };

  if (loading) {
    return <div>A carregar treinos...</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Meu Treino</h1>
        <button onClick={handleLogout} style={{ padding: '10px' }}>
          Sair
        </button>
      </div>
      
      <hr style={{ margin: '1rem 0' }} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {workouts.length > 0 ? (
        workouts.map(workout => (
          <div key={workout.id} style={{ marginBottom: '2rem', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
            <h2>{workout.name}</h2>
            <p><em>{workout.description}</em></p>
            {/* No próximo passo, tornaremos este um link para ver os exercícios */}
            <Link to={`/student/workout/${workout.id}`}>Ver Treino Detalhado</Link>
          </div>
        ))
      ) : (
        <p>Você ainda não tem nenhum treino ativo. Fale com o seu treinador!</p>
      )}
    </div>
  );
}

export default StudentDashboardPage;