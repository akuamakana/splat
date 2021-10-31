import { Box, Heading, HStack, Spacer } from '@chakra-ui/layout';
import React from 'react';

interface CardProps {
  heading?: string;
  description?: string;
  menu?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, heading, description, menu }) => {
  return (
    <Box bgColor="white" boxShadow="sm" rounded="sm" p="6">
      <HStack>
        <Box>
          <Heading size="md" color="gray.700">
            {heading?.toUpperCase()}
          </Heading>
          <Heading size="sm" color="gray.600" mt={2}>
            {description}
          </Heading>
        </Box>
        <Spacer />
        <Box>{menu}</Box>
      </HStack>
      <Box>{children}</Box>
    </Box>
  );
};

export default Card;
