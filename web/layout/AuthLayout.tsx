import { Box, Heading } from '@chakra-ui/layout';
import Wrapper from '@components/Wrapper';
import Head from 'next/head';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  additionalLinks?: JSX.Element;
  tabTitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, additionalLinks, tabTitle }) => {
  return (
    <Wrapper variant="small">
      <Head>
        <title>{tabTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
