import { HStack, Icon, Link, Spacer } from '@chakra-ui/react';

import NextLink from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

interface SidebarLinkProps {
  href: string;
  iconOnly?: boolean;
  label: string;
  icon: any;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ href, label, icon, iconOnly }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <NextLink href={href}>
      <Link
        style={{ textDecoration: 'none' }}
        boxShadow={isActive ? 'inset 4px 0px 0px 0px #ffffff' : ''}
        _hover={{ backgroundColor: 'brand.600', color: 'white', boxShadow: isActive ? '' : 'inset 4px 0px 0px 0px orange' }}
        as="strong"
        color={isActive ? 'white' : 'gray.400'}
        w="100%"
        py="2"
        px="3"
        bgColor={isActive ? 'brand.600' : ''}
      >
        <HStack justifyContent={iconOnly ? 'space-between' : 'space-around'}>
          {iconOnly && <span>{label}</span>}
          <Icon as={icon} />
        </HStack>
      </Link>
    </NextLink>
  );
};
