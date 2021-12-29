import { render } from '@testing-library/react';
import { rest } from 'msw';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const handlers = [
  rest.get('*/user/me', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 6,
        username: 'test',
        email: 'test@gmail.com',
        firstName: 'test',
        lastName: 'test2',
        role: 'ADMIN',
        created_at: '2021-11-23T03:21:10.220Z',
        updated_at: '2021-11-23T03:21:10.220Z',
      })
    );
  }),
  rest.get('*/report', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        total: '2',
        open: '2',
        in_progress: '0',
        low: '0',
        medium: '2',
        high: '0',
        bug: '2',
        feature: '0',
        other: '0',
        training: '0',
      })
    );
  }),
  rest.get('*/notifications', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
}
