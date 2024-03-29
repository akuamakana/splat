import { Box, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Row, useAsyncDebounce } from 'react-table';

interface GlobalFilterProps {
  preGlobalFilteredRows: Array<Row>;
  globalFilter: string;
  setGlobalFilter: Function;
  role?: string;
}

export const GlobalFilter: React.FC<GlobalFilterProps> = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, role }) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Box mb={2}>
      <Input
        role={role}
        size="sm"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
      />
    </Box>
  );
};
