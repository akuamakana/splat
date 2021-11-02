import { Table, Tbody, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

interface UsersTableProps {}

const UsersTable: React.FC<UsersTableProps> = ({ children }) => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');

  return (
    <Table variant="simple" size={isLargerThan992 ? 'md' : 'xs'}>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Username</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  );
};

export default UsersTable;
