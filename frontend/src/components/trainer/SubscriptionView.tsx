import { useState } from "react";
import { CreditCard, CheckCircle, Loader2, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import api from "@/services/api";

const SubscriptionView = () => {
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState("");

    // --- FUNÇÃO DE VALIDAÇÃO DE CPF (Algoritmo Oficial) ---
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
    }

    const handleSubscribe = async () => {
        // Limpeza básica
        const cleanDoc = cpfCnpj.replace(/\D/g, "");
        
        // 1. Validação de Tamanho
        if (cleanDoc.length < 11) {
            toast.error("CPF inválido", { description: "O CPF deve ter 11 dígitos." });
            return;
        }

        // 2. Validação Matemática (NOVO)
        if (!isValidCPF(cleanDoc)) {
            toast.error("CPF inválido", { description: "Os dígitos verificadores não conferem. Verifique o número." });
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
                toast.info("Pop-up bloqueado. Clique no link para pagar.");
            } else {
                toast.success("Link de pagamento gerado!");
            }

        } catch (error: any) {
            console.error(error);
            // Tratamento de erro mais amigável
            if (error.response?.data) {
                // Se o Asaas retornar erro (ex: CPF inválido na base deles), mostramos aqui
                toast.error("Erro no cadastro", { description: error.response.data });
            } else {
                toast.error("Erro ao gerar assinatura", { description: "Tente novamente mais tarde." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto p-4">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Assinatura Premium</h1>
                <p className="text-muted-foreground text-lg">Desbloqueie todo o potencial da sua consultoria online.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Cartão de Benefícios */}
                <Card className="border-primary/10 shadow-md h-full">
                    <CardHeader className="pb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Plano Profissional</CardTitle>
                        <CardDescription>Tudo o que você precisa para escalar.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-baseline">
                            <span className="text-4xl font-extrabold">R$ 49,90</span>
                            <span className="text-muted-foreground ml-2">/mês</span>
                        </div>
                        
                        <div className="space-y-3">
                            <p className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Incluso no plano:</p>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span className="text-foreground/80">Alunos Ilimitados</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span className="text-foreground/80">App White-Label (Sua Marca)</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span className="text-foreground/80">Gestão Financeira e Cobrança</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span className="text-foreground/80">Upload de Dietas e Anamneses</span></li>
                                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> <span className="text-foreground/80">Suporte Prioritário</span></li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Formulário de Pagamento */}
                <Card className="border-2 border-primary shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                        SEGURO & CRIPTOGRAFADO
                    </div>
                    <CardHeader>
                        <CardTitle>Dados de Faturamento</CardTitle>
                        <CardDescription>
                            Informe seu documento para gerar a nota fiscal e o link de pagamento seguro do Asaas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         {!paymentUrl ? (
                            <div className="space-y-3">
                                <Label htmlFor="doc">CPF ou CNPJ</Label>
                                <Input 
                                    id="doc" 
                                    placeholder="000.000.000-00" 
                                    value={cpfCnpj} 
                                    onChange={(e) => setCpfCnpj(e.target.value)} 
                                    className="h-11 text-lg"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Ao continuar, você será redirecionado para a página segura do Asaas onde poderá pagar via <strong>Pix, Boleto ou Cartão</strong>.
                                </p>
                            </div>
                         ) : (
                            <Alert className="bg-green-50 border-green-200">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <AlertTitle className="text-green-800 font-semibold mb-2">Pagamento Iniciado!</AlertTitle>
                                <AlertDescription className="text-green-700">
                                    Seu link de pagamento foi gerado com sucesso.
                                    <div className="mt-4">
                                        <Button 
                                            className="w-full bg-green-600 hover:bg-green-700 text-white" 
                                            onClick={() => window.open(paymentUrl, '_blank')}
                                        >
                                            Pagar Agora <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </AlertDescription>
                            </Alert>
                         )}
                    </CardContent>
                    <CardFooter>
                        {!paymentUrl && (
                            <Button className="w-full h-11 text-base font-semibold" onClick={handleSubscribe} disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CreditCard className="mr-2 h-5 w-5" />}
                                Ir para Pagamento Seguro
                            </Button>
                        )}
                        {paymentUrl && (
                             <Button variant="ghost" className="w-full" onClick={() => setPaymentUrl("")}>
                                Voltar e corrigir dados
                             </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SubscriptionView;