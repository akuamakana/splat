import { Box } from '@chakra-ui/react';
import React from 'react';
import { SidebarLink } from '@components/SidebarLink';
import { VStack } from '@chakra-ui/layout';
import { useMe } from '@lib/splat-api';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { data } = useMe();
  return (
    <VStack textAlign="start" h="100%" bg="gray.700" boxShadow="sm" color="white">
      <Box h="61px"></Box>
      <SidebarLink href="/home">HOME</SidebarLink>
      <SidebarLink href="/projects">PROJECTS</SidebarLink>
      {data && data?.role?.id > 3 && <SidebarLink href="/manage-users">MANAGE USERS</SidebarLink>}
    </VStack>
  );
};

export default Sidebar;
