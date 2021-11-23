import { BellIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, Spacer } from '@chakra-ui/layout';
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Loading } from '@components/Loading';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import { deleteNotifications, logout, useMe, useNotifications } from '../lib/splat-api';

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

  if (isSuccess && data) {
    return (
      <HStack py="2" px="6" color="gray" bgColor="white" boxShadow="sm" zIndex="sticky" height={'max-content'}>
        <Spacer />
        {notifications.isSuccess && (
          <Menu>
            <MenuButton as={BellIcon} w={9} h={9} style={{ cursor: notifications?.data.length > 0 ? 'pointer' : '' }} color={notifications?.data.length > 0 ? 'orange.300' : 'gray.200'} />
            {notifications.data.length > 0 && (
              <MenuList>
                <MenuItem onClick={() => deleteNotificationsMutation.mutate(notifications.data.map((notification) => notification.id))}>Mark All As Seen</MenuItem>
                {notifications.data.map((notification) => (
                  <MenuItem color={'black'} key={notification.id}>
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
              <Avatar size={'sm'} borderRadius={'sm'} name={data?.firstName} />
              <Box px="2" textAlign="left" display={{ base: 'none', lg: 'block' }}>
                <Heading fontSize="sm" as="strong">
                  {`${data.firstName} ${data.lastName}`}
                </Heading>
                <Text fontSize="sm">{data?.role}</Text>
              </Box>
            </HStack>
          </MenuButton>
          <MenuList color="black">
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
