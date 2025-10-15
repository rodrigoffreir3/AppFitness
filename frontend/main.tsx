import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Importe suas páginas aqui (vamos convertê-las para .tsx depois)
// Por enquanto, usaremos placeholders
const LoginPage = () => <div>Página de Login</div>;
const StudentLoginPage = () => <div>Página de Login do Aluno</div>;
const DashboardPage = () => <div>Dashboard do Treinador</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'student/login',
        element: <StudentLoginPage />,
      },
      {
        path: 'dashboard', // Exemplo de rota protegida
        element: <DashboardPage />,
      },
       // ... outras rotas virão aqui
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
