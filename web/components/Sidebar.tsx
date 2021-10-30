import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <Box textAlign="center" h="100%" p="12" pt="0" bg="gray.700" boxShadow="sm" color="white">
      <Box h="80px"></Box>
      <Text as="strong" fontSize="xl" color="gray.400">
        FILLER
      </Text>
    </Box>
  );
};

export default Sidebar;
