import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Users, MessageSquare, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom"; // 1. Importar o Link

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 animate-fade-in">
            <Dumbbell className="w-4 h-4" />
            <span className="text-sm font-medium">Plataforma White Label para Personal Trainers</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up">
            Sua <span className="bg-gradient-hero bg-clip-text text-transparent">Plataforma</span>,
            <br />
            Sua <span className="bg-gradient-hero bg-clip-text text-transparent">Identidade</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            A estrutura é nossa, a personalização é sua. Gerencie alunos, crie fichas de treino e mantenha seu time conectado em uma plataforma 100% customizável com sua marca.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {/* 2. Adicionar 'asChild' e <Link> */}
            <Button size="lg" variant="hero" className="text-lg px-8 py-6 h-auto" asChild>
              <Link to="/login/trainer">
                Comece Agora <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {/* 3. Mudar para um link âncora 'a' para rolar a página */}
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto" asChild>
              <a href="#recursos">Ver Demonstração</a>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium">100% Personalizável</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-secondary/50 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-sm font-medium">Gestão de Alunos</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-accent" />
              </div>
              <span className="text-sm font-medium">Chat em Tempo Real</span>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">Fichas de Treino</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;