import { useState } from "react";
import { CreditCard, CheckCircle2, Loader2, ExternalLink, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

const SubscriptionView = () => {
    const [documento, setDocumento] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState("");
    const { toast } = useToast();

    // --- FUNÇÃO DE VALIDAÇÃO DE CPF (Algoritmo Oficial Mantido) ---
    const isValidCPF = (cpf: string) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
        
        let soma = 0;
        let resto;
        
        for (let i = 1; i <= 9; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        
        soma = 0;
        for (let i = 1; i <= 10; i++) 
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    };

    // --- MÁSCARA DINÂMICA (CPF e CNPJ) ---
    const handleDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else {
            value = value.replace(/^(\d{2})(\d)/, "$1.$2");
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
            value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
            value = value.replace(/(\d{4})(\d)/, "$1-$2");
        }
        setDocumento(value.slice(0, 18));
    };

    const handleSubscribe = async () => {
        const cleanDoc = documento.replace(/\D/g, "");
        
        // 1. Validação de Tamanho (Aceita 11 ou 14)
        if (cleanDoc.length !== 11 && cleanDoc.length !== 14) {
            toast({
                variant: "destructive",
                title: "Documento Inválido",
                description: "Digite um CPF (11 dígitos) ou CNPJ (14 dígitos) válido."
            });
            return;
        }

        // 2. Validação Matemática (Somente para CPF)
        if (cleanDoc.length === 11 && !isValidCPF(cleanDoc)) {
            toast({
                variant: "destructive",
                title: "CPF Inválido",
                description: "Os dígitos verificadores não conferem. Verifique o número."
            });
            return;
        }

        setLoading(true);
        try {
            // Chama o backend
            const response = await api.post("/subscription/subscribe", { cpf_cnpj: cleanDoc });
            const url = response.data.payment_url;
            setPaymentUrl(url);
            
            // Tenta abrir em nova aba
            const newWindow = window.open(url, "_blank");
            if (!newWindow) {
                toast({
                    title: "Pop-up bloqueado",
                    description: "Por favor, clique no botão para abrir a página de pagamento seguro.",
                });
            } else {
                toast({
                    title: "Redirecionando...",
                    description: "Você está sendo levado para o ambiente seguro do Asaas.",
                });
            }

        } catch (error: any) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Falha na comunicação",
                description: error.response?.data || "Não foi possível gerar a cobrança. Verifique seus dados."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-3 mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Metsuke <span className="text-primary">PRO</span></h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A infraestrutura definitiva para você focar no que importa: o resultado dos seus alunos.
                </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
                
                {/* Coluna da Esquerda: O Valor do Produto */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="border-0 shadow-none bg-transparent">
                        <CardHeader className="px-0">
                            <CardTitle className="flex items-center text-2xl">
                                <Zap className="w-6 h-6 mr-2 text-primary" />
                                O que você está levando
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-0 space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Alunos e Treinos Ilimitados",
                                    "Painel Financeiro Integrado (Asaas)",
                                    "Aplicativo White-Label (Sua Marca)",
                                    "Hospedagem de Vídeos (CDN R2)",
                                    "Gestão de Dietas e Anamnese",
                                    "Mural de Avisos e Notificações"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="pt-6 border-t">
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-5xl font-black">R$ 49,90</span>
                                    <span className="text-muted-foreground font-medium">/mês</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">Cancele quando quiser. Sem taxas escondidas.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Coluna da Direita: O Checkout */}
                <div className="lg:col-span-2">
                    <Card className="border-primary/20 shadow-2xl relative overflow-hidden backdrop-blur-sm bg-card/95">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
                        <CardHeader className="space-y-1 pb-4">
                            <CardTitle className="text-xl flex items-center justify-between">
                                Pagamento Seguro
                                <Lock className="w-4 h-4 text-muted-foreground" />
                            </CardTitle>
                            <CardDescription>
                                Seus dados são processados com criptografia bancária.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {!paymentUrl ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="doc">CPF ou CNPJ</Label>
                                        <Input 
                                            id="doc" 
                                            placeholder="000.000.000-00" 
                                            value={documento} 
                                            onChange={handleDocumentoChange} 
                                            className="h-12 text-lg font-medium transition-all focus:ring-primary/50"
                                            maxLength={18}
                                        />
                                    </div>
                                    <div className="bg-secondary/50 p-3 rounded-md flex items-start space-x-3">
                                        <CreditCard className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Você será redirecionado para o gateway do <strong>Asaas</strong> para escolher entre Pix, Boleto ou Cartão de Crédito.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex flex-col items-center text-center space-y-2">
                                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-green-600 dark:text-green-400">Checkout Liberado!</h3>
                                        <p className="text-xs text-muted-foreground">O ambiente seguro do Asaas já está pronto para você.</p>
                                    </div>
                                    <Button 
                                        size="lg"
                                        className="w-full h-14 text-base font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-600/20 transition-all" 
                                        onClick={() => window.open(paymentUrl, '_blank')}
                                    >
                                        Concluir Pagamento <ExternalLink className="ml-2 w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" className="w-full text-xs" onClick={() => setPaymentUrl("")}>
                                        Voltar e corrigir documento
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                        {!paymentUrl && (
                            <CardFooter>
                                <Button 
                                    size="lg" 
                                    className="w-full h-12 text-base font-semibold transition-all hover:scale-[1.02]" 
                                    onClick={handleSubscribe} 
                                    disabled={loading || documento.length < 14}
                                >
                                    {loading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <>Ir para Checkout <Lock className="ml-2 h-4 w-4 opacity-70" /></>
                                    )}
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionView;