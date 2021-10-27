import { Box } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Content {}

const Content: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box mx="auto" p="6" w="calc(100% - 260px)" h="calc(100% - 80px)" bgColor="gray.100" display="block" position="fixed" left="260px" top="80px">
        {children}
      </Box>
    </>
  );
};

export default Content;
