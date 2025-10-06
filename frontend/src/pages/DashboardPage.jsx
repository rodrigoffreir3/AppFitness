// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
// ALTERAÇÃO: Importamos o Link para a navegação
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import AddStudentForm from '../components/AddStudentForm';
import EditStudentForm from '../components/EditStudentForm';

function DashboardPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data);
    } catch (err) {
      console.error("Erro ao buscar alunos:", err);
      setError('Não foi possível carregar a lista de alunos.');
      if (err.response && err.response.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleStudentAdded = (newStudent) => {
    setStudents([...students, newStudent]);
    setShowAddForm(false);
  };
  
  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm("Tem a certeza de que deseja apagar este aluno? Esta ação não pode ser desfeita.")) {
      return;
    }
    try {
      await api.delete(`/students/${studentId}`);
      setStudents(students.filter(student => student.id !== studentId));
      alert('Aluno apagado com sucesso!');
    } catch (err) {
      console.error("Erro ao apagar aluno:", err);
      setError('Não foi possível apagar o aluno.');
    }
  };

  const handleStudentUpdated = (updatedStudent) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setEditingStudent(null);
  };

  if (loading) {
    return <div>A carregar...</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard do Treinador</h1>
        <button onClick={handleLogout} style={{ padding: '10px' }}>
          Sair (Logout)
        </button>
      </div>
      
      <hr style={{ margin: '1rem 0' }} />

      <h2>Meus Alunos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {students.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {students.map(student => (
            <li key={student.id} style={{ padding: '0.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
              {/* ALTERAÇÃO: O nome do aluno agora é um link */}
              <Link to={`/students/${student.id}`} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                {student.name} ({student.email})
              </Link>
              <div>
                <button onClick={() => setEditingStudent(student)} style={{ marginRight: '0.5rem' }}>Editar</button>
                <button onClick={() => handleDeleteStudent(student.id)} style={{ backgroundColor: '#dc3545', color: 'white' }}>Apagar</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você ainda não tem alunos registados.</p>
      )}

      <div style={{ marginTop: '2rem' }}>
        {editingStudent && (
          <EditStudentForm
            studentToEdit={editingStudent}
            onStudentUpdated={handleStudentUpdated}
            onCancel={() => setEditingStudent(null)}
          />
        )}

        {!showAddForm && !editingStudent && (
          <button onClick={() => setShowAddForm(true)}>+ Adicionar Novo Aluno</button>
        )}

        {showAddForm && (
          <AddStudentForm
            onStudentAdded={handleStudentAdded}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;