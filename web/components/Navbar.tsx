import { Avatar, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, HStack, Spacer } from '@chakra-ui/layout';
import { deleteNotifications, logout, useMe, useNotifications } from '../lib/splat-api';

import { Loading } from '@components/Loading';
import React from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const { data, isSuccess, isLoading } = useMe();
  const notifications = useNotifications();
  const deleteNotificationsMutation = useMutation((ids: string[]) => deleteNotifications(ids), {
    onSuccess: () => {
      notifications.refetch();
    },
  });
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
        {notifications.isSuccess && (
          <Menu>
            <MenuButton as={BellIcon} w={9} h={9} style={{ cursor: notifications?.data.length > 0 ? 'pointer' : '' }} color={notifications?.data.length > 0 ? 'orange.300' : 'gray.200'} />
            {notifications.data.length > 0 && (
              <MenuList>
                {notifications.data.map((notification) => (
                  <MenuItem key={notification.id}>
                    <a href={`/ticket/${notification.ticket}`} onClick={() => deleteNotificationsMutation.mutate([notification.id])}>
                      {notification.message}
                    </a>
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </Menu>
        )}
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
