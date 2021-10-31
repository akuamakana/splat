import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { Text, Link as CLink } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import InputField from '../components/shared/InputField';
import Wrapper from '../components/shared/Wrapper';
import { IUserResponse } from '../interfaces/IUserResponse';

const Login: NextPage = () => {
  return (
    <Wrapper variant="small">
      <Box style={{ overflow: 'hidden' }} boxShadow="md" rounded="sm" bg="white">
        <Box py={6} mb={3} bg="blue.500" color="white" textAlign={['center']}>
          <Heading>SPLAT</Heading>
        </Box>
        <Box px={8} py={12}>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setFieldError }) => {
              try {
                const res = await axios.post('http://localhost:3001/auth/login', values, { withCredentials: true });
                if (res.status === 200) {
                  router.push('/projects');
                }
              } catch (error: any) {
                const _data: IUserResponse = error.response.data;
                const { field, message } = _data;
                setFieldError(field, message);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box>
                  <InputField name="username" label="Username" placeholder="username" />
                </Box>
                <Box mt={6}>
                  <InputField name="password" label="Password" placeholder="password" type="password" />
                </Box>
                <Flex mt={12}>
                  <Spacer />
                  <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
                    Login
                  </Button>
                  <Spacer />
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <Text mt={6} textAlign={['center']}>
        New here?{' '}
        <CLink color="blue.600" as="strong">
          <Link href="/register">Create an account</Link>
        </CLink>
      </Text>
    </Wrapper>
  );
};

export default Login;
