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