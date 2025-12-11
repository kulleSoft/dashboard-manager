import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface SettingButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  onLongClick?: () => void;
}

const SettingButton = ({ icon: Icon, label, onClick, onLongClick }: SettingButtonProps) => {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const handleMouseDown = () => {
    console.log("[Painel SettingButton] MouseDown:", label);
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      console.log("[Painel SettingButton] Long press detected:", label);
      onLongClick?.();
    }, 600);
  };

  const handleMouseUp = () => {
    console.log("[Painel SettingButton] MouseUp:", label);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleClick = () => {
    if (!isLongPress.current) {
      console.log("[Painel SettingButton] Click:", label);
      onClick?.();
    }
  };

  const handleTouchStart = () => {
    console.log("[Painel SettingButton] TouchStart:", label);
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      console.log("[Painel SettingButton] Long touch detected:", label);
      onLongClick?.();
    }, 600);
  };

  const handleTouchEnd = () => {
    console.log("[Painel SettingButton] TouchEnd:", label);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <Card
      className="group flex flex-col items-center justify-center p-4 cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-primary/5 active:scale-95 transition-all duration-300 min-h-[80px] hover:shadow-glow"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Icon className="w-6 h-6 mb-2 text-primary transition-transform duration-300 group-hover:scale-110" />
      <span className="text-xs text-center text-foreground font-medium">{label}</span>
    </Card>
  );
};

export default SettingButton;
