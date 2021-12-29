import React from 'react';
import { renderWithClient } from '../__mocks__/utils';
import Home from './home';

describe('Wrapper', () => {
  it('should render graphs', async () => {
    const result = renderWithClient(<Home />);
    expect(await result.findAllByTestId('graph', { exact: false })).toHaveLength(3);
  });
});
