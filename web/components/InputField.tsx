import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import React, { InputHTMLAttributes } from 'react';

import { useField } from 'formik';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type InputFieldProps = Override<
  InputHTMLAttributes<HTMLInputElement>,
  {
    label?: string;
    name: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
  }
>;

const InputField: React.FC<InputFieldProps> = ({ label, size = 'md', ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <InputGroup size={size} display="inline">
        {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
        <Input rounded={'sm'} {...field} {...props} id={field.name} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};

export default InputField;
