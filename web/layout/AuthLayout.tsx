import { Box, Heading } from '@chakra-ui/layout';
import Wrapper from '@components/Wrapper';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  additionalLinks?: JSX.Element;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, additionalLinks }) => {
  return (
    <Wrapper variant="small">
      <Box style={{ overflow: 'hidden' }} boxShadow="md" rounded="sm" bg="white">
        <Box py={6} mb={3} bg="brand.500" color="white" textAlign={['center']}>
          <Heading>SPLAT</Heading>
        </Box>
        <Box px={8} py={12}>
          {children}
        </Box>
      </Box>
      {additionalLinks}
    </Wrapper>
  );
};

export default AuthLayout;
