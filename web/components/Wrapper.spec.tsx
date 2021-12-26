import React from 'react';
import { render, screen } from '@testing-library/react';
import Wrapper from '@components/Wrapper';

describe('Wrapper', () => {
  it('should render', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <Wrapper>
        <div data-testid="child" />
      </Wrapper>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
