import { Box, Button, Flex, Link as CLink, Spacer, Text, useToast } from '@chakra-ui/react';
import InputField from '@components/InputField';
import AuthLayout from '@layout/AuthLayout';
import { forgotPassword } from '@lib/splat-api';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { useMutation } from 'react-query';

const ForgotPassword: NextPage = () => {
  const forgotPasswordMutation = useMutation((values: { email: string }) => forgotPassword(values));
  const toast = useToast();

  const additionalLinks = (
    <Text mt={6} textAlign={['center']}>
      Already have an account?{' '}
      <CLink as="strong" color="blue.600">
        <Link href="/login">
          <a>Login</a>
        </Link>
      </CLink>
    </Text>
  );

  return (
    <AuthLayout additionalLinks={additionalLinks}>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          forgotPasswordMutation.mutate(values, {
            onSuccess: (data) => {
              toast({
                variant: 'subtle',
                position: 'top',
                title: data.message,
              });
            },
          });
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <Box>
              <InputField name="email" label="Email" placeholder="Email" type="email" />
            </Box>
            <Flex mt={12}>
              <Spacer />
              <Button type="submit" disabled={!values.email.includes('@')} isLoading={isSubmitting} colorScheme="blue">
                Submit
              </Button>
              <Spacer />
            </Flex>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPassword;
