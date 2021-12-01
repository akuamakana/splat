import { FaHome, FaTicketAlt } from 'react-icons/fa/index';
import { HStack, Heading, Spacer, VStack } from '@chakra-ui/layout';
import React from 'react';

import { CgNotes } from 'react-icons/cg/index';
import { HiUsers } from 'react-icons/hi/index';
import { Icon } from '@chakra-ui/react';
import { SidebarLink } from '@components/SidebarLink';
import { VscArrowSwap } from 'react-icons/vsc/index';
import { useMe } from '@lib/splat-api';
import { useState } from '@hookstate/core';
import NextLink from 'next/link';
import globalState from '@lib/global-state';
import Image from 'next/image';
import splat from '../public/splat.svg';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const state = useState(globalState);
  const { data } = useMe();

  return (
    <VStack transition={'width 0.2s'} textAlign="start" width={state.get().isSideBarOpen ? '250px' : '70px'} h="100%" bg="brand.500" boxShadow="sm" color="white" spacing={'0'}>
      <HStack h="61px" w="100%" alignItems={'center'} justifyContent={'center'} px="3">
        {state.get().isSideBarOpen && (
          <>
            <Heading display={state.get().isSideBarOpen ? 'block' : 'none'} cursor={'pointer'}>
              <HStack spacing={2}>
                <Image src={splat} alt="splat icon" color="white" width={75.625 / 2} height={56.125 / 2} />
                <NextLink href="/home">SPLAT</NextLink>
              </HStack>
            </Heading>
            <Spacer />
          </>
        )}
        <Icon
          ml={0}
          as={VscArrowSwap}
          cursor={'pointer'}
          alignItems={'center'}
          boxSize={6}
          _hover={{ bg: 'brand.500' }}
          onClick={() => state.set((p) => ({ isSideBarOpen: !p.isSideBarOpen }))}
          aria-label="toggle sidebar"
          backgroundColor="brand.500"
        />
      </HStack>
      <SidebarLink iconOnly={state.get().isSideBarOpen} href="/home" label="Home" icon={FaHome} />
      {data && data.role === 'ADMIN' && <SidebarLink iconOnly={state.get().isSideBarOpen} href="/manage-users" label="Manage Users" icon={HiUsers} />}
      <SidebarLink iconOnly={state.get().isSideBarOpen} href="/projects" label="Projects" icon={CgNotes} />
      <SidebarLink iconOnly={state.get().isSideBarOpen} href="/tickets" label="Tickets" icon={FaTicketAlt} />
    </VStack>
  );
};

export default Sidebar;
