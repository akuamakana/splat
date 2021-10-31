import { Table, Tbody, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { IUser } from '../interfaces/IUser';
import UserItem from './shared/UserItem';

interface UsersProps {
  users: IUser[];
}

const Users: React.FC<UsersProps> = ({ users }) => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');

  return (
    <Table variant="simple" size={isLargerThan992 ? 'md' : 'xs'}>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Description</Th>
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

export default Users;
