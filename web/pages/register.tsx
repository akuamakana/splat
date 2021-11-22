import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { Text, Link as CLink } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '@components/InputField';
import Wrapper from '@components/Wrapper';
import Link from 'next/link';
import router from 'next/router';
import { NextPage } from 'next';
import { IUserResponse } from '../interfaces/IUserResponse';
import AuthLayout from '@layout/AuthLayout';
import { register } from '@lib/splat-api';
import { useMutation } from 'react-query';
import { IUserInput } from '@interfaces/IUserInput';

const Register: NextPage = () => {
  const registerMutation = useMutation((values: IUserInput) => register(values));

  const additionalLinks = (
    <Text mt={6} textAlign={['center']}>
      Alrady have an account?{' '}
      <CLink as="strong" color="brand.600">
        <Link href="/login">
          <a>Login</a>
        </Link>
      </CLink>
    </Text>
  );

  return (
    <AuthLayout additionalLinks={additionalLinks}>
      <Formik
        initialValues={{ username: '', password: '', email: '' }}
        onSubmit={async (values: IUserInput, { setFieldError }) => {
          registerMutation.mutate(values, {
            onSuccess: () => {
              router.push('/login');
            },
            onError: (error: any) => {
              setFieldError(error.response.data.field, error.response.data.message);
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" label="Email" placeholder="email" />
            <Box mt={6}>
              <InputField name="username" label="Username" placeholder="username" />
            </Box>
            <Box mt={6}>
              <InputField name="password" label="Password" placeholder="password" type="password" />
            </Box>
            <Flex mt={12}>
              <Spacer />
              <Button type="submit" isLoading={isSubmitting}>
                Register
              </Button>
              <Spacer />
            </Flex>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
