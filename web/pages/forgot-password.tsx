import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import InputField from '@components/InputField';
import AuthLayout from '@layout/AuthLayout';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';

const ForgotPassword: NextPage = () => {
  return (
    <AuthLayout>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField name="email" label="Email" placeholder="Email" type="email" />
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
