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
// --- ALTERAÇÃO: Importamos os novos componentes do aluno ---
import StudentDashboardPage from './pages/StudentDashboardPage.jsx';
import StudentProtectedRoute from './components/StudentProtectedRoute.jsx';


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

  // --- ALTERAÇÃO: Adicionamos o bloco de rotas do aluno ---
  {
    path: "/student/dashboard",
    element: <StudentProtectedRoute />, // Proteção específica para o aluno
    children: [
      {
        path: "/student/dashboard",
        element: <StudentDashboardPage />,
      }
      // Futuras rotas protegidas do aluno (ex: /student/profile) viriam aqui
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