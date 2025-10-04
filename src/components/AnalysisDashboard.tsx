import { VerdictShield } from "./VerdictShield";
import { RiskScoreGauge } from "./RiskScoreGauge";
import { SentimentAnalysis } from "./SentimentAnalysis";
import { PIIDetection } from "./PIIDetection";
import { ThreatBreakdown } from "./ThreatBreakdown";
import { ExtractedContent } from "./ExtractedContent";
import { AnalysisResponse } from "../pages/Index";

interface AnalysisDashboardProps {
  data: AnalysisResponse;
}

export const AnalysisDashboard = ({ data }: AnalysisDashboardProps) => {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Security Analysis Report</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Row - Main Verdict */}
        <div className="lg:col-span-3">
          <VerdictShield verdict={data.data.Item.verdict} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Risk Score */}
        <RiskScoreGauge score={data.data.Item.verdict.riskScore} />
        
        {/* Sentiment Analysis */}
        <SentimentAnalysis sentiment={data.data.Item.analysis.sentiment} />
        
        {/* PII Detection */}
        <PIIDetection entities={data.data.Item.analysis.piiEntities.Entities} />
        
        {/* Threat Breakdown */}
        {data.data.Item.verdict.reasons.length > 0 && (
          <div className="md:col-span-2 lg:col-span-3">
            <ThreatBreakdown reasons={data.data.Item.verdict.reasons} />
          </div>
        )}
        
        {/* Extracted Content */}
        <div className="md:col-span-2 lg:col-span-3">
          <ExtractedContent 
            text={data.data.Item.text || data.data.Item.extractedText || ""} 
            keyPhrases={data.data.Item.analysis.keyPhrases?.KeyPhrases || []}
            piiEntities={data.data.Item.analysis.piiEntities.Entities}
          />
        </div>
      </div>
    </div>
  );
};