import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { useMe } from '../lib/splat-api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Loading } from '../components/shared/Loading';

interface Content {}

const Content: React.FC<{}> = ({ children }) => {
  const { isSuccess, isLoading } = useMe();

  return (
    <>
      <Grid templateColumns={{ lg: '260px auto' }} templateRows="fit-content(61px) 1fr" height="100vh" width="100vw">
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
