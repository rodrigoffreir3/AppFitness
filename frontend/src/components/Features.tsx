import { Palette, Users, MessageSquare, BarChart3, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Palette,
    title: "Identidade Visual Única",
    description: "Personalize cores, logo e nome do app. A plataforma reflete 100% a sua marca.",
    gradient: "from-primary to-primary/60",
  },
  {
    icon: Users,
    title: "Gestão Completa de Alunos",
    description: "Cadastre, organize e acompanhe todos os seus alunos em um só lugar.",
    gradient: "from-secondary to-secondary/60",
  },
  {
    icon: MessageSquare,
    title: "Chat em Tempo Real",
    description: "Comunicação direta e instantânea com seus alunos dentro da plataforma.",
    gradient: "from-accent to-accent/60",
  },
  {
    icon: BarChart3,
    title: "Fichas de Treino Personalizadas",
    description: "Crie e distribua fichas de treino customizadas para cada aluno.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Shield,
    title: "Multi-Tenant Seguro",
    description: "Isolamento total de dados. Cada personal vê apenas seus alunos.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Zap,
    title: "Mural de Avisos",
    description: "Comunique-se com todos os alunos simultaneamente através do mural.",
    gradient: "from-accent to-secondary",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Tudo que você precisa para
            <span className="block bg-gradient-primary bg-clip-text text-transparent">gerenciar seu negócio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma plataforma completa que cresce com você e se adapta às suas necessidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
