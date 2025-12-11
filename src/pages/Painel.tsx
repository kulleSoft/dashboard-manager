import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Sun, LayoutDashboard, Save, Download, Sparkles } from "lucide-react";
import VariableTag from "@/components/VariableTag";
import { toast } from "@/hooks/use-toast";

const Painel = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    console.log("[Painel] Theme toggled:", !isDarkMode ? "dark" : "light");
  };

  const handleSalvar = () => {
    console.log("[Painel] Salvar clicked, texto:", texto);
    toast({
      title: "Painel salvo!",
      description: "Suas configurações foram salvas com sucesso.",
    });
  };

  const handleCarregarPainel = () => {
    console.log("[Painel] Carregar painel clicked");
    toast({
      title: "Carregando painel...",
      description: "Aguarde enquanto carregamos suas configurações.",
    });
  };

  const handleVariableClick = (variavel: string) => {
    setTexto((prev) => prev + variavel);
  };

  const variaveisDisponiveis = [
    { nome: "%IdTrocado%", descricao: "Quantidade de IDs trocados" },
    { nome: "%CicloRealizado%", descricao: "Total de ciclos realizados" },
    { nome: "%AdsNaoFechados%", descricao: "Quantidade de anúncios que não foram fechados" },
    { nome: "%Tempo%", descricao: "Tempo em execução" },
    { nome: "%RegistroFalhas%", descricao: "Registro de falhas" },
    { nome: "%AdsFechados%", descricao: "Quantidade de anúncios que foram fechados" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground bg-grid-pattern">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative max-w-md mx-auto p-4 pb-8 space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between py-4 animate-fade-in" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow animate-float">
              <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Painel</h1>
              <p className="text-xs text-muted-foreground">Gerencie o painel do seu bot</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl">
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </Button>
        </header>

        {/* Campo de texto */}
        <Card className="border-primary/30 bg-card/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Conteúdo do Painel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite o conteúdo do painel aqui...&#10;&#10;Use as variáveis abaixo para dados dinâmicos."
              className="min-h-[180px] resize-none bg-background/50 border-border/50 focus-visible:ring-primary/50 focus-visible:border-primary/50 text-foreground font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Variáveis disponíveis */}
        <Card className="border-accent/30 bg-card/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Variáveis disponíveis
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Clique em uma variável para adicioná-la ao texto
            </p>
          </CardHeader>
          <CardContent className="space-y-1">
            {variaveisDisponiveis.map((variavel, index) => (
              <VariableTag
                key={index}
                name={variavel.nome}
                description={variavel.descricao}
                onClick={() => handleVariableClick(variavel.nome)}
              />
            ))}
            
            <div className="pt-3 mt-3 border-t border-border/50">
              <VariableTag
                name="[NomeVariavel]"
                description="Use variáveis personalizadas entre colchetes"
                onClick={() => handleVariableClick("[NomeVariavel]")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Exemplo de uso */}
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground">Exemplo de uso:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm text-muted-foreground space-y-1 bg-background/50 p-3 rounded-lg border border-border/30">
              <p>Tempo: <span className="text-primary">%Tempo%</span></p>
              <p>IDs trocados: <span className="text-primary">%IdTrocado%</span></p>
              <p>Valor ganho: <span className="text-accent">[ValorGanho]</span></p>
              <p>Ads fechados: <span className="text-primary">%AdsFechados%</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Botões */}
        <div className="space-y-3 pt-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <Button 
            variant="glow" 
            size="xl" 
            className="w-full"
            onClick={handleSalvar}
          >
            <Save className="w-5 h-5" />
            Salvar
          </Button>
          <Button 
            variant="outline" 
            size="xl" 
            className="w-full border-primary/30 hover:border-primary/60 hover:bg-primary/5"
            onClick={handleCarregarPainel}
          >
            <Download className="w-5 h-5" />
            Carregar painel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Painel;
