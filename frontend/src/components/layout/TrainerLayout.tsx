import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import TrainerSidebar from '@/components/trainer/TrainerSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Dumbbell, 
  LayoutDashboard, 
  Users, 
  BookCopy, 
  MessageCircle, 
  Megaphone, // Agora está sendo usado corretamente
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TrainerLayout: React.FC = () => {
  const { logoUrl, logout } = useAuth();
  const location = useLocation();

  // Links para o menu mobile (sincronizados com a Sidebar)
  const navLinks = [
    { to: "/trainer/dashboard", icon: LayoutDashboard, label: "Início", end: true },
    { to: "/trainer/dashboard/students", icon: Users, label: "Alunos", end: false },
    { to: "/trainer/dashboard/workouts", icon: Dumbbell, label: "Fichas de Treino", end: false },
    { to: "/trainer/dashboard/exercises", icon: BookCopy, label: "Exercícios", end: false },
    { to: "/trainer/dashboard/chat", icon: MessageCircle, label: "Chat", end: false },
    { to: "/trainer/dashboard/announcements", icon: Megaphone, label: "Avisos", end: false }, // Uso do Megaphone aqui
    { to: "/trainer/dashboard/settings", icon: Settings, label: "Personalizar", end: false },
  ];

  // Componente auxiliar para renderizar links no mobile
  const MobileLink = ({ to, icon: Icon, label, end }: any) => {
    const isActive = end ? location.pathname === to : location.pathname.startsWith(to);
    return (
      <Button
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 mb-1",
          isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
        )}
        asChild
      >
        <NavLink to={to}>
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      </Button>
    );
  };

  return (
    <div className="flex h-screen bg-background flex-col md:flex-row">
      
      {/* --- MOBILE HEADER (Visível apenas em telas pequenas: md:hidden) --- */}
      <div className="md:hidden h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 shrink-0">
        {/* Logo Mobile */}
        <div className="flex items-center gap-2 font-bold text-lg">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain bg-white/90 rounded p-1" />
          ) : (
            <>
              <Dumbbell className="h-6 w-6" />
              <span>AppFitness</span>
            </>
          )}
        </div>

        {/* Botão Hambúrguer + Sheet (Gaveta) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          
          <SheetContent side="left" className="w-72 p-0 flex flex-col">
            {/* Cabeçalho do Menu Mobile */}
            <div className="h-16 bg-primary text-primary-foreground flex items-center px-6 font-bold text-lg">
              Menu
            </div>

            {/* Navegação Mobile */}
            <div className="flex-1 overflow-y-auto py-4 px-4">
              {navLinks.map((link) => (
                <MobileLink key={link.to} {...link} />
              ))}
            </div>

            {/* Rodapé Mobile (Logout) */}
            <div className="p-4 border-t bg-secondary/10">
              <Button variant="ghost" onClick={logout} className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
                <LogOut className="h-5 w-5" />
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* --- FIM MOBILE HEADER --- */}

      {/* Sidebar Desktop (Escondida no mobile: hidden md:flex) */}
      <TrainerSidebar />

      {/* Conteúdo Principal (Outlet) */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TrainerLayout;