// It's useful to define the shape of the raw data from your API
interface SourcePiiEntity {
  Type: string;
  BeginOffset: number;
  EndOffset: number;
  Score: number; // The API includes a score
}

interface SourceKeyPhrase {
  Text: string;
  BeginOffset: number;
  EndOffset: number;
  Score: number; // The API includes a score
}

// This interface describes the 'Item' object from your API
interface SourceItem {
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
      Entities: SourcePiiEntity[];
    };
    keyPhrases: {
      KeyPhrases: SourceKeyPhrase[];
    };
  };
  text: string;
}

// This describes the successful response from your `textanalysis` function
interface ApiSuccessResponse {
  success: true;
  data: {
    params: {
      Item: SourceItem;
    };
  };
}

// This describes the error response from `handleApiError`
interface ApiErrorResponse {
  success: false;
  message: string;
  // Add any other properties your handleApiError might return
}

// A union type that represents all possible return types
export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;


// You can place these interfaces in a types.ts file or at the top of your service file

// Describes a single item in the user's history
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
  s3BucketUrl: string | null; // URL for images, null for text
}

// Describes the successful response from your API service
export interface UserHistoryResponse {
  success: true;
  data: HistoryItem[];
}
export interface ApiErrorResponseFormat {
  success: false;
  message: any;
  status: any;
}
