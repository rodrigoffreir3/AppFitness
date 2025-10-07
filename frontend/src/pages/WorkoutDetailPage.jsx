// src/pages/WorkoutDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import AddExerciseToWorkoutForm from '../components/AddExerciseToWorkoutForm';
import EditWorkoutExerciseForm from '../components/EditWorkoutExerciseForm'; // <-- Importamos o novo componente

function WorkoutDetailPage() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null); // <-- Novo estado para controlar a edição

  const fetchWorkoutData = async () => {
    setLoading(true);
    try {
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

  useEffect(() => {
    fetchWorkoutData();
  }, [workoutId]);

  const handleExerciseAdded = () => {
    fetchWorkoutData(); // Recarrega todos os dados para garantir consistência
    setShowAddForm(false);
  };

  const handleExerciseUpdated = () => {
    fetchWorkoutData(); // Recarrega todos os dados
    setEditingExercise(null); // Fecha o formulário de edição
  };

  // --- NOVA FUNÇÃO PARA APAGAR UM EXERCÍCIO ---
  const handleExerciseDeleted = async (workoutExerciseId) => {
    if (!window.confirm("Tem a certeza de que deseja remover este exercício do treino?")) {
      return;
    }
    try {
      await api.delete(`/workouts/${workoutId}/exercises/${workoutExerciseId}`);
      alert('Exercício removido com sucesso!');
      // A forma mais simples de atualizar a lista é recarregá-la
      fetchWorkoutData();
    } catch (err) {
      console.error("Erro ao remover exercício:", err);
      setError(err.response?.data || 'Erro ao remover exercício.');
    }
  };

  if (loading) return <div>A carregar...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
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
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {exercises.map(ex => (
              <li key={ex.id} style={{ marginBottom: '1rem', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{ex.order}. {ex.exercise_name}</strong>
                  <div>
                    <button onClick={() => setEditingExercise(ex)} style={{ marginRight: '0.5rem' }}>Editar</button>
                    <button onClick={() => handleExerciseDeleted(ex.id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>Apagar</button>
                  </div>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span>{ex.sets}x {ex.reps}, {ex.rest_period_seconds}s de descanso</span>
                  <p style={{ marginTop: '0.25rem' }}><em>Notas: {ex.notes}</em></p>
                  <p style={{ marginTop: '0.25rem', color: '#555' }}>Execução: {ex.execution_details}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Esta ficha de treino ainda não tem exercícios.</p>
        )}

        <div style={{ marginTop: '1rem' }}>
          {editingExercise && (
            <EditWorkoutExerciseForm
              workoutId={workoutId}
              exerciseToEdit={editingExercise}
              onExerciseUpdated={handleExerciseUpdated}
              onCancel={() => setEditingExercise(null)}
            />
          )}

          {!showAddForm && !editingExercise && (
            <button onClick={() => setShowAddForm(true)}>+ Adicionar Exercício</button>
          )}

          {showAddForm && (
            <AddExerciseToWorkoutForm
              workoutId={workoutId}
              onExerciseAdded={handleExerciseAdded}
              onCancel={() => setShowAddForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkoutDetailPage;