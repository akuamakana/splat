import { Box, HStack, Heading, Spacer } from '@chakra-ui/layout';

import React from 'react';

interface CardProps {
  heading: string;
  description?: string;
  control?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, heading, description, control }) => {
  return (
    <Box bgColor="white" boxShadow="sm" rounded="sm" p="6">
      <HStack alignItems="baseline">
        <Box mb={4}>
          <Heading size="md" color="gray.700">
            {heading?.toUpperCase()}
          </Heading>
          {description && (
            <Heading size="sm" color="gray.600" mt={2}>
              {description}
            </Heading>
          )}
        </Box>
        <Spacer />
        <Box>{control}</Box>
      </HStack>
      <Box>{children}</Box>
    </Box>
  );
};

export default Card;
