import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import Card from '@components/Card';
import Content from '@layout/Content';
import { IFieldError } from '@interfaces/IFieldError';
import { IProject } from '@interfaces/IProject';
import { IProjectInput } from '@interfaces/IProjectInput';
import InputField from '@components/InputField';
import { NextPage } from 'next';
import axios from 'axios';
import constants from '@lib/constants';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CreateProject: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState<IFieldError>({ field: '', message: '' });
  const createProjectMutation = useMutation((values: IProjectInput) => axios.post<IProject>(`${constants.API_URL}/project`, values, { withCredentials: true }), {
    onError: (_error: any) => {
      setError(_error.response.data);
    },
    onSuccess: (response) => {
      setError({ field: '', message: '' });
      router.push({ pathname: '/project/[id]', query: { id: response.data.id } });
    },
  });

  return (
    <Content>
      <Card heading="New project">
        <Formik
          initialValues={{ title: '', description: '' }}
          onSubmit={async (values, { setFieldError, resetForm }) => {
            createProjectMutation.mutate(values);
            if (error) {
              setFieldError(error.field, error.message);
              return;
            }
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={10}>
                <InputField name="title" label="Title" placeholder="Title..." />
              </Box>
              <Box mt={6}>
                <InputField name="description" label="Description" placeholder="Description..." />
              </Box>
              <Flex mt={12}>
                <Spacer />
                <Button mx={2} onClick={() => router.push({ pathname: '/projects' })} isLoading={isSubmitting} colorScheme="blue">
                  Cancel
                </Button>
                <Button mx={2} type="submit" isLoading={isSubmitting} colorScheme="blue">
                  Submit
                </Button>
                <Spacer />
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Content>
  );
};

export default CreateProject;
