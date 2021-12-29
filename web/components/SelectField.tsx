import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type SelectFieldProps = Override<
  InputHTMLAttributes<HTMLSelectElement>,
  {
    label: string;
    name: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
  }
>;

const SelectField: React.FC<SelectFieldProps> = ({ children, label, size = 'md', ...props }) => {
  const [field, { error }, { setValue }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel fontSize={size} htmlFor={field.name}>
        {label}
      </FormLabel>
      <Select rounded={'sm'} {...field} id={`select-${field.name}`} size={size} name={field.name} onChange={(option) => setValue(option.target.value)}>
        {children}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SelectField;
