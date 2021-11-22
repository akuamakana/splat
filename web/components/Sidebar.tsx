import { FaHome, FaTicketAlt } from 'react-icons/fa';
import { HStack, Heading, Spacer, VStack } from '@chakra-ui/layout';
import React from 'react';

import { CgNotes } from 'react-icons/cg';
import { HiUsers } from 'react-icons/hi';
import { Icon } from '@chakra-ui/react';
import { SidebarLink } from '@components/SidebarLink';
import { VscArrowSwap } from 'react-icons/vsc';
import { useMe } from '@lib/splat-api';
import { useState } from '@hookstate/core';
import globalState from '@lib/global-state';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const state = useState(globalState);

  const { data } = useMe();
  return (
    <VStack transition={'width 0.2s'} textAlign="start" width={state.get().isSideBarOpen ? '250px' : '70px'} h="100%" bg="brand.500" boxShadow="sm" color="white" spacing={'0'}>
      <HStack h="61px" w="100%" alignItems={'center'} px="3">
        <Heading as={'a'} display={state.get().isSideBarOpen ? 'block' : 'none'} cursor={'pointer'} href="/home">
          Splat
        </Heading>
        {state.get().isSideBarOpen && <Spacer />}
        <Icon
          ml={0}
          as={VscArrowSwap}
          cursor={'pointer'}
          alignItems={'center'}
          boxSize={7}
          _hover={{ bg: 'brand.500' }}
          onClick={() => state.set((p) => ({ isSideBarOpen: !p.isSideBarOpen }))}
          aria-label="toggle sidebar"
          backgroundColor="brand.500"
        />
      </HStack>
      <SidebarLink iconOnly={state.get().isSideBarOpen} href="/home" label="Home" icon={FaHome} />
      {data?.role && data?.role?.id > 3 && <SidebarLink iconOnly={state.get().isSideBarOpen} href="/manage-users" label="Manage Users" icon={HiUsers} />}
      <SidebarLink iconOnly={state.get().isSideBarOpen} href="/projects" label="Projects" icon={CgNotes} />
      <SidebarLink iconOnly={state.get().isSideBarOpen} href="/tickets" label="Tickets" icon={FaTicketAlt} />
    </VStack>
  );
};

export default Sidebar;
