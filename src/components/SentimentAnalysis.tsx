import { useEffect, useState } from "react";

interface SentimentAnalysisProps {
  sentiment: {
    SentimentScore: {
      Positive: number;
      Negative: number;
      Neutral: number;
    };
  };
}

export const SentimentAnalysis = ({ sentiment }: SentimentAnalysisProps) => {
  const [animatedValues, setAnimatedValues] = useState({
    Positive: 0,
    Negative: 0,
    Neutral: 0
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        Positive: Math.round(sentiment.SentimentScore.Positive * 100),
        Negative: Math.round(sentiment.SentimentScore.Negative * 100),
        Neutral: Math.round(sentiment.SentimentScore.Neutral * 100)
      });
    }, 800);
    
    return () => clearTimeout(timer);
  }, [sentiment]);
  
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  
  let cumulativePercentage = 0;
  
  return (
    <div className="fortress-card rounded-xl p-6">
      <h4 className="text-base md:text-lg font-semibold text-foreground mb-4">Sentiment Analysis</h4>
      
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          {/* Negative segment */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#da3633"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(animatedValues.Negative / 100) * circumference} ${circumference}`}
            strokeDashoffset={0}
            className="transition-all duration-2000 ease-out"
            style={{
              filter: animatedValues.Negative > 0 ? 'drop-shadow(0 0 8px #da363340)' : 'none'
            }}
          />
          
          {/* Neutral segment */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(animatedValues.Neutral / 100) * circumference} ${circumference}`}
            strokeDashoffset={-((animatedValues.Negative / 100) * circumference)}
            className="transition-all duration-2000 ease-out delay-300"
          />
          
          {/* Positive segment */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#238636"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(animatedValues.Positive / 100) * circumference} ${circumference}`}
            strokeDashoffset={-((animatedValues.Negative + animatedValues.Neutral) / 100) * circumference}
            className="transition-all duration-2000 ease-out delay-500"
            style={{
              filter: animatedValues.Positive > 0 ? 'drop-shadow(0 0 8px #23863640)' : 'none'
            }}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">Emotion</div>
            <div className="text-xs text-muted-foreground">Tone</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-xs md:text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span>Negative</span>
          </div>
          <span className="font-medium">{animatedValues.Negative}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
            <span>Neutral</span>
          </div>
          <span className="font-medium">{animatedValues.Neutral}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span>Positive</span>
          </div>
          <span className="font-medium">{animatedValues.Positive}%</span>
        </div>
      </div>
    </div>
  );
};