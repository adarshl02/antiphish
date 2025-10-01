import { useState, useEffect, ReactNode, useCallback } from "react";
import { AuthContext, User } from "../contexts/AuthContext";
import {jwtDecode} from "jwt-decode"; // ✅ default import
import { ImageHistoryItem, TextHistoryItem } from "@/types/history";
import { HistoryItem } from "@/types";
import { fetchUserHistory } from "@/service/historyservice";


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userTextHistory, setUserTextHistory] = useState<TextHistoryItem[]>([]);
  const [userImageHistory, setUserImageHistory] = useState<ImageHistoryItem[]>([]);

    const refreshHistory = useCallback(async () => {
    const result = await fetchUserHistory();
    
    if ('data' in result) {
      
      const historyData = result.data as HistoryItem[];
    
      const textHistory = historyData.filter(
        (item): item is TextHistoryItem => item.id.startsWith('USERHIS')
      );
      
      const imageHistory = historyData.filter(
        (item): item is ImageHistoryItem => item.id.startsWith('IMGHIS')
      );
      
      setUserTextHistory(textHistory);
      setUserImageHistory(imageHistory);
    }
  }, []);

  // 🔹 Check token on first load
  useEffect(() => {
    try {
      const token = localStorage.getItem("AntiPhishXauthToken");

      if (token) {
        const decoded: {
          name: string;
          email: string;
          avatar: string;
          userId: string;
          exp: number;
          iat: number;
        } = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          // Token expired
          localStorage.removeItem("AntiPhishXauthToken");
          setUser(null);
        } else {
          // Token valid
          setUser({
            name: decoded.name,
            email: decoded.email,
            avatar: decoded.avatar,
            userId: decoded.userId,
          });
        }
      } else {
        setUser(null);
      }

      refreshHistory();
    } catch (error) {
      console.error("Failed to parse token:", error);
      localStorage.removeItem("AntiPhishXauthToken");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [refreshHistory]);

  const value = { user, isLoading , userTextHistory, userImageHistory, refreshHistory};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
