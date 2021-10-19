import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/react';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  password: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Register: React.FC<{}> = ({}) => {
  return (
    <Wrapper variant="small">
      <Box style={{ overflow: 'hidden' }} boxShadow="md" rounded="sm" bg="white">
        <Box py={6} mb={3} bg="blue.500" color="white" textAlign={['center']}>
          <Heading>SPLAT</Heading>
        </Box>
        <Box px={8} py={12}>
          <Formik
            validationSchema={RegisterSchema}
            initialValues={{ username: '', password: '', email: '' }}
            onSubmit={async (values) => {
              console.log(values);
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
