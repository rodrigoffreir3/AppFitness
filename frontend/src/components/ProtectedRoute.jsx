// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Este componente verifica se o utilizador está autenticado
const ProtectedRoute = () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Se não houver token, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se houver um token, renderiza o componente filho (a página protegida)
  return <Outlet />;
};

export default ProtectedRoute;