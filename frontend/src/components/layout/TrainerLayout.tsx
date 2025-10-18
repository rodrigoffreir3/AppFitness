import React, { useState } from 'react'; // Importe useState
import { Outlet } from 'react-router-dom';
import TrainerSidebar from '@/components/trainer/TrainerSidebar'; // Caminho confirmado

const TrainerLayout: React.FC = () => {
  // 1. Adicione o estado para controlar a view ativa
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' como padrão inicial

  return (
    <div className="flex h-screen bg-background">
      {/* 2. Passe as props activeView e setActiveView para a Sidebar */}
      <TrainerSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
            <Outlet context={{ setActiveView }} /> {/* Passa setActiveView para as páginas filhas, se necessário */}
        </div>
      </main>
    </div>
  );
};

export default TrainerLayout;