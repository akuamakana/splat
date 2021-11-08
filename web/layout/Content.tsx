import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';

import { Loading } from '@components/Loading';
import Navbar from '../components/Navbar';
import React from 'react';
import Sidebar from '../components/Sidebar';
import router from 'next/router';
import { useMe } from '../lib/splat-api';

interface Content {}

const Content: React.FC<{}> = ({ children }) => {
  const { isSuccess, isLoading, isError } = useMe();

  if (isError) {
    router.push('/login');
  }

  return (
    <>
      <Grid templateColumns={{ lg: '250px auto' }} templateRows="fit-content(61px) 1fr" height="100vh" width="100vw">
        {isLoading && (
          <GridItem rowSpan={2} colSpan={2}>
            <Loading />
          </GridItem>
        )}
        {isSuccess && (
          <>
            <GridItem colSpan={1} rowSpan={2} display={{ base: 'none', lg: 'block' }}>
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
