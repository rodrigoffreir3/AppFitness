// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Importações do React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Vamos criar estas páginas a seguir
// import LoginPage from './pages/LoginPage.jsx';
// import RegisterPage from './pages/RegisterPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // A nossa página principal/dashboard no futuro
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  // {
  //   path: "/register",
  //   element: <RegisterPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)