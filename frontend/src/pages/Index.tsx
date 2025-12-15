import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhiteLabelPreview from "@/components/WhiteLabelPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { clearThemeColors, restoreThemeColors, isAuthenticated } = useAuth();

  useEffect(() => {
    // Ao montar a Landing Page: LIMPA as cores (garante visual neutro)
    clearThemeColors();

    // Ao desmontar (sair da página): RESTAURA as cores se estiver logado
    return () => {
      if (isAuthenticated) {
        restoreThemeColors();
      }
    };
  }, [isAuthenticated]); // Dependência garante que se logar/deslogar na home, atualiza

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <WhiteLabelPreview />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;