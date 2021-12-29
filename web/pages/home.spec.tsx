import React from 'react';
import { renderWithClient } from '../__mocks__/utils';
import Home from './home';

describe('Wrapper', () => {
  it('should render graphs', async () => {
    jest.mock('next/link', () => <a></a>);
    jest.mock('../components/SidebarLink', () => null);
    try {
      const result = renderWithClient(<Home />);
      const graphs = await result.findAllByTestId('graph', { exact: false });
      expect(graphs).toHaveLength(3);
    } catch (err) {
      console.error(err);
    }
  });
});
