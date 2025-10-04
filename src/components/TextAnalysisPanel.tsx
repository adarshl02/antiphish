import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Shield, Loader2 } from "lucide-react";
import { AnalysisResponse } from "../pages/Index"; // Ensure this path is correct
import { textanalysis } from "@/service/analyseservice"; // Ensure this path is correct
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface TextAnalysisPanelProps {
  onAnalysis: (data: AnalysisResponse) => void;
  onAnalysisStart: () => void;
  onAnalysisEnd: () => void;
  isAnalyzingText: boolean;
 
}

export const TextAnalysisPanel = ({ onAnalysis, onAnalysisStart, onAnalysisEnd, isAnalyzingText }: TextAnalysisPanelProps) => {
  const [text, setText] = useState("");
  const {user,isLoading} = useAuth();

  const handleAnalyze = async () => {
    if (!text.trim()) return;
     if (!user) {
      toast.info("Please log in to analyze content.");
      return; 
    }
    
    onAnalysisStart();
    
    try {
      // Call the actual analysis service
      const apiResponse = await textanalysis(text);
      if(!apiResponse.success){
        toast.info(apiResponse?.message || "Analysis failed. Please try again.");
        toast.error("Analysis failed. Please try again.");
        return;
      }

      // Check for a successful response and the expected data structure
      if (apiResponse && apiResponse.success && apiResponse?.data?.params?.Item) {
        const sourceItem = apiResponse.data.params.Item;

        // Transform the API response to match the AnalysisResponse interface
        const formattedResponse: AnalysisResponse = {
          data: {
            Item: {
              verdict: {
                verdict: sourceItem.verdict.verdict,
                isPhishing: sourceItem.verdict.isPhishing,
                riskScore: sourceItem.verdict.riskScore,
                reasons: sourceItem.verdict.reasons,
              },
              analysis: {
                sentiment: {
                  // The API response nests SentimentScore, so we extract it []
                  SentimentScore: sourceItem.analysis.sentiment.SentimentScore,
                },
                piiEntities: {
                  // The interface doesn't have 'Score', so we map to create the correct structure
                  Entities: sourceItem.analysis.piiEntities.Entities.map((entity: any) => ({
                    Type: entity.Type,
                    BeginOffset: entity.BeginOffset,
                    EndOffset: entity.EndOffset,
                  })),
                },
                keyPhrases: {
                  // The interface doesn't have 'Score', so we map here as well
                  KeyPhrases: sourceItem.analysis.keyPhrases.KeyPhrases.map((phrase: any) => ({
                    Text: phrase.Text,
                    BeginOffset: phrase.BeginOffset,
                    EndOffset: phrase.EndOffset,
                  })),
                },
              },
              text: sourceItem.text,
            },
          },
        };
        setText("");
        onAnalysis(formattedResponse);
      } else {
        // Handle cases where the API response structure is not as expected
        console.error("Invalid API response structure:", apiResponse);
        // Optionally, you could set an error state to show a message to the user
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      // Optionally, set an error state here as well
    } finally {
      onAnalysisEnd();
    }
  };

  return (
    <div className="fortress-card rounded-xl p-3 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Text Analysis</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Analyze suspicious messages and emails</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <Textarea
          placeholder="Paste suspicious text, message, or email content here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="security-input min-h-[100px] md:min-h-[200px] resize-none text-xs md:text-sm"
          disabled={isAnalyzingText}
        />
        
        <Button 
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzingText}
          className="w-full scan-glow bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {isAnalyzingText ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Scan Text
            </>
          )}
        </Button>
      </div>
    </div>
  );
};