import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom'; // Importe useOutletContext
import TrainerSidebar from '@/components/trainer/TrainerSidebar';

// 1. Definir o tipo do contexto que o Outlet fornecerá
type TrainerLayoutContextType = {
  activeView: string;
  setActiveView: (view: string) => void;
};

const TrainerLayout: React.FC = () => {
  // 'dashboard' é a nossa visualização "Home"
  const [activeView, setActiveView] = useState('dashboard'); 

  return (
    <div className="flex h-screen bg-background">
      <TrainerSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
            {/* 2. Passe o estado e o setter para o contexto do Outlet */}
            <Outlet context={{ activeView, setActiveView } satisfies TrainerLayoutContextType} />
        </div>
      </main>
    </div>
  );
};

// 3. Exporte um hook customizado para os componentes filhos usarem
export function useTrainerLayout() {
  return useOutletContext<TrainerLayoutContextType>();
}

export default TrainerLayout;