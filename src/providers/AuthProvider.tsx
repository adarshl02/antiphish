import { useState, useEffect, ReactNode } from "react";
import { AuthContext, User } from "../contexts/AuthContext";
import {jwtDecode} from "jwt-decode"; // ✅ default import


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error) {
      console.error("Failed to parse token:", error);
      localStorage.removeItem("AntiPhishXauthToken");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = { user, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
