import { CheckCircle, AlertTriangle } from "lucide-react";
import shieldIcon from "@/assets/shield-icon.png";
import brokenShieldIcon from "@/assets/broken-shield-icon.png";

interface VerdictShieldProps {
  verdict: {
    verdict: string;
    isPhishing: boolean;
    riskScore: number;
  };
}

export const VerdictShield = ({ verdict }: VerdictShieldProps) => {
  const isPhishing = verdict.isPhishing;
  
  return (
    <div className={`fortress-card rounded-xl p-4 md:p-8 text-center border-2 ${
      isPhishing 
        ? 'border-destructive/30 bg-destructive/5' 
        : 'border-success/30 bg-success/5'
    }`}>
      <div className="relative inline-block mb-6">
        <img 
          src={isPhishing ? brokenShieldIcon : shieldIcon}
          alt={isPhishing ? "Broken Shield" : "Security Shield"}
          className={`w-24 h-24 mx-auto ${
            isPhishing 
              ? 'glitch-alert filter hue-rotate-0' 
              : 'pulse-shield'
          }`}
        />
        
        {!isPhishing && (
          <CheckCircle className="absolute -top-2 -right-2 w-8 h-8 text-success bg-background rounded-full" />
        )}
        
        {isPhishing && (
          <AlertTriangle className="absolute -top-2 -right-2 w-8 h-8 text-destructive bg-background rounded-full" />
        )}
      </div>
      
      <h3 className={`text-xl md:text-4xl font-bold mb-2 ${
        isPhishing ? 'text-destructive' : 'text-success'
      }`}>
        {verdict.verdict}
      </h3>
      
      <p className={`text-sm md:text-lg font-medium ${
        isPhishing 
          ? 'text-destructive-foreground' 
          : 'text-success-foreground'
      }`}>
        {isPhishing 
          ? 'Warning: Malicious Content Identified'
          : 'Analysis Complete: No Threats Detected'
        }
      </p>
      
      <div className={`mt-4 w-full h-2 rounded-full ${
        isPhishing ? 'bg-destructive/20' : 'bg-success/20'
      }`}>
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            isPhishing ? 'bg-destructive' : 'bg-success'
          }`}
          style={{ width: `${100 - verdict.riskScore}%` }}
        ></div>
      </div>
    </div>
  );
};