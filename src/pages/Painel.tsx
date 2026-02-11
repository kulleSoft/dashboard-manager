import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Sun, LayoutDashboard } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const Painel = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [texto, setTexto] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredVariables, setFilteredVariables] = useState<typeof variaveisDisponiveis>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [triggerChar, setTriggerChar] = useState<"%" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const variaveisDisponiveis = [
    { nome: "%IdTrocado%", descricao: "Quantidade de IDs trocados" },
    { nome: "%CicloRealizado%", descricao: "Total de ciclos realizados" },
    { nome: "%AdsNaoFechados%", descricao: "Quantidade de anúncios que não foram fechados" },
    { nome: "%Tempo%", descricao: "Tempo em execução" },
    { nome: "%RegistroFalhas%", descricao: "Registro de falhas" },
    { nome: "%AdsFechados%", descricao: "Quantidade de anúncios que foram fechados" },
  ];

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const cursorPos = e.target.selectionStart || 0;
    setTexto(value);
    setCursorPosition(cursorPos);

    // Find the last trigger character before cursor
    const textBeforeCursor = value.substring(0, cursorPos);
    const lastPercentIndex = textBeforeCursor.lastIndexOf("%");

    // Determine which trigger is valid
    let activeTrigger: "%" | null = null;
    let searchStart = -1;

    if (lastPercentIndex !== -1) {
      const textAfterTrigger = textBeforeCursor.substring(lastPercentIndex + 1);
      if (!textAfterTrigger.includes("%")) {
        activeTrigger = "%";
        searchStart = lastPercentIndex;
      }
    }

    if (activeTrigger && searchStart !== -1) {
      const search = textBeforeCursor.substring(searchStart + 1).toLowerCase();
      setSearchTerm(search);
      setTriggerChar(activeTrigger);

      const filtered = variaveisDisponiveis.filter((v) =>
        v.nome.toLowerCase().includes(search) || 
        v.descricao.toLowerCase().includes(search)
      );
      setFilteredVariables(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setTriggerChar(null);
    }
  };

  const insertVariable = (variableName: string) => {
    if (!textareaRef.current) return;

    const textBeforeCursor = texto.substring(0, cursorPosition);
    const textAfterCursor = texto.substring(cursorPosition);

    // Find the trigger position
    let triggerIndex = -1;
    if (triggerChar === "%") {
      triggerIndex = textBeforeCursor.lastIndexOf("%");
    }

    if (triggerIndex !== -1) {
      const newText = texto.substring(0, triggerIndex) + variableName + textAfterCursor;
      setTexto(newText);
      
      // Set cursor position after the inserted variable
      const newCursorPos = triggerIndex + variableName.length;
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }

    setShowSuggestions(false);
    setTriggerChar(null);
  };

  const handleSalvar = () => {
    const textoGet = (document.getElementById("action-edittext") as HTMLTextAreaElement)?.value;
    console.log("[Painel] Salvar clicked, texto@@", textoGet);
  };

  const handleCarregarPainel = () => {
    console.log("[Painel] Carregar painel clicked");
  };

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
        <Card className="border-primary/50 dark:bg-[#1C2220]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wide">Digite algo</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <Textarea
              ref={textareaRef}
              value={texto}
              onChange={handleTextChange}
              placeholder="Digite aqui... Use % ou [ para inserir variáveis"
              className="min-h-[150px] resize-none bg-transparent border-none focus-visible:ring-0 text-foreground text-center"
              id="action-edittext"
            />
            
            {/* Autocomplete suggestions */}
            {showSuggestions && (
              <div className="absolute left-4 right-4 bottom-2 z-50">
                <Command className="rounded-lg border shadow-md bg-popover">
                  <CommandList>
                    <CommandEmpty>Nenhuma variável encontrada</CommandEmpty>
                    <CommandGroup heading={triggerChar === "%" ? "Variáveis do sistema" : "Variável personalizada"}>
                      {filteredVariables.map((variavel, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => insertVariable(variavel.nome)}
                          className="cursor-pointer"
                        >
                          <span className="text-primary font-medium">{variavel.nome}</span>
                          <span className="ml-2 text-muted-foreground text-sm">→ {variavel.descricao}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Variáveis disponíveis */}
        <Card className="border-primary/50 dark:bg-[#1C2220]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wide">Variáveis disponíveis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {variaveisDisponiveis.map((variavel, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50">
                <code className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md font-medium whitespace-nowrap">
                  {variavel.nome}
                </code>
                <span className="text-muted-foreground text-xs">→</span>
                <span className="text-sm text-muted-foreground">{variavel.descricao}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50">
              <code className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md font-medium whitespace-nowrap">
                [NomeVariavel]
              </code>
              <span className="text-muted-foreground text-xs">→</span>
              <span className="text-sm text-muted-foreground">Variável personalizada entre colchetes</span>
            </div>
          </CardContent>
        </Card>

        {/* Exemplo de uso */}
        <Card className="border-primary/50 dark:bg-[#1C2220]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wide">Exemplo de uso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-secondary/30 border border-border/50 p-4 font-mono text-sm space-y-1.5">
              <p className="text-muted-foreground">Tempo: <span className="text-primary font-medium">%Tempo%</span></p>
              <p className="text-muted-foreground">Id trocado: <span className="text-primary font-medium">%IdTrocado%</span></p>
              <p className="text-muted-foreground">Valor ganho: <span className="text-primary font-medium">[NomeVariavel]</span></p>
              <p className="text-muted-foreground">Ads fechado: <span className="text-primary font-medium">%AdsFechados%</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Botões */}
        <div className="flex gap-3 pt-4">
          <Button 
            className="flex-1 py-5 text-base rounded-xl bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-medium" 
            onClick={handleSalvar}
          >
            Salvar
          </Button>
          <Button 
            className="flex-1 py-5 text-base rounded-xl bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-medium" 
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
