import dynamic from 'next/dynamic';
import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';

import React from 'react';
import { useRouter } from 'next/router';
import { useMe } from '../lib/splat-api';
import Head from 'next/head';

const Loading = dynamic(() => import('@components/Loading'));
const Navbar = dynamic(() => import('@components/Navbar'));
const Sidebar = dynamic(() => import('@components/Sidebar'));

interface ContentProps {
  children: React.ReactNode;
  tabTitle: string;
}

const Content: React.FC<ContentProps> = ({ children, tabTitle }) => {
  const router = useRouter();
  const { isSuccess, isLoading, isError } = useMe();

  if (isError) {
    router.push('/login');
  }

  return (
    <>
      <Head>
        <title>{tabTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Grid templateColumns={'max-content auto'} templateRows="fit-content(61px) 1fr" height="100vh" width="100vw">
        {isLoading && (
          <GridItem rowSpan={2} colSpan={2}>
            <Loading />
          </GridItem>
        )}
        {isSuccess && (
          <>
            <GridItem colSpan={1} rowSpan={2}>
              <Sidebar />
            </GridItem>
            <GridItem rowSpan={1}>
              <Navbar />
            </GridItem>
            <GridItem bgColor="gray.100" p="6" overflowY="auto">
              <SimpleGrid columns={1} spacing={6}>
                {children}
              </SimpleGrid>
            </GridItem>
          </>
        )}
      </Grid>
    </>
  );
};

export default Content;
