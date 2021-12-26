import { Button } from '@chakra-ui/button';
import { Box, Flex, HStack, Spacer } from '@chakra-ui/layout';
import { Link as CLink, Text } from '@chakra-ui/react';
import InputField from '@components/InputField';
import { IUserInput } from '@interfaces/IUserInput';
import AuthLayout from '@layout/AuthLayout';
import { register } from '@lib/splat-api';
import { Form, Formik, FormikHelpers } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React from 'react';
import { useMutation } from 'react-query';

const Register: NextPage = () => {
  const router = useRouter();
  const registerMutation = useMutation((values: IUserInput) => register(values), {
    onSuccess: () => {
      router.push('/login');
    },
  });

  const additionalLinks = (
    <>
      <Text mt={6} textAlign={['center']}>
        Already have an account?{' '}
        <CLink as="strong" color="brand.600" role="login">
          <Link href="/login">Login</Link>
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

  const handleOnSubmit = (values: IUserInput, { setFieldError }: FormikHelpers<IUserInput>) => {
    if (values.password !== values.confirmPassword) {
      setFieldError('confirmPassword', 'Passwords do not match');
      return;
    }

    registerMutation.mutate(values, {
      onError: (error: any) => {
        setFieldError(error.response.data.field, error.response.data.message);
      },
    });
  };

  return (
    <AuthLayout additionalLinks={additionalLinks} tabTitle="Register">
      <Formik initialValues={{ username: '', password: '', confirmPassword: '', email: '', firstName: '', lastName: '' } as IUserInput} onSubmit={handleOnSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <HStack alignItems={'baseline'}>
              <InputField role="first-name" name="firstName" label="First Name" placeholder="First Name" />
              <InputField role="last-name" name="lastName" label="Last Name" placeholder="Last Name" />
            </HStack>
            <Box mt={6}>
              <InputField role="email" name="email" label="Email" placeholder="Email" />
            </Box>
            <Box mt={6}>
              <InputField role="username" name="username" label="Username" placeholder="Username" />
            </Box>
            <Box mt={6}>
              <InputField role="password" name="password" label="Password" placeholder="Password" type="password" />
            </Box>
            <Box mt={6}>
              <InputField role="confirm-password" name="confirmPassword" label="Confirm Password" placeholder="Confirm Password" type="password" />
            </Box>
            <Flex mt={12}>
              <Spacer />
              <Button type="submit" isLoading={isSubmitting} role="submit">
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
