import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../utils/api';
import { Case, CasesContextData } from '../../types/cases';

export const CasesContext = createContext<CasesContextData>({
  cases: [],
  loading: true,
});

export const CasesProvider: React.FC = ({ children }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/cases').then((response) => {
      setCases(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <CasesContext.Provider value={{ cases, loading }}>
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
