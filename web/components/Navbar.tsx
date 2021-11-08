import { Avatar, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Box, HStack, Spacer } from '@chakra-ui/layout';
import { logout, useMe } from '../lib/splat-api';

import { Loading } from '@components/Loading';
import React from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { useClientRouter } from 'use-client-router';
import { useMutation } from 'react-query';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useClientRouter();
  const { data, isSuccess, isLoading } = useMe();
  const useLogoutMutation = useMutation(logout, {
    onSuccess: () => {
      router.push('/login');
    },
  });

  if (isLoading) {
    <Loading />;
  }

  if (isSuccess) {
    return (
      <HStack py="2" px="6" color="gray" bgColor="white" boxShadow="sm" zIndex="sticky" height={'max-content'}>
        <Box>
          <InputGroup size={'sm'}>
            <InputLeftElement pointerEvents="none" size>
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Search..." />
          </InputGroup>
          {/* Change to display only magnify glass on mobile */}
        </Box>
        <Spacer />
        <Menu>
          <MenuButton>
            <HStack>
              <Avatar size={'sm'} name={data?.email} />
              <Box px="2" textAlign="left" display={{ base: 'none', lg: 'block' }}>
                <Text fontSize="sm" as="strong">
                  {data?.email}
                </Text>
                <Text fontSize="sm">{data?.role?.name}</Text>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList color="black">
            <MenuItem minH="48px">
              <Text fontSize="sm">Notifications</Text>
            </MenuItem>
            <MenuItem minH="48px">
              <Text fontSize="sm">Settings</Text>
            </MenuItem>
            <MenuItem minH="48px" onClick={() => useLogoutMutation.mutate()} color="red">
              <Text fontSize="sm">Logout</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    );
  }

  return <div>Error...</div>;
};

export default Navbar;
