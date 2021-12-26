import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import { Link as CLink, Text } from '@chakra-ui/react';
import InputField from '@components/InputField';
import AuthLayout from '@layout/AuthLayout';
import { login } from '@lib/splat-api';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

const Login: NextPage = () => {
  const router = useRouter();
  const loginMutation = useMutation((values: { usernameOrEmail: string; password: string }) => login(values));
  const additionalLinks = (
    <>
      <Text mt={6} textAlign={['center']}>
        New here?{' '}
        <CLink color="brand.600" as="strong" role="register">
          <Link href="/register">Create an account</Link>
        </CLink>
      </Text>
      <Text mt={2} textAlign={['center']}>
        Forgot password?{' '}
        <CLink color="brand.600" as="strong" role="forgot-password">
          <Link href="/forgot-password">Reset password</Link>
        </CLink>
      </Text>
    </>
  );
  return (
    <AuthLayout additionalLinks={additionalLinks} tabTitle="Login">
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values: { usernameOrEmail: string; password: string }, { setFieldError }) => {
          loginMutation.mutate(values, {
            onSuccess: () => {
              router.push('/home');
            },
            onError: (error: any) => {
              setFieldError(error.response.data.field, error.response.data.message);
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField data-testid="form-input" role="usernameOrEmail" name="usernameOrEmail" label="Username or Email" placeholder="Username or Email" />
            </Box>
            <Box mt={6}>
              <InputField data-testid="form-input" role="password" name="password" label="Password" placeholder="Password" type="password" />
            </Box>
            <Flex mt={12} justifyContent={'center'}>
              <Button role="submit" type="submit" isLoading={isSubmitting}>
                Login
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
