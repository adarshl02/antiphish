import { FileText } from "lucide-react";

interface ExtractedContentProps {
  text: string;
  keyPhrases: Array<{
    Text: string;
    BeginOffset: number;
    EndOffset: number;
  }>;
  piiEntities: Array<{
    Type: string;
    BeginOffset: number;
    EndOffset: number;
  }>;
}

export const ExtractedContent = ({ text, keyPhrases, piiEntities }: ExtractedContentProps) => {
  const highlightText = (text: string) => {
    if (!text) return text;
    
    // Combine all entities for highlighting
    const allEntities = [
      ...keyPhrases.map(phrase => ({
        start: phrase.BeginOffset,
        end: phrase.EndOffset,
        type: 'keyphrase'
      })),
      ...piiEntities.map(entity => ({
        start: entity.BeginOffset,
        end: entity.EndOffset,
        type: 'pii'
      }))
    ].sort((a, b) => a.start - b.start);
    
    if (allEntities.length === 0) return text;
    
    let highlightedText = '';
    let lastIndex = 0;
    
    allEntities.forEach(entity => {
      if (entity.start >= 0 && entity.end <= text.length && entity.start >= lastIndex) {
        // Add text before highlight
        highlightedText += text.slice(lastIndex, entity.start);
        
        // Add highlighted text
        const highlightedPortion = text.slice(entity.start, entity.end);
        const className = entity.type === 'pii' 
          ? 'bg-warning/30 text-warning-foreground px-1 rounded'
          : 'bg-primary/30 text-primary-foreground px-1 rounded';
        
        highlightedText += `<mark class="${className}">${highlightedPortion}</mark>`;
        lastIndex = entity.end;
      }
    });
    
    // Add remaining text
    highlightedText += text.slice(lastIndex);
    
    return highlightedText;
  };
  
  return (
    <div className="fortress-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-primary" />
        <h4 className="text-base md:text-lg font-semibold text-foreground">Content Analysis</h4>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-foreground">
              Analyzed Content
            </span>
          </div>
          
          <div 
            className="text-xs md:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ 
              __html: highlightText(text || "No content available") 
            }}
          />
        </div>
        
        {(keyPhrases.length > 0 || piiEntities.length > 0) && (
          <div className="flex flex-wrap gap-3 text-xs">
            {keyPhrases.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary/30 rounded"></div>
                <span className="text-muted-foreground">Key Phrases</span>
              </div>
            )}
            {piiEntities.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-warning/30 rounded"></div>
                <span className="text-muted-foreground">Personal Information</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};