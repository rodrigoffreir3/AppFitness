import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";
// CORREÇÃO: Removido AlertCircle
import { Loader2, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UpdateTrainerRequest {
  name: string;
  brand_logo_url: string;
  brand_primary_color: string;
  brand_secondary_color: string;
  payment_pix_key: string;
  payment_link_url: string;
  payment_instructions: string;
}

const WhiteLabelSettings = () => {
  const { updateBranding } = useAuth();
  const [settings, setSettings] = useState<UpdateTrainerRequest>({
    name: "",
    brand_logo_url: "",
    brand_primary_color: "#3b82f6",
    brand_secondary_color: "#000000",
    payment_pix_key: "",
    payment_link_url: "",
    payment_instructions: "",
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get('/trainers/me');
        const data = response.data;
        setSettings({
          name: data.name || "",
          brand_logo_url: data.brand_logo_url || "",
          brand_primary_color: data.brand_primary_color || "#3b82f6",
          brand_secondary_color: data.brand_secondary_color || "#000000",
          payment_pix_key: data.payment_pix_key || "",
          payment_link_url: data.payment_link_url || "",
          payment_instructions: data.payment_instructions || "",
        });
        setEmail(data.email || "");
        updateBranding({
            logo_url: data.brand_logo_url, 
            primary_color: data.brand_primary_color, 
            secondary_color: data.brand_secondary_color
        });
      } catch (err) {
        console.error("Erro ao buscar configurações:", err);
        setError("Não foi possível carregar suas configurações.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/trainers/me', settings);
      updateBranding({
        logo_url: settings.brand_logo_url,
        primary_color: settings.brand_primary_color,
        secondary_color: settings.brand_secondary_color,
      });
      toast({ title: "Sucesso!", description: "Configurações atualizadas." });
    } catch (err) {
      console.error("Erro ao salvar:", err);
      toast({ title: "Erro", description: "Falha ao salvar.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin" /></div>;
  // Tratamento simples de erro sem AlertCircle
  if (error) return <div className="text-center text-red-500 p-8 border border-red-200 rounded bg-red-50">{error}</div>;

  return (
    <div className="space-y-6 max-w-2xl pb-10">
      <div>
        <h1 className="text-3xl font-bold">Personalização</h1>
        <p className="text-muted-foreground">Defina sua marca e dados de pagamento.</p>
      </div>

      {/* Info Básica */}
      <Card>
        <CardHeader>
            <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label>Nome</Label>
                <Input value={settings.name} onChange={e => setSettings({...settings, name: e.target.value})} />
            </div>
            <div>
                <Label>Email</Label>
                <Input value={email} disabled />
            </div>
        </CardContent>
      </Card>

      {/* Marca e Cores */}
      <Card>
        <CardHeader><CardTitle>Identidade Visual</CardTitle></CardHeader>
        <CardContent className="space-y-6">
            <div>
                <Label>Logo URL</Label>
                <Input value={settings.brand_logo_url} onChange={e => setSettings({...settings, brand_logo_url: e.target.value})} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Cor Primária</Label>
                    <div className="flex gap-2 mt-2">
                        <Input type="color" className="w-10 p-1 h-10 cursor-pointer" value={settings.brand_primary_color} onChange={e => setSettings({...settings, brand_primary_color: e.target.value})} />
                        <Input value={settings.brand_primary_color} onChange={e => setSettings({...settings, brand_primary_color: e.target.value})} />
                    </div>
                </div>
                <div>
                    <Label>Cor Secundária</Label>
                    <div className="flex gap-2 mt-2">
                        <Input type="color" className="w-10 p-1 h-10 cursor-pointer" value={settings.brand_secondary_color} onChange={e => setSettings({...settings, brand_secondary_color: e.target.value})} />
                        <Input value={settings.brand_secondary_color} onChange={e => setSettings({...settings, brand_secondary_color: e.target.value})} />
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

      {/* Dados de Pagamento */}
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Dados de Pagamento</CardTitle>
            <CardDescription>Como seus alunos pagarão você? Essas informações aparecerão no painel deles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label>Chave PIX</Label>
                <Input value={settings.payment_pix_key} onChange={e => setSettings({...settings, payment_pix_key: e.target.value})} placeholder="CPF, Email ou Chave Aleatória" />
            </div>
            <div>
                <Label>Link de Pagamento (Opcional)</Label>
                <Input value={settings.payment_link_url} onChange={e => setSettings({...settings, payment_link_url: e.target.value})} placeholder="https://pagseguro..." />
            </div>
            <div>
                <Label>Instruções Adicionais</Label>
                <Textarea value={settings.payment_instructions} onChange={e => setSettings({...settings, payment_instructions: e.target.value})} placeholder="Ex: Envie o comprovante pelo WhatsApp..." />
            </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? <Loader2 className="mr-2 animate-spin" /> : "Salvar Alterações"}
      </Button>
    </div>
  );
};

export default WhiteLabelSettings;