import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '@/components/student/StudentSidebar';

const StudentLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      <StudentSidebar />
      <main className="flex-1 overflow-y-auto">
         <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
            <Outlet />
         </div>
      </main>
    </div>
  );
};

export default StudentLayout;