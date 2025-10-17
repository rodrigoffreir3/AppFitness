import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";

const WhiteLabelPreview = () => {
  const [selectedTheme, setSelectedTheme] = useState("purple");

  const themes = {
    purple: {
      name: "Roxo Vibrante",
      primary: "#8B5CF6",
      secondary: "#EC4899",
      gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    },
    green: {
      name: "Verde Energia",
      primary: "#10B981",
      secondary: "#3B82F6",
      gradient: "linear-gradient(135deg, #10B981, #3B82F6)",
    },
    orange: {
      name: "Laranja Intenso",
      primary: "#F97316",
      secondary: "#EF4444",
      gradient: "linear-gradient(135deg, #F97316, #EF4444)",
    },
  };

  const currentTheme = themes[selectedTheme as keyof typeof themes];

  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            A <span className="bg-gradient-secondary bg-clip-text text-transparent">Casa</span> é Nossa,
            <br />
            A <span className="bg-gradient-secondary bg-clip-text text-transparent">Decoração</span> é Sua
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha suas cores e transforme a plataforma na extensão perfeita da sua marca
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Theme selector */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-2 text-lg font-medium mb-4">
              <Palette className="w-6 h-6 text-primary" />
              <span>Escolha seu tema:</span>
            </div>

            <div className="space-y-3">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTheme(key)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-4 ${
                    selectedTheme === key
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div
                    className="w-16 h-16 rounded-lg shadow-md"
                    style={{ background: theme.gradient }}
                  />
                  <div>
                    <div className="font-semibold">{theme.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Personalize com sua identidade
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Card className="p-6 bg-muted/50">
              <h4 className="font-semibold mb-2">Personalize também:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Logo da sua marca</li>
                <li>✓ Nome do aplicativo</li>
                <li>✓ Paleta de cores completa</li>
                <li>✓ Fontes e tipografia</li>
              </ul>
            </Card>
          </div>

          {/* Preview mockup */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <Card className="relative overflow-hidden border-4 shadow-2xl">
                {/* Header */}
                <div
                  className="h-16 flex items-center justify-between px-6"
                  style={{ background: currentTheme.gradient }}
                >
                  <div className="text-white font-bold text-lg">Seu App Personal</div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm" />
                </div>

                {/* Content area */}
                <div className="p-6 space-y-4 bg-background">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full"
                      style={{ background: currentTheme.gradient }}
                    />
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-2/3 mb-2" />
                      <div className="h-3 bg-muted/50 rounded w-1/2" />
                    </div>
                  </div>

                  <Card className="p-4 border-2">
                    <div className="h-3 bg-muted rounded w-full mb-2" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </Card>

                  <div className="grid grid-cols-2 gap-3">
                    <div
                      className="h-24 rounded-lg"
                      style={{ background: `${currentTheme.primary}20` }}
                    />
                    <div
                      className="h-24 rounded-lg"
                      style={{ background: `${currentTheme.secondary}20` }}
                    />
                  </div>

                  <Button
                    className="w-full"
                    style={{
                      background: currentTheme.gradient,
                      color: "white",
                    }}
                  >
                    Botão Personalizado
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelPreview;
