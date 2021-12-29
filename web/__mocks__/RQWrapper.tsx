import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
const RQWrapper: React.FC = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

export default RQWrapper;
