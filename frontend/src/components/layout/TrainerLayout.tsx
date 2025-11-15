import React from 'react';
import { Outlet } from 'react-router-dom'; // Remover useOutletContext
import TrainerSidebar from '@/components/trainer/TrainerSidebar';

// Remover o tipo TrainerLayoutContextType

const TrainerLayout: React.FC = () => {
  // Remover os estados [activeView, setActiveView]
  
  return (
    <div className="flex h-screen bg-background">
      {/* 1. Remover as props activeView e setActiveView */}
      <TrainerSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
            {/* 2. Remover o 'context' do Outlet */}
            <Outlet />
        </div>
      </main>
    </div>
  );
};

// 3. Remover o hook useTrainerLayout()
// export function useTrainerLayout() { ... }

export default TrainerLayout;