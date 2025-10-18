import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children?: React.ReactNode; // Outlet será passado implicitamente
  allowedRoles: Array<'trainer' | 'student'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userType } = useAuth();
  const fallbackPath = userType === 'trainer' ? '/login/trainer' : '/login/student';

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login apropriada
    console.log("ProtectedRoute: Não autenticado, redirecionando para", fallbackPath);
    return <Navigate to={fallbackPath} replace />;
  }

  if (!userType || !allowedRoles.includes(userType)) {
    // Se o tipo de usuário não for permitido para esta rota, redireciona ou mostra erro
    console.warn(`ProtectedRoute: Acesso não autorizado para ${userType} na rota ${allowedRoles.join(',')}`);
    // Poderíamos redirecionar para uma página de "não autorizado" ou de volta ao dashboard
    return <Navigate to="/" replace />; // Redireciona para a landing page por segurança
  }

  // Se autenticado e autorizado, renderiza o conteúdo da rota (o Layout + Outlet)
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;