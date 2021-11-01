import { VStack } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import { SidebarLink } from '@components/SidebarLink';
import { useMe } from '@lib/splat-api';
import React from 'react';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { data } = useMe();
  return (
    <VStack textAlign="center" h="100%" bg="gray.700" boxShadow="sm" color="white">
      <Box h="61px"></Box>
      <SidebarLink href="/home">HOME</SidebarLink>
      <SidebarLink href="/projects">PROJECTS</SidebarLink>
      {data && data?.role?.id > 3 && <SidebarLink href="/manage-users">MANAGE USERS</SidebarLink>}
    </VStack>
  );
};

export default Sidebar;
