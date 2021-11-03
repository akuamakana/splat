import { Table, Tbody, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

interface TicketTableProps {}

const TicketTable: React.FC<TicketTableProps> = ({ children }) => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');

  return (
    <Table variant="simple" size={isLargerThan992 ? 'md' : 'xs'}>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Title</Th>
          <Th>Status</Th>
          <Th>Priority</Th>
          <Th>Type</Th>
          <Th>Submitter</Th>
          <Th>Project</Th>
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  );
};

export default TicketTable;
