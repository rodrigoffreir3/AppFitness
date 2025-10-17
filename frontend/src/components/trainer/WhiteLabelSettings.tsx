import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const WhiteLabelSettings = () => {
  const [settings, setSettings] = useState({
    logo: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
  });

  const handleSave = () => {
    // TODO: Salvar no backend
    toast({
      title: "Configurações salvas!",
      description: "Sua marca foi personalizada com sucesso.",
    });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Personalização</h1>
        <p className="text-muted-foreground">Configure a identidade visual da sua plataforma</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logo</CardTitle>
          <CardDescription>Faça upload da logo da sua marca</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="logo">URL da Logo</Label>
            <Input
              id="logo"
              value={settings.logo}
              onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
              placeholder="https://exemplo.com/logo.png"
            />
          </div>
          {settings.logo && (
            <div className="border rounded-lg p-4 bg-muted">
              <img
                src={settings.logo}
                alt="Preview da logo"
                className="h-16 object-contain"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cores</CardTitle>
          <CardDescription>Defina as cores da sua marca</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex gap-2 items-center mt-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex gap-2 items-center mt-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  placeholder="#8b5cf6"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Salvar Configurações
      </Button>
    </div>
  );
};

export default WhiteLabelSettings;
