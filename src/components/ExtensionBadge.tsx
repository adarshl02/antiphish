import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Puzzle } from "lucide-react";

export const ExtensionBadge = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fortress-card border border-accent/30 hover:bg-accent/10"
          >
            <Puzzle className="h-5 w-5 text-primary" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Chrome Extension Coming Soon!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};