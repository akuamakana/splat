import { Flex, HStack, Spacer } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import { deleteTicket, editTicket, useProjects, useTicket } from '@lib/splat-api';

import { Button } from '@chakra-ui/react';
import Card from '@components/Card';
import Content from '@layout/Content';
import { ITicketInput } from '@interfaces/ITicketInput';
import InputField from '@components/InputField';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';
import SelectField from '@components/SelectField';
import { useClientRouter } from 'use-client-router';
import { useMutation } from 'react-query';

const EditTicket: NextPage = () => {
  const router = useClientRouter();
  const projects = useProjects();
  const ticket = useTicket(router?.query?.id as string);
  const editTicketMutation = useMutation((values: ITicketInput) => editTicket(values, router?.query?.id as string));
  const deleteTicketMutation = useMutation((id: string) => deleteTicket(id), {
    onSuccess: () => {
      router.push({ pathname: '/project/[id]', query: { id: ticket?.data?.project?.id } });
    },
  });

  if (ticket.isSuccess) {
    return (
      <Content>
        <Card heading="Edit Ticket">
          <Formik
            initialValues={
              {
                title: ticket.data.title,
                description: ticket.data.description,
                status: ticket.data.status,
                priority: ticket.data.priority,
                type: ticket.data.type,
                project: ticket?.data?.project?.id.toString(),
              } as ITicketInput
            }
            onSubmit={async (values: ITicketInput, { setFieldError, resetForm }) => {
              editTicketMutation.mutate(values, {
                onError: (error: any) => {
                  setFieldError(error.response.data.field, error.response.data.message);
                },
                onSuccess: () => {
                  resetForm();
                  router.back();
                },
              });
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
                  <SelectField name="project" label="Project">
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
                  <Button mx={2} w="150px" onClick={() => deleteTicketMutation.mutate(ticket.data.id)} isLoading={isSubmitting} colorScheme="red">
                    Delete
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

export default EditTicket;
