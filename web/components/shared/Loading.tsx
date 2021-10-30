import React from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <Flex alignItems="center" justifyContent="center" h="100%">
      <Spinner />
    </Flex>
  );
};
