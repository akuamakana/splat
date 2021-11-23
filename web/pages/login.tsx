import { Box, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { Link as CLink, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { Button } from '@chakra-ui/button';
import { IUserResponse } from '../interfaces/IUserResponse';
import InputField from '@components/InputField';
import Link from 'next/link';
import { NextPage } from 'next';
import React from 'react';
import Wrapper from '@components/Wrapper';
import axios from 'axios';
import router from 'next/router';
import AuthLayout from '@layout/AuthLayout';
import { login } from '@lib/splat-api';
import { useMutation } from 'react-query';
import { IUserInput } from '@interfaces/IUserInput';

const Login: NextPage = () => {
  const loginMutation = useMutation((values: { usernameOrEmail: string; password: string }) => login(values));
  const additionalLinks = (
    <>
      <Text mt={6} textAlign={['center']}>
        New here?{' '}
        <CLink color="brand.600" as="strong">
          <Link href="/register">Create an account</Link>
        </CLink>
      </Text>
      <Text mt={2} textAlign={['center']}>
        Forgot password?{' '}
        <CLink color="brand.600" as="strong">
          <Link href="/forgot-password">Reset password</Link>
        </CLink>
      </Text>
    </>
  );
  return (
    <AuthLayout additionalLinks={additionalLinks}>
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
              <InputField name="usernameOrEmail" label="Username or Email" placeholder="Username or Email" />
            </Box>
            <Box mt={6}>
              <InputField name="password" label="Password" placeholder="Password" type="password" />
            </Box>
            <Flex mt={12}>
              <Spacer />
              <Button type="submit" isLoading={isSubmitting}>
                Login
              </Button>
              <Spacer />
            </Flex>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
