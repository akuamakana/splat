import { waitFor } from '@testing-library/react';
import React from 'react';
import { renderWithClient } from '../__mocks__/utils';
import Home from './home';

describe('Wrapper', () => {
  it('should render graphs', async () => {
    await waitFor(async () => {
      const result = renderWithClient(<Home />);
      expect(await result.getAllByTestId('graph'));
    });
  });
});
