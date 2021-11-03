import { Td, Tr } from '@chakra-ui/react';
import { ITicket } from '@interfaces/ITicket';
import React, { MouseEventHandler, useState } from 'react';

interface TicketItemProps {
  ticket: ITicket;
  handleOnClick?: MouseEventHandler<HTMLTableRowElement>;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, handleOnClick }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Tr style={{ cursor: handleOnClick ? 'pointer' : '' }} bgColor={hover && handleOnClick ? 'gray.100' : ''} onClick={handleOnClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Td>{ticket.id}</Td>
      <Td style={{ textTransform: 'capitalize' }}>{ticket.title}</Td>
      <Td style={{ textTransform: 'capitalize' }}>{ticket.status}</Td>
      <Td style={{ textTransform: 'capitalize' }}>{ticket.priority}</Td>
      <Td style={{ textTransform: 'capitalize' }}>{ticket.type}</Td>
      <Td style={{ textTransform: 'capitalize' }}>{ticket.submitter.username}</Td>
      <Td style={{ textTransform: 'capitalize' }}>{ticket?.project?.title}</Td>
    </Tr>
  );
};

export default TicketItem;
