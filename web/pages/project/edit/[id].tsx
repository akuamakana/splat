import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import Card from '@components/Card';
import Content from '@layout/Content';
import { IProject } from '@interfaces/IProject';
import { IProjectInput } from '@interfaces/IProjectInput';
import InputField from '@components/InputField';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';
import axios from 'axios';
import constants from '@lib/constants';
import { useClientRouter } from 'use-client-router';
import { useMutation } from 'react-query';
import { useProject } from '@lib/splat-api';

const EditProject: NextPage = () => {
  const router = useClientRouter();
  const { data, isSuccess, isLoading } = useProject(router?.query?.id as string);
  const updateProjectMutation = useMutation(
    (values: IProjectInput) => {
      return axios.put<IProject>(`${constants.API_URL}/project/${router?.query?.id}`, values, { withCredentials: true });
    },
    {
      onSuccess: () => {
        router.push({ pathname: '/project/[id]', query: { id: router.query.id } });
      },
    }
  );

  const deleteProjectMutation = useMutation(
    () => {
      return axios.delete(`${constants.API_URL}/project/${router?.query?.id}`, { withCredentials: true });
    },
    {
      onSuccess: () => {
        router.push({ pathname: '/projects' });
      },
    }
  );

  return (
    <Content>
      {isSuccess && (
        <Card heading={data ? data.title : ''} description="Edit project">
          <Formik
            initialValues={{ title: data ? data.title : '', description: data ? data.description : '' }}
            onSubmit={async (values, { setFieldError }) => {
              updateProjectMutation.mutate(values, {
                onError: (error: any) => {
                  setFieldError(error.response.data.field, error.response.data.message);
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
                <Flex mt={12}>
                  <Spacer />
                  <Button mx={2} onClick={() => deleteProjectMutation.mutate()} isLoading={isSubmitting} colorScheme="red">
                    Delete
                  </Button>
                  <Button mx={2} onClick={() => router.push({ pathname: '/project/[id]', query: { id: router.query.id } })} isLoading={isSubmitting} colorScheme="gray">
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
      )}
      {isLoading && <Loading />}
    </Content>
  );
};

export default EditProject;
