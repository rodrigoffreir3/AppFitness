import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';

// Layouts
import PublicLayout from './components/layout/PublicLayout.tsx';
import TrainerLayout from './components/layout/TrainerLayout.tsx';
import StudentLayout from './components/layout/StudentLayout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

// Páginas
import IndexPage from './pages/Index.tsx';
import TrainerLogin from './pages/auth/TrainerLogin.tsx';
import StudentLogin from './pages/auth/StudentLogin.tsx';
import TrainerSignUp from './pages/auth/TrainerSignUp.tsx'; // Importação do passo anterior
import TrainerDashboard from './pages/trainer/Dashboard.tsx';
import StudentDashboard from './pages/student/Dashboard.tsx';
import WorkoutDetails from './pages/student/WorkoutDetails.tsx';
import NotFound from './pages/NotFound.tsx';

// --- 1. IMPORTAR A NOVA PÁGINA ---
import TrainerWorkoutDetails from './pages/trainer/TrainerWorkoutDetails.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // Rotas Públicas
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <IndexPage /> },
          { path: 'login/trainer', element: <TrainerLogin /> },
          { path: 'login/student', element: <StudentLogin /> },
          { path: 'signup/trainer', element: <TrainerSignUp /> }, 
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
          // --- 2. ADICIONAR A NOVA ROTA ---
          { path: 'workout/:workoutId', element: <TrainerWorkoutDetails /> },
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
          { path: 'workout/:workoutId', element: <WorkoutDetails /> },
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