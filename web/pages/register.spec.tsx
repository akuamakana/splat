import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from './register';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('it renders', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: false,
      },
    },
  });
  const RQWrapper: React.FC = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  beforeEach(() => {
    render(
      <RQWrapper>
        <Register />
      </RQWrapper>
    );
  });

  it('renders the register page', () => {
    const formInputs = screen.getAllByTestId('form-input');
    expect(formInputs).toHaveLength(6);
  });

  it('handles input', async () => {
    const firstNameInput = screen.getByRole('first-name');
    const lastNameInput = screen.getByRole('last-name');
    const usernameInput = screen.getByRole('username');
    const emailInput = screen.getByRole('email');
    const passwordInput = screen.getByRole('password');
    const confirmPasswordInput = screen.getByRole('confirm-password');
    const submitButton = screen.getByRole('submit');

    await waitFor(() => {
      userEvent.type(firstNameInput, 'test');
      userEvent.type(lastNameInput, 'test');
      userEvent.type(usernameInput, 'test');
      userEvent.type(emailInput, 'test@gmail.com');
      userEvent.type(passwordInput, 'test');
      userEvent.type(confirmPasswordInput, 'test');
      userEvent.click(submitButton);
    });
  });
});
