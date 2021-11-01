import { Box } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const router = useRouter();
  return (
    <Box textAlign="center" h="100%" p="12" pt="0" bg="gray.700" boxShadow="sm" color="white">
      <Box h="80px"></Box>
      <Link as="strong" fontSize="xl" color={router.route === '/projects' ? 'white' : 'gray.400'}>
        <NextLink href="/projects">PROJECTS</NextLink>
      </Link>
    </Box>
  );
};

export default Sidebar;
