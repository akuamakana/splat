import { Box, HStack, Heading, Spacer } from '@chakra-ui/layout';

import React from 'react';

interface CardProps {
  heading: string;
  description?: string;
  control?: React.ReactNode;
  id?: string;
}

const Card: React.FC<CardProps> = ({ children, heading, description, control, id }) => {
  return (
    <Box bgColor="white" boxShadow="sm" rounded="sm" p="6" id={id} data-testid={id}>
      <HStack alignItems="baseline">
        <Box mb={description ? 0 : 4}>
          <Heading size="sm" color="gray.700">
            {heading?.toUpperCase()}
          </Heading>
          {description && (
            <Heading size="sm" color="gray.600" mt={2}>
              {description}
            </Heading>
          )}
        </Box>
        <Spacer />
        {control}
      </HStack>
      <Box>{children}</Box>
    </Box>
  );
};

export default Card;
