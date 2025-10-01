import { ImageHistoryItem, TextHistoryItem } from '@/types/history';
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
   userTextHistory: TextHistoryItem[];
  userImageHistory: ImageHistoryItem[];
  refreshHistory: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  userTextHistory: [],
  userImageHistory: [],
  refreshHistory: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};