import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import TrainerSidebar from '@/components/trainer/TrainerSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Dumbbell, 
  LayoutDashboard, 
  Users, 
  BookCopy, 
  MessageCircle, 
  Bell, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
// NOVO: Importando o Modal
import { TermsModal } from "@/components/legal/TermsModal";

const TrainerLayout: React.FC = () => {
  // ALTERADO: Adicionado 'user' para verificar o aceite
  const { branding, logout, user } = useAuth();
  const location = useLocation();
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // NOVO: Estado para controlar a visibilidade do modal
  const [showTerms, setShowTerms] = useState(false);

  // NOVO: Verifica se o usuário já aceitou os termos ao carregar
  useEffect(() => {
    // Se o usuário está logado E a data de aceite é nula/vazia
    if (user && !user.terms_accepted_at) {
       setShowTerms(true);
    }
  }, [user]);

  // NOVO: Função chamada quando o usuário clica em "Li e Concordo"
  const handleAcceptTerms = async () => {
    try {
      // TODO: Aqui você vai conectar com sua API real no futuro
      // await api.post('/users/accept-terms');
      
      console.log("Termos aceitos pelo usuário:", user?.email);
      setShowTerms(false); // Fecha o modal e libera o acesso
    } catch (error) {
      console.error("Erro ao salvar aceite", error);
    }
  };

  const navLinks = [
    { to: "/trainer/dashboard", icon: LayoutDashboard, label: "Início", end: true },
    { to: "/trainer/dashboard/students", icon: Users, label: "Alunos", end: false },
    { to: "/trainer/dashboard/workouts", icon: Dumbbell, label: "Fichas de Treino", end: false },
    { to: "/trainer/dashboard/exercises", icon: BookCopy, label: "Exercícios", end: false },
    { to: "/trainer/dashboard/chat", icon: MessageCircle, label: "Chat", end: false },
    { to: "/trainer/dashboard/announcements", icon: Bell, label: "Avisos", end: false },
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
      
      {/* NOVO: O Modal é renderizado aqui. Ele bloqueará a tela se showTerms for true */}
      <TermsModal isOpen={showTerms} onAccept={handleAcceptTerms} />

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 shrink-0 shadow-md z-50">
        <div className="flex items-center gap-2 font-bold text-lg h-full py-2">
          {branding?.logo_url ? (
            <img 
              src={branding.logo_url} 
              alt="Logo" 
              className="h-12 w-auto object-contain bg-white/90 rounded-md p-1" 
            />
          ) : (
            <>
              <Dumbbell className="h-8 w-8" />
              <span className="text-xl tracking-tight">AppFitness</span>
            </>
          )}
        </div>

        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20 h-10 w-10">
              <Menu className="h-7 w-7" />
            </Button>
          </SheetTrigger>
          
          <SheetContent side="left" className="w-72 p-0 flex flex-col border-r-0">
            <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
            <SheetDescription className="sr-only">Menu principal da aplicação</SheetDescription>

            <div className="h-16 bg-primary text-primary-foreground flex items-center px-6 font-bold text-lg shadow-sm">
              Menu
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4">
              {navLinks.map((link) => (
                <MobileLink key={link.to} {...link} />
              ))}
            </div>

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