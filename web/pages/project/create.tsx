import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import Card from '@components/Card';
import Content from '@layout/Content';
import { IProject } from '@interfaces/IProject';
import { IProjectInput } from '@interfaces/IProjectInput';
import InputField from '@components/InputField';
import { NextPage } from 'next';
import axios from 'axios';
import constants from '@lib/constants';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const CreateProject: NextPage = () => {
  const router = useRouter();
  const createProjectMutation = useMutation((values: IProjectInput) => axios.post<IProject>(`${constants.API_URL}/project`, values, { withCredentials: true }));

  return (
    <Content tabTitle='Create Project'>
      <Card heading="New project">
        <Formik
          initialValues={{ title: '', description: '' }}
          onSubmit={async (values, { setFieldError, resetForm }) => {
            createProjectMutation.mutate(values, {
              onError: (error: any) => {
                setFieldError(error.response.data.field, error.response.data.message);
              },
              onSuccess: (response) => {
                router.push({ pathname: '/project/[id]', query: { id: response.data.id } });
                resetForm();
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box>
                <InputField name="title" label="Title" placeholder="Title..." />
              </Box>
              <Box mt={6}>
                <InputField name="description" label="Description" placeholder="Description..." />
              </Box>
              <Flex mt={10}>
                <Spacer />
                <Button mx={2} onClick={() => router.push({ pathname: '/projects' })} isLoading={isSubmitting} colorScheme={'gray'}>
                  Cancel
                </Button>
                <Button mx={2} type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Content>
  );
};

export default CreateProject;
