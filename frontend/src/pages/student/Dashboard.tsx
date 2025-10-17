import { useState } from "react";
import StudentSidebar from "@/components/student/StudentSidebar";
import MyWorkoutsView from "@/components/student/MyWorkoutsView";
import StudentChatView from "@/components/student/StudentChatView";
import StudentAnnouncementsView from "@/components/student/StudentAnnouncementsView";

const StudentDashboard = () => {
  const [activeView, setActiveView] = useState("workouts");

  const renderView = () => {
    switch (activeView) {
      case "workouts":
        return <MyWorkoutsView />;
      case "chat":
        return <StudentChatView />;
      case "announcements":
        return <StudentAnnouncementsView />;
      default:
        return <MyWorkoutsView />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <StudentSidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default StudentDashboard;
