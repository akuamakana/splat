import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import Card from '@components/shared/Card';
import InputField from '@components/shared/InputField';
import { Loading } from '@components/shared/Loading';
import Content from '@layout/Content';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useProject } from '@lib/splat-api';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useState } from 'react';
import constants from '@lib/constants';
import { IFieldError } from '@interfaces/IFieldError';
import { IProjectInput } from '@interfaces/IProjectInput';
import { IProject } from '@interfaces/IProject';

const EditProject: NextPage = () => {
  const router = useRouter();
  const { data, isSuccess, isLoading } = useProject(router?.query?.id as string);
  const [error, setError] = useState<IFieldError>({ field: '', message: '' });
  const updateProjectMutation = useMutation(
    (values: IProjectInput) => {
      return axios.put<IProject>(`${constants.API_URL}/project/${router?.query?.id}`, values, { withCredentials: true });
    },
    {
      onError: (_error: any) => {
        setError(_error.response.data);
      },
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
      onError: (_error: any) => {
        setError(_error.response.data);
      },
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
              updateProjectMutation.mutate(values);
              if (error) {
                setFieldError(error.field, error.message);
              }
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
                  <Button mx={2} onClick={() => router.push({ pathname: '/project/[id]', query: { id: router.query.id } })} isLoading={isSubmitting} colorScheme="blue">
                    Cancel
                  </Button>
                  <Button mx={2} type="submit" isLoading={isSubmitting} colorScheme="blue">
                    Submit
                  </Button>
                  <Button mx={2} onClick={() => deleteProjectMutation.mutate()} isLoading={isSubmitting} colorScheme="red">
                    Delete
                  </Button>
                  <Spacer />
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
