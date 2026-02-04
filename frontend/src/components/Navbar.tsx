import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, User, Users, LayoutDashboard, LogOut, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, userType, logout, branding } = useAuth();
  
  // --- LÓGICA DO PWA (INSTALAÇÃO) ---
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Escuta o evento que o Chrome dispara quando o app pode ser instalado
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Impede o banner padrão do Chrome
      setDeferredPrompt(e); // Guarda o evento para usarmos no nosso botão
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Mostra o prompt nativo de instalação do celular/PC
    deferredPrompt.prompt();
    
    // Espera o usuário responder (Aceitar ou Cancelar)
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null); // Esconde o botão se ele instalou
    }
  };
  // -----------------------------------

  const dashboardLink = userType === 'trainer' ? '/trainer/dashboard' : '/student/dashboard';

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {isAuthenticated && branding.logo_url ? (
               <img src={branding.logo_url} alt="Logo" className="w-10 h-10 object-contain" />
            ) : (
               <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                 <Dumbbell className="w-6 h-6 text-primary-foreground" />
               </div>
            )}
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {isAuthenticated && branding.logo_url ? "" : "Metsuke"}
            </span>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#recursos" className="text-foreground/80 hover:text-foreground transition-colors">Recursos</a>
            <a href="#personalizacao" className="text-foreground/80 hover:text-foreground transition-colors">Personalização</a>
            <a href="#precos" className="text-foreground/80 hover:text-foreground transition-colors">Preços</a>
            <a href="#contato" className="text-foreground/80 hover:text-foreground transition-colors">Contato</a>
          </div>

          {/* Botões Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* BOTÃO DE INSTALAR (SÓ APARECE SE FOR POSSÍVEL INSTALAR) */}
                {deferredPrompt && (
                  <Button variant="default" onClick={handleInstallClick} className="animate-pulse bg-green-600 hover:bg-green-700 text-white border-none shadow-lg">
                    <Smartphone className="w-4 h-4 mr-2" />
                    Instalar App
                  </Button>
                )}

                <Button variant="outline" asChild>
                   <Link to={dashboardLink}>
                     <LayoutDashboard className="w-4 h-4 mr-2" />
                     Dashboard
                   </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
                    <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                {/* Dropdown de Login */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Entrar</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/login/trainer" className="cursor-pointer flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Sou Treinador
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/login/student" className="cursor-pointer flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Sou Aluno
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* CTA */}
                <Button variant="gradient" asChild>
                  <Link to="/signup/trainer">Começar Agora</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border animate-fade-in bg-background">
            <div className="flex flex-col gap-2 pt-4 px-4">
              {isAuthenticated ? (
                <>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Minha Conta</p>
                  
                  {/* BOTÃO DE INSTALAR (MOBILE) */}
                  {deferredPrompt && (
                    <Button variant="default" className="w-full justify-start gap-2 bg-green-600 hover:bg-green-700 text-white" onClick={handleInstallClick}>
                      <Smartphone className="w-4 h-4" />
                      Instalar Aplicativo
                    </Button>
                  )}

                  <Button className="w-full justify-start gap-2" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to={dashboardLink}>
                        <LayoutDashboard className="w-4 h-4" />
                        Ir para Dashboard
                    </Link>
                  </Button>
                  <Button variant="destructive" className="w-full justify-start gap-2 mt-2" onClick={handleLogout}>
                      <LogOut className="w-4 h-4" />
                      Sair
                  </Button>
                </>
              ) : (
                <>
                  <p className="px-4 text-sm font-semibold text-muted-foreground">Login</p>
                  <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/login/trainer">Sou Treinador</Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/login/student">Sou Aluno</Link>
                  </Button>
                  <div className="h-px bg-border my-2 mx-4" />
                  <Button variant="gradient" className="w-full" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/signup/trainer">Começar Agora</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;