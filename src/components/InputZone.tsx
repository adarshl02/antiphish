import { useState } from "react";
import { TextAnalysisPanel } from "./TextAnalysisPanel";
import { ImageAnalysisPanel } from "./ImageAnalysisPanel";
import { AnalysisResponse } from "../pages/Index";

interface InputZoneProps {
  onAnalysis: (data: AnalysisResponse) => void;
  onAnalysisStartText: () => void;
  onAnalysisEndText: () => void;
  onAnalysisStartImage: () => void;
  onAnalysisEndImage: () => void;
  isAnalyzingText: boolean;
  isAnalyzingImage: boolean;
}

export const InputZone = ({ onAnalysis, onAnalysisStartText, onAnalysisEndText, onAnalysisStartImage,onAnalysisEndImage, isAnalyzingText,isAnalyzingImage }: InputZoneProps) => {
  return (
    <div className="mb-16">
      <div className="grid md:grid-cols-2 gap-8">
        <TextAnalysisPanel 
          onAnalysis={onAnalysis}
          onAnalysisStart={onAnalysisStartText}
          onAnalysisEnd={onAnalysisEndText}
          isAnalyzingText={isAnalyzingText}
        
        />
        <ImageAnalysisPanel 
          onAnalysis={onAnalysis}
          onAnalysisStart={onAnalysisStartImage}
          onAnalysisEnd={onAnalysisEndImage}
          isAnalyzingImage={isAnalyzingImage}
         
        />
      </div>
    </div>
  );
};