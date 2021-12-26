import { Box, Heading, HStack, Spacer } from '@chakra-ui/layout';
import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import splat from '../public/splat.svg';
import Wrapper from '@components/Wrapper';

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
        <HStack py={6} mb={3} bg="brand.500" color="white" textAlign={['center']} spacing={5}>
          <Spacer />
          <Image src={splat} alt="splat icon" color="white" width={75.625} height={56.125} />
          <Heading>SPLAT</Heading>
          <Spacer />
        </HStack>
        <Box px={8} py={12}>
          {children}
        </Box>
      </Box>
      {additionalLinks}
    </Wrapper>
  );
};

export default AuthLayout;
