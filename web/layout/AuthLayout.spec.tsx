import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthLayout from '@layout/AuthLayout';

describe('Wrapper', () => {
  it('should render children', () => {
    render(
      <AuthLayout tabTitle="Jest">
        <div data-testid="child" />
      </AuthLayout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
