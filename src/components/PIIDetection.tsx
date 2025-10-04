import { AlertTriangle, Shield } from "lucide-react";

interface PIIDetectionProps {
  entities: Array<{
    Type: string;
    BeginOffset: number;
    EndOffset: number;
  }>;
}

export const PIIDetection = ({ entities }: PIIDetectionProps) => {
  const hasPII = entities.length > 0;
  
  const formatEntityType = (type: string) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };
  
  return (
    <div className={`fortress-card rounded-xl p-6 border-2 ${
      hasPII 
        ? 'border-warning/30 bg-warning/5' 
        : 'border-success/30 bg-success/10'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        {hasPII ? (
          <AlertTriangle className="w-6 h-6 text-warning" />
        ) : (
          <Shield className="w-6 h-6 text-success" />
        )}
        <h4 className="text-base md:text-lg font-semibold text-foreground">
          PII Detection
        </h4>
      </div>
      
      {hasPII ? (
        <div className="space-y-3">
          <div className={`p-3 rounded-lg border ${
            'border-warning/20 bg-warning/10'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="font-medium ">
                Sensitive Data Found
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mb-3">
              The following personally identifiable information was detected:
            </p>
            
            <div className="space-y-1">
              {entities.map((entity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-sm font-medium">
                    {formatEntityType(entity.Type)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            ⚠️ Be cautious when sharing content containing personal information
          </div>
        </div>
      ) : (
        <div className="text-center py-4">
          <Shield className="w-12 h-12 text-success mx-auto mb-3 opacity-60" />
          <p className="font-medium text-success">No Sensitive Data Detected</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Content appears safe from a privacy perspective
          </p>
        </div>
      )}
    </div>
  );
};