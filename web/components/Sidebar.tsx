import { Box } from '@chakra-ui/react';
import React from 'react';
import { SidebarLink } from '@components/SidebarLink';
import { VStack } from '@chakra-ui/layout';
import { useMe } from '@lib/splat-api';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { data } = useMe();
  return (
    <VStack textAlign="start" h="100%" bg="brand.500" boxShadow="sm" color="white" spacing={'0'}>
      <Box h="61px"></Box>
      <SidebarLink href="/home">Home</SidebarLink>
      {data && data?.role?.id > 3 && <SidebarLink href="/manage-users">Manage Users</SidebarLink>}
      <SidebarLink href="/projects">Projects</SidebarLink>
      <SidebarLink href="/tickets">Tickets</SidebarLink>
    </VStack>
  );
};

export default Sidebar;
