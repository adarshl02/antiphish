


export const handleApiError = (error, apiName) => {
  
  const errorMsg = error.response?.data?.errors?.detail ||  error.response?.data?.message || error?.message || 'An unexpected error occurred';
  
  return { success: false, message: errorMsg, status: error.response?.status };
};