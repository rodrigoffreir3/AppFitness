// src/components/StudentProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Este componente verifica se o ALUNO está autenticado
const StudentProtectedRoute = () => {
  // Procuramos pelo token específico do aluno
  const token = localStorage.getItem('studentAuthToken');

  if (!token) {
    // Se não houver token de aluno, redireciona para a página de login de aluno
    return <Navigate to="/student/login" replace />;
  }

  // Se houver um token, renderiza a página protegida (o dashboard do aluno)
  return <Outlet />;
};

export default StudentProtectedRoute;