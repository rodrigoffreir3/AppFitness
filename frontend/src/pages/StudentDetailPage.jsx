// src/pages/StudentDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api'; // Importamos o nosso serviço de API

function StudentDetailPage() {
  const { studentId } = useParams();

  // Estados para guardar os dados que vamos buscar
  const [student, setStudent] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Usamos Promise.all para fazer as duas chamadas à API em paralelo
        const [studentResponse, workoutsResponse] = await Promise.all([
          api.get(`/students/${studentId}`),
          api.get(`/workouts?student_id=${studentId}`)
        ]);

        setStudent(studentResponse.data);
        setWorkouts(workoutsResponse.data);
      } catch (err) {
        console.error("Erro ao buscar dados do aluno:", err);
        setError('Não foi possível carregar os dados do aluno.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]); // O [studentId] garante que o useEffect corre de novo se o ID na URL mudar

  if (loading) {
    return <div>A carregar...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <Link to="/">&larr; Voltar para o Dashboard</Link>
      
      {student && (
        <div style={{ marginTop: '1rem' }}>
          <h1>{student.name}</h1>
          <p>{student.email}</p>
        </div>
      )}
      
      <hr style={{ margin: '1.5rem 0' }} />

      <div>
        <h2>Fichas de Treino</h2>
        {workouts.length > 0 ? (
          <ul>
            {workouts.map(workout => (
              <li key={workout.id}>
                <strong>{workout.name}</strong> - {workout.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>Este aluno ainda não tem nenhuma ficha de treino.</p>
        )}
        
        {/* Futuramente, o botão para criar um novo treino virá aqui */}
        <button style={{ marginTop: '1rem' }}>+ Criar Nova Ficha de Treino</button>
      </div>
    </div>
  );
}

export default StudentDetailPage;