import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

interface SidebarLinkProps {
  href: string;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ children, href }) => {
  const router = useRouter();

  return (
    <NextLink href={href}>
      <Link
        style={{ textDecoration: 'none' }}
        _hover={{ backgroundColor: 'gray.500', color: 'white' }}
        as="strong"
        color={router.route === href ? 'white' : 'gray.400'}
        w="100%"
        py="3"
        px="3"
        bgColor={router.route === href ? 'gray.500' : ''}
      >
        {children}
      </Link>
    </NextLink>
  );
};
