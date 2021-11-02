import Card from '@components/Card';
import Content from '@layout/Content';
import { NextPage } from 'next';
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/layout';
import { useTicket } from '@lib/splat-api';
import { useClientRouter } from 'use-client-router';
import { Loading } from '@components/Loading';

const Ticket: NextPage = () => {
  const router = useClientRouter();
  const { data, isSuccess } = useTicket(router.query.id as string);

  if (isSuccess && data) {
    return (
      <Content>
        <Card heading={`#${data.id} Ticket Detail`}>
          <Grid templateColumns={'auto auto'} gap={6} mt={6}>
            <GridItem>
              <Box>
                <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                  Title
                </Heading>
                <Text style={{ textTransform: 'capitalize' }}>{data.title}</Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                  Description
                </Heading>
                <Text style={{ textTransform: 'capitalize' }}>{data.description}</Text>
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
                <Text style={{ textTransform: 'capitalize' }}>{new Date(data.created_at).toLocaleString()}</Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                  Updated
                </Heading>
                <Text style={{ textTransform: 'capitalize' }}>{new Date(data.updated_at).toLocaleString()}</Text>
              </Box>
            </GridItem>
          </Grid>
        </Card>
      </Content>
    );
  }

  return <Loading />;
};

export default Ticket;
