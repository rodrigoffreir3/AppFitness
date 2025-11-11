import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api"; // Importar API
import { Loader2, AlertCircle } from "lucide-react"; // Importar ícones

// --- NOVO: Interfaces baseadas no trainers_handler.go ---
// Resposta do GET /api/trainers/me
interface TrainerProfile {
  name: string;
  email: string; // Apenas para exibição, não editável aqui
  brand_logo_url: string;
  brand_primary_color: string;
}

// Requisição do PUT /api/trainers/me
interface UpdateTrainerRequest {
  name: string;
  brand_logo_url: string;
  brand_primary_color: string;
}
// --- FIM NOVO ---

const WhiteLabelSettings = () => {
  // --- ESTADOS ATUALIZADOS ---
  const [settings, setSettings] = useState<UpdateTrainerRequest>({
    name: "",
    brand_logo_url: "",
    brand_primary_color: "#3b82f6", // Cor padrão
  });
  const [email, setEmail] = useState(""); // Email não é editável, mas bom exibir
  const [loading, setLoading] = useState(true); // Para carregar os dados
  const [saving, setSaving] = useState(false); // Para o botão de salvar
  const [error, setError] = useState("");
  // --- FIM ESTADOS ATUALIZADOS ---

  // --- NOVO: useEffect para buscar dados ---
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get<TrainerProfile>('/trainers/me');
        const data = response.data;
        setSettings({
          name: data.name || "",
          brand_logo_url: data.brand_logo_url || "",
          brand_primary_color: data.brand_primary_color || "#3b82f6",
        });
        setEmail(data.email || "");
      } catch (err) {
        console.error("Erro ao buscar configurações:", err);
        setError("Não foi possível carregar suas configurações.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);
  // --- FIM NOVO ---

  // --- ATUALIZADO: handleSave ---
  const handleSave = async () => {
    setSaving(true);
    try {
      // O endpoint PUT /api/trainers/me aceita name, brand_logo_url, brand_primary_color
      await api.put('/api/trainers/me', settings);
      
      toast({
        title: "Configurações salvas!",
        description: "Sua marca foi personalizada com sucesso.",
      });
      
      // Opcional: atualizar o AuthContext com as novas cores/logo
      
    } catch (err) {
      console.error("Erro ao salvar configurações:", err);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas configurações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  // --- FIM ATUALIZADO ---

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center text-destructive bg-destructive/10 border border-destructive rounded-lg p-6">
        <AlertCircle className="h-8 w-8 mb-4" />
        <p className="font-semibold">Erro ao carregar</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Personalização</h1>
        <p className="text-muted-foreground">Configure a identidade visual da sua plataforma</p>
      </div>

      {/* --- NOVO: Card de Informações Básicas --- */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>Defina seu nome de treinador e email de login.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome (Como aparece para os alunos)</Label>
            <Input
              id="name"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              placeholder="Seu nome profissional"
            />
          </div>
          <div>
            <Label htmlFor="email">Email (Login)</Label>
            <Input
              id="email"
              value={email}
              disabled // Email não deve ser alterado por aqui
            />
          </div>
        </CardContent>
      </Card>
      {/* --- FIM NOVO --- */}

      <Card>
        <CardHeader>
          <CardTitle>Logo</CardTitle>
          <CardDescription>Faça upload da logo da sua marca (cole a URL).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="logo">URL da Logo</Label>
            <Input
              id="logo"
              value={settings.brand_logo_url}
              onChange={(e) => setSettings({ ...settings, brand_logo_url: e.target.value })}
              placeholder="https://exemplo.com/logo.png"
            />
          </div>
          {settings.brand_logo_url && (
            <div className="border rounded-lg p-4 bg-muted">
              <img
                src={settings.brand_logo_url}
                alt="Preview da logo"
                className="h-16 object-contain"
                onError={(e) => e.currentTarget.style.display = 'none'} // Esconde se a URL quebrar
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cores</CardTitle>
          <CardDescription>Defina a cor primária da sua marca.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex gap-2 items-center mt-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={settings.brand_primary_color}
                  onChange={(e) => setSettings({ ...settings, brand_primary_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  value={settings.brand_primary_color}
                  onChange={(e) => setSettings({ ...settings, brand_primary_color: e.target.value })}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            
            {/* O campo "Cor Secundária" foi removido por não existir no backend */}

          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full" disabled={saving}>
        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {saving ? "Salvando..." : "Salvar Configurações"}
      </Button>
    </div>
  );
};

export default WhiteLabelSettings;