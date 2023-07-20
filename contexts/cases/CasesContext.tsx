import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import api from '@/utils/api';
import { Case, CasesContextData } from '@/types/cases';

export const CasesContext = createContext<CasesContextData>({
  cases: [],
  loading: true,
  reload: () => {},
});

export const CasesProvider: React.FC = ({ children }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/cases/');
      setCases(response.data);
    } catch (error) {
      console.error('API request error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  return (
    <CasesContext.Provider value={{ cases, loading, reload: fetchCases }}>
      {children}
    </CasesContext.Provider>
  );
};

export function useCases() {
  const context = useContext(CasesContext);
  if (!context) {
    throw new Error('useCases must be used within a CasesProvider');
  }
  return context;
}
