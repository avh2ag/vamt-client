import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CaseForm from '../CaseForm';
import { Case } from '@/types/cases';

describe('CaseForm', () => {
  const renderComponent = async (args) => {
    let rendered;
    await act(() => {
      rendered = render(<CaseForm {...args} />);
    });
    return rendered;
  };
  it('populates form fields with caseToEdit data', async () => {
    const mockFn = jest.fn();
    const caseData = {
      id: 1,
      name: 'Test Case',
      year: 2023,
      type: 'Civil',
    } as Case;

    const { getByLabelText } = await renderComponent({
      onSubmitSuccess: mockFn,
      caseToEdit: caseData,
    });

    expect((getByLabelText(/Case Name/i) as HTMLInputElement).value).toBe(
      caseData.name
    );
    expect((getByLabelText(/Year/i) as HTMLInputElement).value).toBe(
      String(caseData.year)
    );
    expect((getByLabelText(/Type/i) as HTMLInputElement).value).toBe(
      caseData.type
    );
  });

  it('Submit button is disabled when the form is invalid', async () => {
    const mockFn = jest.fn();
    const { getByLabelText, getByText } = await renderComponent({
      onSubmitSuccess: mockFn,
    });
    const formData = {
      name: 'Test Case',
      year: 2023,
      type: 'Civil',
    };
    expect(getByText(/Submit/i)).toBeDisabled();
    await act(() => {
      fireEvent.input(getByLabelText(/Case Name/i), {
        target: { value: formData.name },
      });
      fireEvent.input(getByLabelText(/Year/i), {
        target: { value: formData.year },
      });
      fireEvent.input(getByLabelText(/Type/i), {
        target: { value: formData.type },
      });
    });
    expect(getByText(/Submit/i)).toBeEnabled();
    await userEvent.click(getByText(/Submit/i));
    expect(mockFn).toHaveBeenCalledWith(formData);
  });
});
