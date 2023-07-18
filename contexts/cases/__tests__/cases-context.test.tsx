import { render, act } from '@testing-library/react';
import { CasesProvider, CasesContext } from '@/contexts/cases/CasesContext';
import api from '@/utils/api';
import React from 'react';

jest.mock('@/utils/api');

describe('CasesProvider', () => {
  it('fetches cases on mount', async () => {
    const mockCases = [
      { id: '1', name: 'Case 1', year: '2001', type: 'Civil' },
      { id: '2', name: 'Case 2', year: '2002', type: 'Criminal' },
    ];

    // Mock the API call
    api.get = jest.fn().mockResolvedValue({ data: mockCases });

    const TestComponent = () => {
      const context = React.useContext(CasesContext);
      return <div>{context.loading ? 'Loading...' : 'Loaded'}</div>;
    };

    const { container, rerender } = render(
      <CasesProvider>
        <TestComponent />
      </CasesProvider>
    );

    // At first, loading should be true
    expect(container.textContent).toBe('Loading...');

    // After calling our mock API, loading should be false
    await act(async () => {
      // re-rendering forces the useEffect to run
      rerender(
        <CasesProvider>
          <TestComponent />
        </CasesProvider>
      );
    });
    expect(container.textContent).toBe('Loaded');
    expect(api.get).toHaveBeenCalledWith('/cases'); // validate the endpoint used
  });
});
