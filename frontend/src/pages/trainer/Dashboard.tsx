import { Outlet } from "react-router-dom";

// 1. Removemos todas as importações (useTrainerLayout, Views, etc.)
// 2. Removemos toda a lógica interna (const { activeView }, renderView(), switch...)

export default function TrainerDashboard() {
  
  // 3. O componente agora APENAS retorna o <Outlet />.
  // O React Router (do main.tsx) irá automaticamente renderizar
  // DashboardHomeView, StudentsView, ChatView, etc., aqui dentro,
  // com base no URL.
  return (
    <Outlet />
  );
}