// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Nossas páginas e componentes
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import StudentDetailPage from './pages/StudentDetailPage.jsx';
import WorkoutDetailPage from './pages/WorkoutDetailPage.jsx';
import StudentLoginPage from './pages/StudentLoginPage.jsx';
import StudentDashboardPage from './pages/StudentDashboardPage.jsx';
import StudentProtectedRoute from './components/StudentProtectedRoute.jsx';
import StudentWorkoutDetailPage from './pages/StudentWorkoutDetailPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx'; // Importamos a nova página


const router = createBrowserRouter([
  // --- ROTAS DO TREINADOR ---
  {
    path: "/",
    element: <ProtectedRoute />, // Proteção para o treinador
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/students/:studentId",
        element: <StudentDetailPage />,
      },
      {
        path: "/workouts/:workoutId",
        element: <WorkoutDetailPage />,
      },
      {
        path: "/profile", // Adicionamos a nova rota aqui
        element: <ProfilePage />,
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  // --- ROTAS DO ALUNO ---
  {
    path: "/student", // Usamos um caminho base para as rotas do aluno
    element: <StudentProtectedRoute />, // Proteção específica para o aluno
    children: [
      {
        path: "dashboard", // Rota relativa: /student/dashboard
        element: <StudentDashboardPage />,
      },
      {
        path: "workout/:workoutId", // Rota relativa: /student/workout/:workoutId
        element: <StudentWorkoutDetailPage />,
      }
    ]
  },
  {
    path: "/student/login",
    element: <StudentLoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)