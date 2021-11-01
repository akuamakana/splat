import { Box, Grid } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
  variant?: 'small' | 'regular';
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = 'regular' }) => {
  return (
    <Grid h="100vh" placeItems="center">
      <Box mx="auto" maxW={variant === 'regular' ? '800px' : '400px'} w="100%">
        {children}
      </Box>
    </Grid>
  );
};

export default Wrapper;
