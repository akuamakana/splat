import { FaHome, FaTicketAlt } from 'react-icons/fa';
import { HStack, Heading, Spacer, VStack } from '@chakra-ui/layout';
import React, { useState } from 'react';

import { CgNotes } from 'react-icons/cg';
import { HiUsers } from 'react-icons/hi';
import { Icon } from '@chakra-ui/react';
import { SidebarLink } from '@components/SidebarLink';
import { VscArrowSwap } from 'react-icons/vsc';
import { useMe } from '@lib/splat-api';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { data } = useMe();
  return (
    <VStack transition={'width 0.2s'} textAlign="start" width={isSidebarOpen ? '250px' : '70px'} h="100%" bg="brand.500" boxShadow="sm" color="white" spacing={'0'}>
      <HStack h="61px" w="100%" alignItems={'center'} px="3">
        <Heading as={'a'} display={isSidebarOpen ? 'block' : 'none'} cursor={'pointer'} href="/home">
          Splat
        </Heading>
        {isSidebarOpen && <Spacer />}
        <Icon
          ml={0}
          as={VscArrowSwap}
          cursor={'pointer'}
          alignItems={'center'}
          boxSize={7}
          _hover={{ bg: 'brand.500' }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="toggle sidebar"
          backgroundColor="brand.500"
        />
      </HStack>
      <SidebarLink iconOnly={isSidebarOpen} href="/home" label="Home" icon={FaHome} />
      {data && data?.role?.id > 3 && <SidebarLink iconOnly={isSidebarOpen} href="/manage-users" label="Manage Users" icon={HiUsers} />}
      <SidebarLink iconOnly={isSidebarOpen} href="/projects" label="Projects" icon={CgNotes} />
      <SidebarLink iconOnly={isSidebarOpen} href="/tickets" label="Tickets" icon={FaTicketAlt} />
    </VStack>
  );
};

export default Sidebar;
