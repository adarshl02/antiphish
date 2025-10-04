import { Puzzle } from "lucide-react";

export const ExtensionComingSoonBadge = () => {
  return (
    <div className=" md:flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary animate-pulse">
      <Puzzle className="h-4 w-4" />
      <span>Chrome Extension Coming Soon</span>
    </div>
  );
};