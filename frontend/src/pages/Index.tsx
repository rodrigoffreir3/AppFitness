import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import necessário para redirecionar
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhiteLabelPreview from "@/components/WhiteLabelPreview";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { clearThemeColors, restoreThemeColors, isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Lógica de Redirecionamento Automático (A "Porta Expressa")
    if (isAuthenticated && userType) {
      // Se for treinador, vai para /trainer/dashboard
      // Se for aluno, vai para /student/dashboard
      navigate(`/${userType}/dashboard`, { replace: true });
      return;
    }

    // 2. Lógica de Limpeza Visual (Só roda se NÃO for redirecionado)
    // Ao montar a Landing Page: LIMPA as cores (garante visual neutro)
    clearThemeColors();

    // Ao desmontar (sair da página): RESTAURA as cores se estiver logado
    // (Isso é útil caso o usuário clique em "Voltar" ou algo do tipo)
    return () => {
      if (isAuthenticated) {
        restoreThemeColors();
      }
    };
  }, [isAuthenticated, userType, navigate, clearThemeColors, restoreThemeColors]);

  // Se estiver autenticado, nem renderiza a página para evitar "piscar" na tela
  if (isAuthenticated) return null;

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