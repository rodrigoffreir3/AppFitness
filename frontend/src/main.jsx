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
import StudentDetailPage from './pages/StudentDetailPage.jsx'; // <-- ALTERAÇÃO: Importa a nova página

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, // A rota raiz agora é protegida
    children: [
      {
        path: "/",
        element: <DashboardPage />, // Se estiver protegido, mostra o Dashboard
      },
      // --- ALTERAÇÃO: Nova rota para os detalhes do aluno ---
      {
        path: "/students/:studentId", // O ':studentId' é um parâmetro dinâmico
        element: <StudentDetailPage />,
      },
      // --- FIM DA NOVA ROTA ---
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)