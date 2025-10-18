import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Removido Outlet daqui
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';

// Layouts - Agora os caminhos devem funcionar
import PublicLayout from './components/layout/PublicLayout.tsx';
import TrainerLayout from './components/layout/TrainerLayout.tsx';
import StudentLayout from './components/layout/StudentLayout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

// Páginas (Importe suas páginas reais aqui)
import IndexPage from './pages/Index.tsx';
import TrainerLogin from './pages/auth/TrainerLogin.tsx';
import StudentLogin from './pages/auth/StudentLogin.tsx';
import TrainerDashboard from './pages/trainer/Dashboard.tsx';
import StudentDashboard from './pages/student/Dashboard.tsx';
import NotFound from './pages/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />, // Página de erro genérica
    children: [
      // Rotas Públicas
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <IndexPage /> },
          { path: 'login/trainer', element: <TrainerLogin /> },
          { path: 'login/student', element: <StudentLogin /> },
        ]
      },
      // Rotas do Treinador
      {
        path: 'trainer',
        element: (
          <ProtectedRoute allowedRoles={['trainer']}>
            <TrainerLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'dashboard', element: <TrainerDashboard /> },
          // Adicione outras rotas do treinador aqui
        ],
      },
      // Rotas do Aluno
      {
        path: 'student',
        element: (
          <ProtectedRoute allowedRoles={['student']}>
            <StudentLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'dashboard', element: <StudentDashboard /> },
          // Adicione outras rotas do aluno aqui
        ],
      },
      { path: '*', element: <NotFound /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)