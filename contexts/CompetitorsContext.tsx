import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import api from '@/utils/api';
import { Competitor, CompetitorsContextData } from '@/types/competitors';

export const CompetitorsContext = createContext<CompetitorsContextData>({
  competitors: [],
  loading: true,
  reload: () => {},
});

export const CompetitorsProvider: React.FC = ({ children }) => {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompetitors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/competitors/');
      setCompetitors(response.data);
    } catch (error) {
      console.error('API request error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompetitors();
  }, [fetchCompetitors]);

  return (
    <CompetitorsContext.Provider
      value={{ competitors, loading, reload: fetchCompetitors }}
    >
      {children}
    </CompetitorsContext.Provider>
  );
};

export function useCompetitors() {
  const context = useContext(CompetitorsContext);
  if (!context) {
    throw new Error('useCompetitors must be used within a CompetitorsProvider');
  }
  return context;
}
