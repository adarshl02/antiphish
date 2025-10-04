import { AlertCircle } from "lucide-react";

interface ThreatBreakdownProps {
  reasons: string[];
}

export const ThreatBreakdown = ({ reasons }: ThreatBreakdownProps) => {
  return (
    <div className="fortress-card rounded-xl p-6 border-2 border-destructive/30 bg-destructive/5">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-destructive" />
        <h4 className="text-base md:text-lg font-semibold text-foreground">Identified Threats</h4>
      </div>
      
      <div className="space-y-3 text-sm md:text-base">
        {reasons.map((reason, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg border border-destructive/20 bg-destructive/10"
          >
            <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="font-medium text-destructive-foreground">{reason}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 rounded-lg bg-destructive/20 border border-destructive/30">
        <p className="text-xs md:text-sm text-destructive-foreground font-medium">
          🚨 Security Recommendation
        </p>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Do not interact with this content. Delete immediately and report to your IT security team.
        </p>
      </div>
    </div>
  );
};