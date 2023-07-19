// AddCaseForm.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Case } from '@/types/cases';

export interface CaseFormProps {
  onSubmitSuccess: (caseData: Case) => void;
}

const CaseForm: React.FC<CaseFormProps> = ({ onSubmitSuccess }) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    year: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue.trim() === '' ? undefined : value;
      })
      .required('Year is a required field')
      .test(
        'len',
        'Must be exactly 4 characters',
        (val) => val && String(val).length === 4
      ),
    type: yup
      .string()
      .oneOf(['Civil', 'Criminal'], 'Type must be either Civil or Criminal')
      .required('Type is a required field'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (caseData) => {
    onSubmitSuccess(caseData);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Case Name</Form.Label>
        <Form.Control {...register('name')} />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Year</Form.Label>
        <Form.Control type="number" {...register('year')} />
        {errors.year && <p className="text-danger">{errors.year.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Control as="select" {...register('type')}>
          <option value="" disabled>
            Select...
          </option>
          <option value="Civil">Civil</option>
          <option value="Criminal">Criminal</option>
        </Form.Control>
        {errors.type && <p className="text-danger">{errors.type.message}</p>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CaseForm;
