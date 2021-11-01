import { Table, Tbody, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { IUser } from '@interfaces/IUser';
import UserItem from '@components/UserItem';

interface UsersTableProps {
  users: IUser[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
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
      <Tbody>
        {users?.map((user) => (
          <UserItem user={user} key={user.id} />
        ))}
      </Tbody>
    </Table>
  );
};

export default UsersTable;
