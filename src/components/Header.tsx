import { Shield } from "lucide-react";
import { AppDrawer } from "./AppDrawer";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { TemporaryChatToggle } from "./TemporaryChatToggle";
import { ExtensionComingSoonBadge } from "./ExtensionComingSoonBadge";
import { ExtensionBadge } from "./ExtensionBadge";

export const Header = () => {
  return (
    <>
     {/* Top Controls */}
   <div className="mt-4 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 rounded-2xl md:mx-8 backdrop-blur-sm bg-background/75  md:bg-transparent md:backdrop-blur-none md:border-none">
        <div className="flex items-center gap-3">
          <AppDrawer />
          <TemporaryChatToggle />
            <div className="hidden md:block">
            <ExtensionComingSoonBadge />
          </div>
          <div className="md:hidden">
            <ExtensionBadge />
          </div>
        </div>
        <GoogleLoginButton />
        
      </div>
       {/* Main Header Content */}
    <header className="text-center mb-8 md:mb-12 relative mx-4 mt-12 md:mt-0">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="p-2 md:p-4 rounded-2xl fortress-card">
          <Shield className="w-8 h-8 md:w-12 md:h-12 text-primary animate-pulse" />
        </div>
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Anti<span className="text-primary">Phish</span>X
          </h1>
          <div className="w-full h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full mt-2"></div>
        </div>
      </div>
      
      <p className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Advanced threat detection for suspicious content. 
        <span className="text-primary font-medium"> Analyze text and images</span> for phishing attempts 
        with military-grade security protocols.
      </p>
      
      <div className="flex items-center justify-center gap-8 mt-6 text-xs md:text-sm text-muted-foreground ">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-shield"></div>
          <span>Real-time Analysis</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>Advanced AI Detection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-warning rounded-full"></div>
          <span>PII Protection</span>
        </div>
      </div>
    </header>
     </>
  );
};