export interface HistoryItem {
  id: string;
  text: string;
  verdict: {
    isPhishing: boolean;
    riskScore: number;
    reasons: string[];
    verdict: string;
  };
  sentiment: {
    Sentiment: string;
    SentimentScore: {
      Neutral: number;
      Negative: number;
      Positive: number;
      Mixed: number;
    };
  };
  s3BucketUrl: string | null;
}

export interface TextHistoryItem extends HistoryItem {
  id: `USERHIS${string}`;
  s3BucketUrl: null;
}

export interface ImageHistoryItem extends HistoryItem {
  id: `IMGHIS${string}`;
  s3BucketUrl: string;
}