import { useCallback } from 'react';
import api from '@/utils/api'; // Your API client
import { Case } from '@/types/cases';

export const useCreateCase = () => {
  const createCase = useCallback(async (caseData: Case) => {
    try {
      const response = await api.post('/cases/', caseData);
      // Handle the response as needed
      return response.data;
    } catch (error) {
      // Handle errors as needed
      throw error;
    }
  }, []);

  return { createCase };
};
