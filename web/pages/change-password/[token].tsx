import { Button } from '@chakra-ui/button';
import { Box, Flex, Spacer } from '@chakra-ui/layout';
import InputField from '@components/InputField';
import AuthLayout from '@layout/AuthLayout';
import { changePassword } from '@lib/splat-api';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import router from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

const ForgotPassword: NextPage = () => {
  const changePasswordMutation = useMutation((values: { password: string; token: string }) => changePassword(values));
  return (
    <AuthLayout>
      <Formik
        initialValues={{ password: '', passwordConfirm: '' }}
        onSubmit={async (values, { setFieldError }) => {
          if (values.password !== values.passwordConfirm) {
            setFieldError('passwordConfirm', 'Passwords do not match');
            return;
          }
          changePasswordMutation.mutate(
            { password: values.passwordConfirm, token: router.query.token as string },
            {
              onSuccess: () => {
                router.push('/login');
              },
              onError: (error: any) => {
                setFieldError(error.response.data.field, error.response.data.message);
              },
            }
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="password" label="Password" placeholder="Password" type="password" />
            </Box>
            <Box mt={6}>
              <InputField name="passwordConfirm" label="Verify Password" placeholder="Verify password" type="password" />
            </Box>
            <Flex mt={12}>
              <Spacer />
              <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
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
