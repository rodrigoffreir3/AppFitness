import { Outlet } from "react-router-dom";

export default function StudentDashboard() {
  // O componente agora APENAS retorna o <Outlet />.
  // O React Router (do main.tsx) irá automaticamente renderizar
  // MyWorkoutsView, StudentChatView, etc., aqui dentro,
  // com base no URL.
  return (
    <Outlet />
  );
}