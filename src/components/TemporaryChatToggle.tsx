import { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const TemporaryChatToggle = () => {
  const [isTemporary, setIsTemporary] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsTemporary(!isTemporary)}
            className={`fortress-card border border-accent/30 transition-all duration-300 ${
              isTemporary
                ? "bg-primary/20 text-primary border-primary/50 shadow-[0_0_20px_rgba(56,139,253,0.3)]"
                : "bg-card/50 text-muted-foreground hover:bg-accent/90"
            }`}
          >
            <Bot />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="fortress-card border-accent/20 bg-card max-w-xs"
        >
          <p className="text-sm">
            Allow our model to train on your data
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};