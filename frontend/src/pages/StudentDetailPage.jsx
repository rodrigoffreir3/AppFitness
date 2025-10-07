// src/pages/StudentDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import CreateWorkoutForm from '../components/CreateWorkoutForm'; // <-- Importamos o novo componente

function StudentDetailPage() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false); // <-- Novo estado para controlar o formulário

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [studentId]);

  // Função chamada pelo formulário quando um novo treino é criado
  const handleWorkoutCreated = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]); // Adiciona o novo treino à lista
    setShowCreateForm(false); // Esconde o formulário
  };

  if (loading) return <div>A carregar...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;

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
      <Link to={`/workouts/${workout.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
        <strong>{workout.name}</strong> - {workout.description}
      </Link>
    </li>
            ))}
          </ul>
        ) : (
          <p>Este aluno ainda não tem nenhuma ficha de treino.</p>
        )}
        
        {/* Lógica para mostrar o botão ou o formulário */}
        <div style={{ marginTop: '1rem' }}>
          {!showCreateForm ? (
            <button onClick={() => setShowCreateForm(true)}>+ Criar Nova Ficha de Treino</button>
          ) : (
            <CreateWorkoutForm
              studentId={studentId}
              onWorkoutCreated={handleWorkoutCreated}
              onCancel={() => setShowCreateForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDetailPage;