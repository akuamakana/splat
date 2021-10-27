import React from 'react';
import { Box, Heading } from '@chakra-ui/layout';

interface CardProps {
  heading: string;
}

const Card: React.FC<CardProps> = ({ children, heading }) => {
  return (
    <Box maxH="full" bgColor="white" boxShadow="sm" rounded="sm" p="6">
      <Heading mb="6">{heading}</Heading>
      <Box>{children}</Box>
    </Box>
  );
};

export default Card;
