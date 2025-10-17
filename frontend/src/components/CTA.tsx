import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Pronto para ter sua
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Plataforma Profissional?
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Junte-se a centenas de personal trainers que já transformaram seu negócio com o AppFitness
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="hero" className="text-lg px-10 py-7 h-auto">
              Comece Gratuitamente <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-7 h-auto">
              Falar com Especialista
            </Button>
          </div>

          {/* Benefits list */}
          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm">
            {[
              "Sem cartão de crédito",
              "Configuração em minutos",
              "Suporte especializado",
              "Cancele quando quiser",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-accent-foreground" />
                </div>
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
