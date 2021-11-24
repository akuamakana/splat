import { Button } from '@chakra-ui/button';
import { Box, Flex, HStack, Spacer } from '@chakra-ui/layout';
import { Link as CLink, Text } from '@chakra-ui/react';
import InputField from '@components/InputField';
import { IUserInput } from '@interfaces/IUserInput';
import AuthLayout from '@layout/AuthLayout';
import { register } from '@lib/splat-api';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

const Register: NextPage = () => {
  const registerMutation = useMutation((values: IUserInput) => register(values));

  const additionalLinks = (
    <>
      <Text mt={6} textAlign={['center']}>
        Already have an account?{' '}
        <CLink as="strong" color="brand.600">
          <Link href="/login">
            <a>Login</a>
          </Link>
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
    <AuthLayout additionalLinks={additionalLinks} tabTitle='Register'>
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '', email: '', firstName: '', lastName: '' }}
        onSubmit={async (values: IUserInput, { setFieldError }) => {
          if (values.password !== values.confirmPassword) {
            setFieldError('confirmPassword', 'Passwords do not match');
            return;
          }

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
            <HStack>
              <InputField name="firstName" label="First Name" placeholder="First Name" />
              <InputField name="lastName" label="Last Name" placeholder="Last Name" />
            </HStack>
            <Box mt={6}>
              <InputField name="email" label="Email" placeholder="Email" />
            </Box>
            <Box mt={6}>
              <InputField name="username" label="Username" placeholder="Username" />
            </Box>
            <Box mt={6}>
              <InputField name="password" label="Password" placeholder="Password" type="password" />
            </Box>
            <Box mt={6}>
              <InputField name="confirmPassword" label="Confirm Password" placeholder="Confirm Password" type="password" />
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
