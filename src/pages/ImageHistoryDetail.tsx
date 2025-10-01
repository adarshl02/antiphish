import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Image as ImageIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const ImageHistoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userImageHistory } = useAuth();

  const item = userImageHistory.find((h) => h.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">History item not found</h2>
          <Button onClick={() => navigate("/")}>Go Back</Button>
        </div>
      </div>
    );
  }

  const getVerdictIcon = () => {
    if (item.verdict.isPhishing) {
      return <AlertTriangle className="w-6 h-6 text-danger" />;
    }
    return <CheckCircle className="w-6 h-6 text-success" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 border border-accent/30 hover:bg-accent/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Image Display */}
          <div className="fortress-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-primary" />
              Analyzed Image
            </h2>
            <div className="rounded-lg overflow-hidden border border-accent/20">
              <img
                src={item.s3BucketUrl}
                alt="Analyzed content"
                className="w-full h-auto max-h-[500px] object-contain bg-muted"
              />
            </div>
          </div>

          {/* Extracted Text */}
          {item.text && (
            <div className="fortress-card rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Extracted Text</h2>
              <p className="text-foreground/90 whitespace-pre-wrap">{item.text}</p>
            </div>
          )}

          {/* Verdict */}
          <div className="fortress-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              {getVerdictIcon()}
              Verdict
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-foreground mb-2">{item.verdict.verdict}</p>
                <p className="text-sm text-muted-foreground">
                  Phishing Status: {item.verdict.isPhishing ? "⚠️ Detected" : "✅ Safe"}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Risk Score</span>
                  <span className="text-sm font-bold text-foreground">{item.verdict.riskScore}/100</span>
                </div>
                <Progress value={item.verdict.riskScore} className="h-2" />
              </div>

              {item.verdict.reasons.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Reasons:</h3>
                  <ul className="space-y-1">
                    {item.verdict.reasons.map((reason, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-danger">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="fortress-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Sentiment Analysis</h2>
            <div className="space-y-4">
              <p className="text-lg font-medium text-foreground">
                Overall Sentiment: <span className="text-primary">{item.sentiment.Sentiment}</span>
              </p>

              <div className="space-y-3">
                {Object.entries(item.sentiment.SentimentScore).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-foreground">{key}</span>
                      <span className="text-sm font-medium text-foreground">
                        {(value * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={value * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageHistoryDetail;