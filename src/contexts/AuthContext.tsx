import { createContext, useContext, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  avatar: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};