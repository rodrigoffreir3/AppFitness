import { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  CreditCard,
  Copy,
  ExternalLink,
  Utensils // NOVO ÍCONE
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "sonner";

const StudentSidebar = () => {
  const { logout, branding } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/student/dashboard", icon: LayoutDashboard, label: "Meus Treinos", end: true },
    { to: "/student/dashboard/diets", icon: Utensils, label: "Dietas", end: false }, // NOVO LINK
    { to: "/student/dashboard/chat", icon: MessageSquare, label: "Chat", end: false },
    { to: "/student/dashboard/announcements", icon: Bell, label: "Avisos", end: false },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado para a área de transferência!");
  };

  return (
    <aside
      className={cn(
        "relative hidden h-screen flex-col border-r bg-card md:flex transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Cabeçalho */}
      <div className="flex h-20 items-center border-b px-4 overflow-hidden bg-primary text-primary-foreground">
        <div className={cn("flex items-center gap-2 font-semibold w-full h-full", isCollapsed && "justify-center")}>
          {branding?.logo_url ? (
            <img 
              src={branding.logo_url} 
              alt="Logo" 
              className={cn("object-contain transition-all max-h-[85%]", isCollapsed ? "w-10" : "w-auto max-w-full")} 
            />
          ) : (
            <div className="flex items-center gap-2 whitespace-nowrap">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-primary-foreground shrink-0 backdrop-blur-sm">
                <Dumbbell className="h-6 w-6" />
              </div>
              {!isCollapsed && <span className="text-xl font-bold">AppFitness</span>}
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-x-hidden overflow-y-auto py-4 px-3">
        {navLinks.map((link) => {
          const isActive = link.end ? location.pathname === link.to : location.pathname.startsWith(link.to);
          return (
            <TooltipProvider key={link.to} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={cn(
                      "w-full justify-start gap-3 mb-1 transition-all duration-200 border-none",
                      isCollapsed && "justify-center px-2",
                      isActive 
                        ? "bg-white text-primary shadow-md hover:bg-white/90 font-bold" 
                        : "bg-transparent text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                    )}
                    asChild
                  >
                    <NavLink to={link.to}>
                      <link.icon className={cn("h-5 w-5 shrink-0", isCollapsed && "h-6 w-6")} />
                      {!isCollapsed && <span>{link.label}</span>}
                      <span className="sr-only">{link.label}</span>
                    </NavLink>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && <TooltipContent side="right">{link.label}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          );
        })}

        {/* Botão de Pagamento */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsPaymentOpen(true)}
                className={cn(
                  "w-full justify-start gap-3 mb-1 transition-all duration-200 border-none bg-transparent text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <CreditCard className={cn("h-5 w-5 shrink-0", isCollapsed && "h-6 w-6")} />
                {!isCollapsed && <span>Assinatura</span>}
                <span className="sr-only">Assinatura</span>
              </Button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Assinatura</TooltipContent>}
          </Tooltip>
        </TooltipProvider>

      </nav>

      {/* Rodapé */}
      <div className="mt-auto border-t p-4 bg-secondary text-secondary-foreground">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={logout}
                className={cn(
                  "w-full justify-start gap-3 hover:bg-white/10 hover:text-white",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <LogOut className={cn("h-5 w-5 shrink-0", isCollapsed && "h-6 w-6")} />
                {!isCollapsed && <span>Sair</span>}
                <span className="sr-only">Sair</span>
              </Button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Sair</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 h-8 w-8 rounded-full shadow-md z-50 bg-background border-input"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* Modal Pagamento */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-md">
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
                <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground whitespace-pre-wrap">
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

    </aside>
  );
};

export default StudentSidebar;