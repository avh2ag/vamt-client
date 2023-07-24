import { Case } from '@/types/cases';
import { createDataContext } from '../DataRetrievalContext';

export const [CasesContext, CasesProvider, useCases] = createDataContext<Case>(
  [],
  '/cases/'
);
