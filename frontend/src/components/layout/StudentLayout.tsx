import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import StudentSidebar from '@/components/student/StudentSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Dumbbell, 
  LayoutDashboard, 
  MessageSquare, 
  Bell, 
  LogOut,
  CreditCard,
  Copy,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
// Imports para o Modal de Pagamento
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const StudentLayout: React.FC = () => {
  const { branding, logout } = useAuth();
  const location = useLocation();
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false); // Estado do Modal

  const navLinks = [
    { to: "/student/dashboard", icon: LayoutDashboard, label: "Meus Treinos", end: true },
    { to: "/student/dashboard/chat", icon: MessageSquare, label: "Chat", end: false },
    { to: "/student/dashboard/announcements", icon: Bell, label: "Avisos", end: false },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência!");
  };

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
            <SheetTitle className="sr-only">Menu do Aluno</SheetTitle>
            <SheetDescription className="sr-only">Navegação principal do aluno</SheetDescription>

            <div className="h-16 bg-primary text-primary-foreground flex items-center px-6 font-bold text-lg shadow-sm">
              Menu
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4">
              {/* Links de Navegação */}
              {navLinks.map((link) => (
                <MobileLink key={link.to} {...link} />
              ))}

              {/* Botão de Assinatura (ADICIONADO NO MOBILE) */}
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 mb-1 text-muted-foreground"
                onClick={() => {
                  setIsMobileOpen(false); // Fecha o menu
                  setIsPaymentOpen(true); // Abre o modal
                }}
              >
                <CreditCard className="h-5 w-5" />
                Assinatura
              </Button>
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

      <StudentSidebar />

      <main className="flex-1 overflow-y-auto bg-gray-50/50">
         <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl pb-24 md:pb-8">
            <Outlet />
         </div>
      </main>

      {/* --- MODAL DE PAGAMENTO (REPLICADO AQUI PARA FUNCIONAR NO MOBILE) --- */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-md w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>Dados de Pagamento</DialogTitle>
            <DialogDescription>
              Utilize os dados abaixo para realizar o pagamento ao seu treinador.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-2">
            
            {branding?.payment_pix_key && (
              <div className="space-y-2">
                <Label>Chave PIX</Label>
                <div className="flex items-center gap-2">
                  <Input value={branding.payment_pix_key} readOnly />
                  <Button size="icon" variant="outline" onClick={() => copyToClipboard(branding.payment_pix_key!)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {branding?.payment_link_url && (
              <div className="space-y-2">
                <Label>Link de Pagamento</Label>
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href={branding.payment_link_url} target="_blank" rel="noreferrer">
                    Abrir Link de Pagamento
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            )}

            {branding?.payment_instructions && (
              <div className="space-y-2">
                <Label>Instruções</Label>
                <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {branding.payment_instructions}
                </div>
              </div>
            )}

            {!branding?.payment_pix_key && !branding?.payment_link_url && !branding?.payment_instructions && (
              <div className="text-center text-muted-foreground py-4">
                Seu treinador ainda não configurou os dados de pagamento.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default StudentLayout;