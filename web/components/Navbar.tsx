import { SearchIcon } from '@chakra-ui/icons';
import { Box, HStack, Spacer } from '@chakra-ui/layout';
import { Avatar, Button, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const res = await axios.get('http://localhost:3001/user/me', { withCredentials: true });
        if (res.status >= 200 && res.status < 300) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && user) {
    return (
      <HStack w="calc(100% - 260px)" py="4" px="6" color="gray" bgColor="white" position="fixed" top="0" left="260px" boxShadow="sm" zIndex="sticky">
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
              <Avatar size="md" name={user?.email} />
              <Box px="2" textAlign="left">
                <Text fontSize="md" as="strong">
                  {user?.email}
                </Text>
                <Text fontSize="md">{user?.role?.name}</Text>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList color="black">
            <MenuItem minH="48px">
              <Text fontSize="md">Notifications</Text>
            </MenuItem>
            <MenuItem minH="48px">
              <Text fontSize="md">Settings</Text>
            </MenuItem>
            <MenuItem minH="48px">
              <Text fontSize="md">Logout</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    );
  }
};

export default Navbar;
