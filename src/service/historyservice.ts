import axios from 'axios';
import { handleApiError } from './apierror';
import { HistoryItem } from '@/types/history';

const API_URL = 'https://antiphish-2.onrender.com/api/v1';

export const fetchUserHistory = async () => {
  try {
    const token = localStorage.getItem('AntiPhishXauthToken') || '';
    
    const response = await axios.get<HistoryItem[]>(`${API_URL}/text/get-user-history`, {
      headers: {
        'Authorization': `${token}`
      },
      withCredentials: true,
    });    
    
    return { success: true, data: response.data.response.data  };
  } catch (error) {
    return handleApiError(error, 'History Fetch API Error');
  }
};