import { Td, Tr } from '@chakra-ui/react';
import { IUser } from '@interfaces/IUser';
import React, { MouseEventHandler, useState } from 'react';

interface UserItemProps {
  user: IUser;
  handleOnClick?: MouseEventHandler<HTMLTableRowElement>;
}

const UserItem: React.FC<UserItemProps> = ({ user, handleOnClick }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Tr style={{ cursor: handleOnClick ? 'pointer' : '' }} bgColor={hover && handleOnClick ? 'gray.100' : ''} onClick={handleOnClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Td>{user.id}</Td>
      <Td>{user.username}</Td>
      <Td style={{ textTransform: 'capitalize' }}>{user?.role?.name}</Td>
    </Tr>
  );
};

export default UserItem;
