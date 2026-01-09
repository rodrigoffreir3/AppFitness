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

// Páginas e Views do Treinador
import TrainerDashboard from './pages/trainer/Dashboard.tsx';
import TrainerWorkoutDetails from './pages/trainer/TrainerWorkoutDetails.tsx';
import DashboardHomeView from './components/trainer/DashboardHomeView.tsx';
import StudentsView from './components/trainer/StudentsView.tsx';
import WorkoutsView from './components/trainer/WorkoutsView.tsx';
import DietsView from './components/trainer/DietsView.tsx'; // --- NOVO IMPORT ---
import ExercisesView from './components/trainer/ExercisesView.tsx';
import ChatView from './components/trainer/ChatView.tsx';
import AnnouncementsView from './components/trainer/AnnouncementsView.tsx';
import WhiteLabelSettings from './components/trainer/WhiteLabelSettings.tsx';

// Páginas e Views do Aluno
import StudentDashboard from './pages/student/Dashboard.tsx';
import WorkoutDetails from './pages/student/WorkoutDetails.tsx';
import MyWorkoutsView from './components/student/MyWorkoutsView.tsx';
import StudentDietsView from './components/student/StudentDietsView.tsx'; // --- NOVO IMPORT ---
import StudentChatView from './components/student/StudentChatView.tsx';
import StudentAnnouncementsView from './components/student/StudentAnnouncementsView.tsx';


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
          {
            path: 'dashboard',
            element: <TrainerDashboard />, // Agora age apenas como um <Outlet />
            children: [
              { index: true, element: <DashboardHomeView /> },
              { path: 'students', element: <StudentsView /> },
              { path: 'workouts', element: <WorkoutsView /> },
              { path: 'diets', element: <DietsView /> }, // --- NOVA ROTA ---
              { path: 'exercises', element: <ExercisesView /> },
              { path: 'chat', element: <ChatView /> },
              { path: 'announcements', element: <AnnouncementsView /> },
              { path: 'settings', element: <WhiteLabelSettings /> },
            ]
          },
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
          { 
            path: 'dashboard', 
            element: <StudentDashboard />, // Agora age apenas como um <Outlet />
            children: [
              { index: true, element: <MyWorkoutsView /> }, 
              { path: 'diets', element: <StudentDietsView /> }, // --- NOVA ROTA ---
              { path: 'chat', element: <StudentChatView /> },
              { path: 'announcements', element: <StudentAnnouncementsView /> },
            ]
          },
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