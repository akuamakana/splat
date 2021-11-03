import { Flex, HStack, Spacer } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import { createTicket, useProjects } from '@lib/splat-api';

import { Button } from '@chakra-ui/react';
import Card from '@components/Card';
import Content from '@layout/Content';
import { IFieldError } from '@interfaces/IFieldError';
import { ITicketInput } from '@interfaces/ITicketInput';
import InputField from '@components/InputField';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';
import SelectField from '@components/SelectField';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CreateTicket: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState<IFieldError>({ field: '', message: '' });
  const projects = useProjects();
  const createTicketMutation = useMutation(createTicket, {
    onSuccess: () => {
      router.back();
    },
    onError: (_error: any) => {
      setError(_error.response.data);
    },
  });

  console.log(router);

  if (projects.isSuccess) {
    return (
      <Content>
        <Card heading="New Ticket">
          <Formik
            initialValues={{ title: '', description: '', status: 'open', priority: 'medium', type: 'bugs/errors', projectId: router.query.id ? router.query.id : '' } as ITicketInput}
            onSubmit={async (values: ITicketInput, { setFieldError, resetForm }) => {
              createTicketMutation.mutate(values);
              if (createTicketMutation.error) {
                setFieldError(error.field, error.message);
                return;
              }
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <HStack mt={10} spacing={6}>
                  <InputField name="title" label="Title" placeholder="Title..." />
                  <InputField name="description" label="Description" placeholder="Description..." />
                </HStack>
                <HStack mt={6} spacing={6}>
                  <SelectField name="status" label="Status">
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </SelectField>
                  <SelectField name="priority" label="Priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </SelectField>
                </HStack>
                <HStack mt={6} spacing={6}>
                  <SelectField name="type" label="Type">
                    <option value="bugs/errors">Bugs/Errors</option>
                    <option value="feature requests">Feature Requests</option>
                    <option value="other">Other</option>
                    <option value="training">Training</option>
                  </SelectField>
                  <SelectField name="projectId" label="Project">
                    <option value="">Select a project...</option>
                    {projects?.data?.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </SelectField>
                </HStack>
                <Flex mt={10}>
                  <Spacer />
                  <Button mx={2} w="150px" onClick={() => router.back()} isLoading={isSubmitting} colorScheme="blue">
                    Cancel
                  </Button>
                  <Button mx={2} w="150px" type="submit" isLoading={isSubmitting} colorScheme="blue">
                    Submit
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Card>
      </Content>
    );
  }

  return <Loading />;
};

export default CreateTicket;
