import React, { useState } from 'react';
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
  Megaphone,
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TrainerLayout: React.FC = () => {
  const { logoUrl, logout } = useAuth();
  const location = useLocation();
  
  // ESTADO PARA CONTROLAR O MENU MOBILE
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { to: "/trainer/dashboard", icon: LayoutDashboard, label: "Início", end: true },
    { to: "/trainer/dashboard/students", icon: Users, label: "Alunos", end: false },
    { to: "/trainer/dashboard/workouts", icon: Dumbbell, label: "Fichas de Treino", end: false },
    { to: "/trainer/dashboard/exercises", icon: BookCopy, label: "Exercícios", end: false },
    { to: "/trainer/dashboard/chat", icon: MessageCircle, label: "Chat", end: false },
    { to: "/trainer/dashboard/announcements", icon: Megaphone, label: "Avisos", end: false },
    { to: "/trainer/dashboard/settings", icon: Settings, label: "Personalizar", end: false },
  ];

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
        // AQUI ESTÁ A MÁGICA: FECHA O MENU AO CLICAR
        onClick={() => setIsMobileOpen(false)}
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
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 shrink-0 shadow-md z-50">
        {/* Logo Mobile - AUMENTADA */}
        <div className="flex items-center gap-2 font-bold text-lg h-full py-2">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Logo" 
              // AUMENTADA: h-12 (48px) ocupa 75% do header (64px). 'object-contain' garante que não distorça.
              className="h-12 w-auto object-contain bg-white/90 rounded-md p-1" 
            />
          ) : (
            <>
              <Dumbbell className="h-8 w-8" />
              <span className="text-xl tracking-tight">AppFitness</span>
            </>
          )}
        </div>

        {/* Menu Mobile Controlado */}
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20 h-10 w-10">
              <Menu className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          
          <SheetContent side="left" className="w-72 p-0 flex flex-col border-r-0">
            {/* Cabeçalho do Menu */}
            <div className="h-16 bg-primary text-primary-foreground flex items-center px-6 font-bold text-lg shadow-sm">
              Menu
            </div>

            {/* Navegação */}
            <div className="flex-1 overflow-y-auto py-4 px-4">
              {navLinks.map((link) => (
                <MobileLink key={link.to} {...link} />
              ))}
            </div>

            {/* Rodapé */}
            <div className="p-4 border-t bg-secondary/10">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsMobileOpen(false);
                  logout();
                }} 
                className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-5 w-5" />
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <TrainerSidebar />

      <main className="flex-1 overflow-y-auto bg-gray-50/50">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl pb-24 md:pb-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TrainerLayout;