import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <Box textAlign="center" height="100vh" p="12" pt="0" bg="gray.700" width="260px" position="fixed" boxShadow="sm" color="white">
      <Box h="80px"></Box>
      <Text as="strong" fontSize="3xl">
        Filler
      </Text>
    </Box>
  );
};

export default Sidebar;
