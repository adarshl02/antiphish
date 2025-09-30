import axios from 'axios';

const API_URL = 'https://antiphish-2.onrender.com/api/v1';


export const googleSignup = async (userInfo: { name: string; email: string; avatar: string }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/google-signup`, userInfo, { withCredentials: true });
        
        return { success: true, data: response?.data?.response?.token || null };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message || 'An unexpected error occurred', status: error.response?.status };
    }
};