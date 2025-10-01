import axios from 'axios';
import { handleApiError } from './apierror';


const API_URL = 'https://antiphish-2.onrender.com/api/v1';

const token = localStorage.getItem('AntiPhishXauthToken') || '';

export const textanalysis = async (text:string) => {
  try {
    const data = { 
        text: text
     };
     
    const response = await axios.post(`${API_URL}/text/analyze-text`, data, { withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });
    return { success: true, data: response.data.response.data };
  } catch (error) {
    return handleApiError(error, 'Text Analysis API Error');
  }
};


export const imageanalysis = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await axios.post(`${API_URL}/text/analyze-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`
      },
      withCredentials: true,
    });
    return { success: true, data: response.data.response.data };
  } catch (error) {
    return handleApiError(error, 'Image Analysis API Error');
  } 
};

