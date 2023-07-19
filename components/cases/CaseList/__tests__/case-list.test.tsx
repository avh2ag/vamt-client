import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { CasesContext } from '@/contexts/cases/CasesContext';
import CaseList from '@/components/cases/CaseList/CaseList';
import { Case } from '@/types/cases';

// mock cases data
const mockCases: Case[] = [
  { id: '1', name: 'Case 1', year: 2000, type: 'Civil' },
  { id: '2', name: 'Case 2', year: 2001, type: 'Criminal' },
];

describe('CaseList', () => {
  const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <CasesContext.Provider {...providerProps}>{ui}</CasesContext.Provider>,
      renderOptions
    );
  };

  test('renders case name with year', async () => {
    const { getByText } = customRender(<CaseList />, {
      providerProps: { value: { cases: mockCases, loading: false } },
    });

    await waitFor(() => {
      expect(getByText('Case 1 (2000)')).toBeInTheDocument();
      expect(getByText('Case 2 (2001)')).toBeInTheDocument();
    });
  });
});
