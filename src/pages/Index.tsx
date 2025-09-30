import { useState } from "react";
import { InputZone } from "../components/InputZone";
import { AnalysisDashboard } from "../components/AnalysisDashboard";
import { Header } from "../components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { googleSignup } from "@/service/authservice";

export interface AnalysisResponse {
  data: {
    Item: {
      verdict: {
        verdict: string;
        isPhishing: boolean;
        riskScore: number;
        reasons: string[];
      };
      analysis: {
        sentiment: {
          SentimentScore: {
            Positive: number;
            Negative: number;
            Neutral: number;
          };
        };
        piiEntities: {
          Entities: Array<{
            Type: string;
            BeginOffset: number;
            EndOffset: number;
          }>;
        };
        keyPhrases?: {
          KeyPhrases: Array<{
            Text: string;
            BeginOffset: number;
            EndOffset: number;
          }>;
        };
      };
      text?: string;
      extractedText?: string;
    };
  };
}

const Index = () => {

  const { user, isLoading } = useAuth();
  

  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [isAnalyzingText, setIsAnalyzingText] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  const handleAnalysis = async (data: AnalysisResponse) => {
    toast.success("Analysis completed successfully!");
    setAnalysisData(data);
  };

  const handleAnalysisStartImage = () => {
    setIsAnalyzingImage(true);
    setAnalysisData(null);
  };

  const handleAnalysisEndImage = () => {
    setIsAnalyzingImage(false);
  };

  const handleAnalysisStartText = () => {
    setIsAnalyzingText(true);
    setAnalysisData(null);
  };

  const handleAnalysisEndText = () => {
    setIsAnalyzingText(false);
  };


useGoogleOneTapLogin({
    disabled: isLoading || !!user,
    onSuccess: async credentialResponse => {      
      if (credentialResponse.credential) {
        const decoded: { name: string, email: string, picture: string, sub: string } = jwtDecode(credentialResponse.credential);
        const data = {
          name: decoded.name,
          email: decoded.email,
          avatar: decoded.picture,
          uid: decoded.sub
        };
        const response = await googleSignup(data);

        localStorage.setItem('AntiPhishXauthToken', response.data);
        window.location.reload();
      }
    },
    onError: () => console.log('Login Failed'),
  });

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
       
        <Header />

        <InputZone
          onAnalysis={handleAnalysis}
          onAnalysisStartText={handleAnalysisStartText}
          onAnalysisEndText={handleAnalysisEndText}
          onAnalysisStartImage={handleAnalysisStartImage}
          onAnalysisEndImage={handleAnalysisEndImage}
          isAnalyzingText={isAnalyzingText}
          isAnalyzingImage={isAnalyzingImage}
        />

        {analysisData && (
          <AnalysisDashboard data={analysisData} />
        )}
      </div>
    </div>
  );
};

export default Index;