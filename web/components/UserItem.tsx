import { Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { IUser } from '@interfaces/IUser';

interface UserItemProps {
  user: IUser;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <Tr>
      <Td>{user.id}</Td>
      <Td>{user.username}</Td>
      <Td>{user.role.name}</Td>
    </Tr>
  );
};

export default UserItem;
