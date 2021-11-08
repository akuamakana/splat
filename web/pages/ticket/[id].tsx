import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, HStack, Heading, Text } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { addComment, useTicket } from '@lib/splat-api';

import Card from '@components/Card';
import Content from '@layout/Content';
import { ICommentInput } from '@interfaces/ICommentInput';
import InputField from '@components/InputField';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';
import { useClientRouter } from 'use-client-router';
import { useMutation } from 'react-query';

const Ticket: NextPage = () => {
  const router = useClientRouter();
  const { data, isSuccess, refetch } = useTicket(router.query.id as string);
  const addCommentMutation = useMutation((values: ICommentInput) => addComment(values));

  const formatDate = (date: string) => new Date(date).toLocaleString();

  const editTicketButton = <IconButton aria-label="Edit Ticket" icon={<EditIcon />} onClick={() => router.push({ pathname: '/ticket/edit/[id]', query: { id: data?.id } })} />;

  if (isSuccess && data) {
    return (
      <Content>
        <Grid templateColumns={{ lg: '1fr 1fr' }} templateRows={'475px'} gap={6}>
          <Card heading={`#${data.id} Ticket Detail`} control={editTicketButton}>
            <Grid templateColumns={'auto auto'} gap={6}>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Title
                  </Heading>
                  <Text>{data.title}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Description
                  </Heading>
                  <Text>{data.description}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Assignee
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.assigned_user ? data.assigned_user.username : 'N/A'}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Submitter
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.submitter.username}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Project
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data?.project?.title}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Priority
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.priority}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Status
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.status}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Type
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.type}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Created
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{formatDate(data.created_at)}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Updated
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{formatDate(data.updated_at)}</Text>
                </Box>
              </GridItem>
            </Grid>
          </Card>
          <Card heading="Comments">
            <Formik
              initialValues={{ text: '', ticket: router.query.id ? (router.query.id as string) : data.id }}
              onSubmit={(values: ICommentInput, { resetForm, setFieldError }) => {
                addCommentMutation.mutate(values, {
                  onSuccess: () => {
                    refetch();
                    resetForm();
                  },
                  onError: (error: any) => {
                    setFieldError(error.response.data.field, error.response.data.message);
                  },
                });
              }}
            >
              <Form>
                <HStack mb="4" alignItems="stretch">
                  <InputField name="text" placeholder="Add comment..." size="sm"></InputField>
                  <IconButton aria-label="Add comment" icon={<AddIcon />} type="submit" colorScheme="telegram" size="sm">
                    Add
                  </IconButton>
                </HStack>
              </Form>
            </Formik>
            <Box maxHeight={'320px'} overflow="auto">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Comment</Th>
                    <Th>Submitter</Th>
                    <Th>Time</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.comments.map((comment) => (
                    <Tr key={comment.id}>
                      <Td>{comment.text}</Td>
                      <Td>{comment.submitter.username}</Td>
                      <Td>{formatDate(comment.created_at)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Card>
          <GridItem colSpan={{ lg: 2 }}>
            <Card heading="Ticket History">
              <Box maxHeight={'320px'} overflow="auto">
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Property</Th>
                      <Th>Old Value</Th>
                      <Th>New Value</Th>
                      <Th>Date Changed</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.logs.map((log) => (
                      <Tr key={log.id}>
                        <Td>{log.field}</Td>
                        <Td>{log.old}</Td>
                        <Td>{log.new}</Td>
                        <Td>{formatDate(log.created_at)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Card>
          </GridItem>
        </Grid>
      </Content>
    );
  }

  return <Loading />;
};

export default Ticket;
