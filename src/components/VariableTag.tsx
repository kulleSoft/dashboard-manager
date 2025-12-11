interface VariableTagProps {
  name: string;
  description: string;
  onClick?: () => void;
}

const VariableTag = ({ name, description, onClick }: VariableTagProps) => {
  return (
    <div 
      className="flex items-start gap-2 py-1.5 cursor-pointer group"
      onClick={onClick}
    >
      <span className="text-muted-foreground">-</span>
      <div className="flex flex-wrap items-baseline gap-1">
        <code className="font-mono text-sm text-primary bg-primary/10 px-1.5 py-0.5 rounded transition-all duration-200 group-hover:bg-primary/20 group-hover:text-glow">
          {name}
        </code>
        <span className="text-muted-foreground">→</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
    </div>
  );
};

export default VariableTag;
