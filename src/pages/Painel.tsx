import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Sun, LayoutDashboard } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Painel = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    // Remove dark mode by default
    document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSalvar = () => {
    console.log("[Painel] Salvar clicked, texto:", texto);
  
  };

  const handleCarregarPainel = () => {
    console.log("[Painel] Carregar painel clicked");
   
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
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Painel</h1>
              <p className="text-xs text-muted-foreground">Gerencie o painel do seu bot</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-xl">
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-primary" />
            ) : (
              <Sun className="w-5 h-5 text-primary" />
            )}
          </Button>
        </div>

        {/* Campo de texto */}
        <Card className="border-primary/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wide">Digite algo</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite aqui..."
              className="min-h-[150px] resize-none bg-transparent border-none focus-visible:ring-0 text-foreground text-center"
              id="action-edittext"
            />
          </CardContent>
        </Card>

        {/* Variáveis disponíveis */}
        <Card className="border-primary/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wide">Variáveis disponíveis:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              {variaveisDisponiveis.map((variavel, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  - <span className="text-primary font-medium">{variavel.nome}</span> → {variavel.descricao}
                </p>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              -<span className="text-primary font-medium">[NomeVariavel]</span> → Você também pode utilizar variáveis personalizadas. Basta colocar o nome entre colchetes [ ] e o valor correspondente será recuperado.
            </p>
            
            <div className="pt-2 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-2">Exemplo de uso:</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Tempo:<span className="text-primary">%tempo%</span>.</p>
                <p>Id trocado: <span className="text-primary">%IdTrocado%</span>.</p>
                <p>Valor ganho: <span className="text-primary">[NomeVariavel]</span>.</p>
                <p>Ads fechado: <span className="text-primary">%AdsFechados%</span>.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões */}
        <div className="space-y-3 pt-4">
          <Button 
            className="w-full py-6 text-lg rounded-full" 
            onClick={handleSalvar}
          >
            Salvar
          </Button>
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg rounded-full text-primary border-primary hover:bg-primary/5" 
            onClick={handleCarregarPainel}
          >
            Carregar painel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Painel;
