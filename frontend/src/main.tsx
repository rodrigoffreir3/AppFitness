import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx' // 1. Importe o AuthProvider

// ... (importações das páginas) ...
// Exemplo: import TrainerLogin from './pages/auth/TrainerLogin.tsx'
//          import StudentDashboard from './pages/student/Dashboard.tsx'

// --- PLACEHOLDERS --- (Substitua pelos seus imports reais quando as páginas forem criadas)
const IndexPage = () => <div>Landing Page (Index.tsx)</div>;
const TrainerLogin = () => <div>Login Treinador</div>;
const StudentLogin = () => <div>Login Aluno</div>;
const TrainerDashboard = () => <div>Dashboard Treinador</div>;
const StudentDashboard = () => <div>Dashboard Aluno</div>;
const NotFound = () => <div>Página não encontrada</div>;
// --- FIM PLACEHOLDERS ---

// --- LAYOUTS --- (Precisaremos criar estes)
import { Outlet } from 'react-router-dom';
const PublicLayout = () => <Outlet />; // Layout simples para páginas públicas
const TrainerLayout = () => <div>Layout Treinador <Outlet /></div>; // Layout com Sidebar do Treinador
const StudentLayout = () => <div>Layout Aluno <Outlet /></div>; // Layout com Sidebar do Aluno
// --- FIM LAYOUTS ---


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // O App principal ainda é a raiz
    children: [
      // Rotas Públicas (Landing Page, etc.)
      { 
        element: <PublicLayout />, 
        children: [
          { index: true, element: <IndexPage /> }, // Página inicial
          { path: 'login/trainer', element: <TrainerLogin /> },
          { path: 'login/student', element: <StudentLogin /> },
        ] 
      },

      // Rotas do Treinador (Protegidas) - Precisarão de lógica de proteção
      {
        path: 'trainer',
        element: <TrainerLayout />, // Usará o layout com sidebar do treinador
        children: [
          { path: 'dashboard', element: <TrainerDashboard /> },
          // { path: 'students', element: <StudentsView /> }, // Exemplo futuro
          // { path: 'settings', element: <WhiteLabelSettings /> }, // Exemplo futuro
        ],
      },
      
      // Rotas do Aluno (Protegidas) - Precisarão de lógica de proteção
      {
        path: 'student',
        element: <StudentLayout />, // Usará o layout com sidebar do aluno
        children: [
          { path: 'dashboard', element: <StudentDashboard /> },
          // { path: 'workouts', element: <MyWorkoutsView /> }, // Exemplo futuro
          // { path: 'chat', element: <StudentChatView /> }, // Exemplo futuro
        ],
      },
      
      // Rota para página não encontrada
      { path: '*', element: <NotFound /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. Envolva o RouterProvider com o AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)