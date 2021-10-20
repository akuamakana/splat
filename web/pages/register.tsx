import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { UserResponse } from '../types/User';

const Register: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant="small">
      <Box style={{ overflow: 'hidden' }} boxShadow="md" rounded="sm" bg="white">
        <Box py={6} mb={3} bg="blue.500" color="white" textAlign={['center']}>
          <Heading>SPLAT</Heading>
        </Box>
        <Box px={8} py={12}>
          <Formik
            initialValues={{ username: '', password: '', email: '' }}
            onSubmit={async (values, { setFieldError }) => {
              try {
                await axios.post('http://localhost:3001/auth/register', values);
              } catch (error: any) {
                const _data: UserResponse = error.response.data;
                const { field, message } = _data;
                setFieldError(field, message);
              }
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
                <Flex mt={6}>
                  <Spacer />
                  <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
                    Register
                  </Button>
                  <Spacer />
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <Text mt={6} textAlign={['center']}>
        Already have an account? <a>Sign in</a>
      </Text>
    </Wrapper>
  );
};

export default Register;
