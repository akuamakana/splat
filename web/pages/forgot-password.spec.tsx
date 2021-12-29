import React from 'react';
import { renderWithClient } from '../__mocks__/utils';
import ForgotPassword from './forgot-password';

describe('Wrapper', () => {
  it('should render', async () => {
    const result = renderWithClient(<ForgotPassword />);
    expect(await result.findByRole('email')).toBeInTheDocument();
  });
});
