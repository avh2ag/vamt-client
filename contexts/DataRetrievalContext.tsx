import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import api from '@/utils/api';

type DataType<T> = {
  loading: boolean;
  reload: () => void;
  data: T[];
};

// Higher order function that generates context and provider
export function createDataContext<T>(
  defaultData: T[],
  endpoint: string
): [React.Context<DataType<T>>, React.FC, () => DataType<T>] {
  const DataContext = createContext<DataType<T>>({
    data: defaultData,
    loading: true,
    reload: () => {},
  });

  // eslint-disable-next-line react/prop-types
  const DataProvider = ({ children }) => {
    const [data, setData] = useState(defaultData);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
      setLoading(true);
      try {
        const response = await api.get(endpoint);
        setData(response.data);
      } catch (error) {
        console.error('API request error:', error);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    return (
      <DataContext.Provider value={{ data, loading, reload: fetchData }}>
        {children}
      </DataContext.Provider>
    );
  };

  const useData = (): DataType<T> => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error('useData must be used within a DataProvider');
    }
    return context;
  };

  return [DataContext, DataProvider, useData];
}
