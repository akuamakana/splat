import { Grid, GridItem, Spinner } from '@chakra-ui/react';
import router from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { fetchMe } from '../../lib/splat-api';
import { useState } from '@hookstate/core';
import userState from '../../lib/store';

interface Content {}

const Content: React.FC<{}> = ({ children }) => {
  const { data, isSuccess, isLoading } = useQuery('me', fetchMe, { retry: 0, onError: () => router.push('/login') });
  const state = useState(userState);

  if (isSuccess) {
    state.set(data?.user);
  }

  return (
    <>
      <Grid templateColumns="260px auto" templateRows="60px auto" height="100vh" width="100vw">
        {isLoading && (
          <GridItem rowSpan={2} colSpan={2}>
            <Spinner />
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
            <GridItem bgColor="gray.100" p="6" overflowY="scroll">
              {children}
            </GridItem>
          </>
        )}
      </Grid>
    </>
  );
};

export default Content;
