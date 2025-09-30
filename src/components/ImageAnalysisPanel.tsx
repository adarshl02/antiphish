import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image, Upload, Shield, Loader2 } from "lucide-react";
import { AnalysisResponse } from "../pages/Index";
import imageShieldIcon from "@/assets/image-shield-icon.png";
import { imageanalysis } from "@/service/analyseservice";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ImageAnalysisPanelProps {
  onAnalysis: (data: AnalysisResponse) => void;
  onAnalysisStart: () => void;
  onAnalysisEnd: () => void;
  isAnalyzingImage: boolean;
}

export const ImageAnalysisPanel = ({ onAnalysis, onAnalysisStart, onAnalysisEnd, isAnalyzingImage }: ImageAnalysisPanelProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {user,isLoading} = useAuth();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
     if (!user) {
      toast.info("Please log in to analyze content.");
      return; 
    }
    onAnalysisStart();
    
    try {
      // Mock API call for demonstration
       const apiResponse = await imageanalysis(selectedFile);
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
    <div className="fortress-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Image className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Image Analysis</h3>
          <p className="text-sm text-muted-foreground">Scan images for phishing attempts</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
            dragOver 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          } ${isAnalyzingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isAnalyzingImage && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isAnalyzingImage}
          />
          
          {selectedFile ? (
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                <Image className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <img 
                src={imageShieldIcon} 
                alt="Shield with image icon" 
                className="w-16 h-16 mx-auto opacity-60"
              />
              <div>
                <p className="text-foreground font-medium">Drag & Drop a Suspicious Image</p>
                <p className="text-sm text-muted-foreground">or Click to Upload</p>
              </div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzingImage}
          className="w-full scan-glow bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          {isAnalyzingImage ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Scan Image
            </>
          )}
        </Button>
      </div>
    </div>
  );
};