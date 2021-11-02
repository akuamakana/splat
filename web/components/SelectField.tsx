import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type SelectFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const SelectField: React.FC<SelectFieldProps> = ({ children, label, ...props }) => {
  const [field, { error }, { setValue }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Select {...field} id={field.name} name={field.name} onChange={(option) => setValue(option.target.value)}>
        {children}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SelectField;
