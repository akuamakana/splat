import { SearchIcon } from '@chakra-ui/icons';
import { Box, HStack, Spacer } from '@chakra-ui/layout';
import { Avatar, Button, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from '@hookstate/core';
import userState from '../lib/store';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const user = useState(userState);

  return (
    <HStack py="2" px="6" color="gray" bgColor="white" boxShadow="sm" zIndex="sticky">
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search..." size="md" borderRightRadius="0" />
          <Button borderLeftRadius="0" colorScheme="telegram" size="md">
            Search
          </Button>
        </InputGroup>
      </Box>
      <Spacer />
      <Menu>
        <MenuButton px="6">
          <HStack>
            <Avatar size="sm" name={user?.get().email} />
            <Box px="2" textAlign="left">
              <Text fontSize="sm" as="strong">
                {user?.get().email}
              </Text>
              <Text fontSize="sm">{user?.get().role?.name}</Text>
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
          <MenuItem minH="48px">
            <Text fontSize="sm">Logout</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default Navbar;
