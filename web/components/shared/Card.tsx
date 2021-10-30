import React from 'react';
import { Box, Heading } from '@chakra-ui/layout';

interface CardProps {
  heading: string;
}

const Card: React.FC<CardProps> = ({ children, heading }) => {
  return (
    <Box bgColor="white" boxShadow="sm" rounded="sm" p="6">
      <Heading size="md" color="gray.700" mb="8">
        {heading.toUpperCase()}
      </Heading>
      <Box>{children}</Box>
    </Box>
  );
};

export default Card;
