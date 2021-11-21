import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import '../styles/globals.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default MyApp;
