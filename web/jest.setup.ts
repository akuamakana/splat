// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { setupServer } from 'msw/node';
import { handlers } from './__mocks__/utils';
import { setLogger } from 'react-query';
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

export const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());
beforeEach(async () => {
  jest.spyOn(require('next/router'), 'useRouter');
  useRouter.mockImplementation(() => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }));
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

// silence react-query errors
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
