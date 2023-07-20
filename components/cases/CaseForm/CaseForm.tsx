// AddCaseForm.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Case } from '@/types/cases';

export interface CaseFormProps {
  onSubmitSuccess: (caseData: Case) => void;
  caseToEdit?: Case;
}

const CaseForm: React.FC<CaseFormProps> = ({ onSubmitSuccess, caseToEdit }) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    year: yup
      .number()
      .transform((value, originalValue) => {
        return String(originalValue).trim() === '' ? undefined : value;
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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: caseToEdit,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (caseData) => {
    onSubmitSuccess(caseData);
  };

  const onError = (e) => {
    // @TODO: handle the form error
    console.log(e);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Case Name</Form.Label>
        <Form.Control id="name" {...register('name')} />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="year">Year</Form.Label>
        <Form.Control id="year" type="number" {...register('year')} />
        {errors.year && <p className="text-danger">{errors.year.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="type">Type</Form.Label>
        <Form.Control id="type" as="select" {...register('type')}>
          <option value="" disabled>
            Select...
          </option>
          <option value="Civil">Civil</option>
          <option value="Criminal">Criminal</option>
        </Form.Control>
        {errors.type && <p className="text-danger">{errors.type.message}</p>}
      </Form.Group>

      <Button variant="primary" type="submit" disabled={!isValid}>
        Submit
      </Button>
    </Form>
  );
};

export default CaseForm;
