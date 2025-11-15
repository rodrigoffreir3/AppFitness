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

// Páginas Públicas
import IndexPage from './pages/Index.tsx';
import TrainerLogin from './pages/auth/TrainerLogin.tsx';
import StudentLogin from './pages/auth/StudentLogin.tsx';
import TrainerSignUp from './pages/auth/TrainerSignUp.tsx';
import NotFound from './pages/NotFound.tsx';

// Páginas do Treinador
import TrainerDashboard from './pages/trainer/Dashboard.tsx';
import TrainerWorkoutDetails from './pages/trainer/TrainerWorkoutDetails.tsx';
// --- 1. IMPORTAR TODAS AS NOSSAS VIEWS ---
import DashboardHomeView from './components/trainer/DashboardHomeView.tsx';
import StudentsView from './components/trainer/StudentsView.tsx';
import WorkoutsView from './components/trainer/WorkoutsView.tsx';
import ExercisesView from './components/trainer/ExercisesView.tsx';
import ChatView from './components/trainer/ChatView.tsx';
import AnnouncementsView from './components/trainer/AnnouncementsView.tsx';
import WhiteLabelSettings from './components/trainer/WhiteLabelSettings.tsx';

// Páginas do Aluno
import StudentDashboard from './pages/student/Dashboard.tsx';
import WorkoutDetails from './pages/student/WorkoutDetails.tsx';


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
        // --- 2. ATUALIZAR AS ROTAS FILHAS ---
        children: [
          {
            path: 'dashboard', // A base é /trainer/dashboard
            element: <TrainerDashboard />,
            // Rotas filhas (o que a Sidebar controla)
            children: [
              { index: true, element: <DashboardHomeView /> }, // A "home"
              { path: 'students', element: <StudentsView /> },
              { path: 'workouts', element: <WorkoutsView /> },
              { path: 'exercises', element: <ExercisesView /> },
              { path: 'chat', element: <ChatView /> },
              { path: 'announcements', element: <AnnouncementsView /> },
              { path: 'settings', element: <WhiteLabelSettings /> },
            ]
          },
          // A página de detalhes do treino fica separada (como estava)
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