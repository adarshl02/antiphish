import { useEffect, useState } from "react";

interface RiskScoreGaugeProps {
  score: number;
}

export const RiskScoreGauge = ({ score }: RiskScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  const getScoreColor = (score: number) => {
    if (score <= 20) return 'text-success';
    if (score <= 60) return 'text-warning';
    return 'text-destructive';
  };
  
  const getArcColor = (score: number) => {
    if (score <= 20) return '#238636';
    if (score <= 60) return '#d29922';
    return '#da3633';
  };
  
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  
  return (
    <div className="fortress-card rounded-xl p-6">
      <h4 className="text-base md:text-lg font-semibold text-foreground mb-4">Risk Score</h4>
      
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="hsl(var(--border))"
            strokeWidth="8"
            fill="none"
            className="opacity-20"
          />
          
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={getArcColor(score)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-2000 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px ${getArcColor(score)}40)`
            }}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
              {animatedScore}
            </div>
            <div className="text-xs text-muted-foreground">/ 100</div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Safe</span>
          <span>Moderate</span>
          <span>High Risk</span>
        </div>
        
        <div className="flex h-2 rounded-full overflow-hidden">
          <div className="flex-1 bg-success"></div>
          <div className="flex-1 bg-warning"></div>
          <div className="flex-1 bg-destructive"></div>
        </div>
      </div>
    </div>
  );
};