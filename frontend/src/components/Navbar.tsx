import { Button } from "@/components/ui/button";
import { Dumbbell, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // 1. Importar o Link

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AppFitness
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#recursos" className="text-foreground/80 hover:text-foreground transition-colors">
              Recursos
            </a>
            <a href="#personalizacao" className="text-foreground/80 hover:text-foreground transition-colors">
              Personalização
            </a>
            <a href="#precos" className="text-foreground/80 hover:text-foreground transition-colors">
              Preços
            </a>
            <a href="#contato" className="text-foreground/80 hover:text-foreground transition-colors">
              Contato
            </a>
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Botão Entrar (aponta para o login) */}
            <Button variant="ghost" asChild>
              <Link to="/login/trainer">Entrar</Link>
            </Button>
            {/* --- CORREÇÃO AQUI --- */}
            <Button variant="gradient" asChild>
              <Link to="/signup/trainer">Começar Agora</Link>
            </Button>
            {/* --- FIM DA CORREÇÃO --- */}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border animate-fade-in">
            <a
              href="#recursos"
              className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)} // Fecha o menu ao clicar
            >
              Recursos
            </a>
            <a
              href="#personalizacao"
              className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)} // Fecha o menu ao clicar
            >
              Personalização
            </a>
            <a
              href="#precos"
              className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)} // Fecha o menu ao clicar
            >
              Preços
            </a>
            <a
              href="#contato"
              className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)} // Fecha o menu ao clicar
            >
              Contato
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/login/trainer">Entrar</Link>
              </Button>
              {/* --- CORREÇÃO AQUI --- */}
              <Button variant="gradient" className="w-full" asChild>
                <Link to="/signup/trainer">Começar Agora</Link>
              </Button>
              {/* --- FIM DA CORREÇÃO --- */}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;