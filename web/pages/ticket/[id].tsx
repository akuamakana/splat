import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

import Card from '@components/Card';
import Content from '@layout/Content';
import { EditIcon } from '@chakra-ui/icons';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';
import { useClientRouter } from 'use-client-router';
import { useTicket } from '@lib/splat-api';

const Ticket: NextPage = () => {
  const router = useClientRouter();
  const { data, isSuccess } = useTicket(router.query.id as string);

  const formatDate = (date: string) => new Date(date).toLocaleString();

  const editTicketButton = <IconButton aria-label="Edit Ticket" icon={<EditIcon />} onClick={() => router.push({ pathname: '/ticket/edit/[id]', query: { id: data?.id } })} />;

  if (isSuccess && data) {
    return (
      <Content>
        <Card heading={`#${data.id} Ticket Detail`} control={editTicketButton}>
          <Grid templateColumns={'auto auto'} gap={6} mt={6}>
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
          <Table>
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
        </Card>
      </Content>
    );
  }

  return <Loading />;
};

export default Ticket;
