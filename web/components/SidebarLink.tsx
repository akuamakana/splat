import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface SidebarLinkProps {
  href: string;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ children, href }) => {
  const router = useRouter();

  return (
    <NextLink href={href}>
      <Link as="strong" color={router.route === href ? 'white' : 'gray.400'} w="100%" py="3" bgColor={router.route === href ? 'gray.500' : ''}>
        {children}
      </Link>
    </NextLink>
  );
};
