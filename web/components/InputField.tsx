import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import React, { InputHTMLAttributes } from 'react';

import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  size?: string;
};

const InputField: React.FC<InputFieldProps> = ({ label, size = 'md', ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <InputGroup size={size} display="inline">
        {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
        <Input {...field} {...props} id={field.name} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};

export default InputField;
