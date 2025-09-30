import { useAuth } from "@/contexts/AuthContext";
import { Shield } from "lucide-react";

export const Header = () => {

  const {user,isLoading} = useAuth();


  return (
    <header className="text-center mb-12">
            {!isLoading && user && (
        <div className="absolute top-0 right-0 flex items-center gap-3 p-4">
          <div className="text-right">
            {/* 3. User's name and email */}
            <p className="text-sm font-semibold text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          {/* 4. User's circular avatar with a themed border */}
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full border-2 border-primary/50"
          />
        </div>
      )} 
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="p-4 rounded-2xl fortress-card">
          <Shield className="w-12 h-12 text-primary" />
        </div>
        <div>
          <h1 className="text-6xl font-bold text-foreground tracking-tight">
            Anti<span className="text-primary">Phish</span>X
          </h1>
          <div className="w-full h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full mt-2"></div>
        </div>
      </div>
      
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Advanced threat detection for suspicious content. 
        <span className="text-primary font-medium"> Analyze text and images</span> for phishing attempts 
        with military-grade security protocols.
      </p>
      
      <div className="flex items-center justify-center gap-8 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-shield"></div>
          <span>Real-time Analysis</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span>Advanced AI Detection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-warning rounded-full"></div>
          <span>PII Protection</span>
        </div>
      </div>
    </header>
  );
};