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
        boxShadow={router.route === href ? 'inset 4px 0px 0px 0px #889CC9' : ''}
        _hover={{ backgroundColor: 'brand.600', color: 'white', boxShadow: 'inset 4px 0px 0px 0px orange' }}
        as="strong"
        color={router.route === href ? 'white' : 'gray.400'}
        w="100%"
        py="2"
        px="3"
        bgColor={router.route === href ? 'brand.600' : ''}
      >
        {children}
      </Link>
    </NextLink>
  );
};
