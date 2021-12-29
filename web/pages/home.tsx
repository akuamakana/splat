import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SimpleGrid, VStack } from '@chakra-ui/react';

import Card from '@components/Card';
import Content from '@layout/Content';
import Loading from '@components/Loading';
import { NextPage } from 'next';
import { useTicketReport } from '@lib/splat-api';

const Home: NextPage = () => {
  const { data, isSuccess, isLoading } = useTicketReport();

  const statusData = [
    {
      name: 'Open',
      Count: data?.open,
    },
    {
      name: 'In Progress',
      Count: data?.in_progress,
    },
  ];

  const priorityData = [
    {
      name: 'Low',
      Count: data?.low,
    },
    {
      name: 'Medium',
      Count: data?.medium,
    },
    {
      name: 'High',
      Count: data?.high,
    },
  ];

  const typeData = [
    {
      name: 'Bugs/Errors',
      Count: data?.bug,
    },
    {
      name: 'Feature Requests',
      Count: data?.feature,
    },
    {
      name: 'Other',
      Count: data?.other,
    },
    {
      name: 'Training',
      Count: data?.training,
    },
  ];

  if (isSuccess) {
    return (
      <Content tabTitle="Home">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <Card heading="Tickets by Status" id="status-graph">
            <VStack justifyContent="center" alignItems="center" textAlign="center">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart margin={{ right: 50 }} data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar barSize={120} dataKey="Count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </VStack>
          </Card>
          <Card heading="Tickets by Priority" id="priority-graph">
            <VStack justifyContent="center" alignItems="center" textAlign="center">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart margin={{ right: 50 }} data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar barSize={120} dataKey="Count" fill="#1291a9" />
                </BarChart>
              </ResponsiveContainer>
            </VStack>
          </Card>
          <Card heading="Tickets by Type" id="type-graph">
            <VStack justifyContent="center" alignItems="center" textAlign="center">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart margin={{ right: 50 }} data={typeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar barSize={120} dataKey="Count" fill="#FF6666" />
                </BarChart>
              </ResponsiveContainer>
            </VStack>
          </Card>
        </SimpleGrid>
      </Content>
    );
  }

  if (isLoading) {
    return (
      <Content tabTitle="Home">
        <Loading />
      </Content>
    );
  }

  return (
    <Content tabTitle="Home">
      <Loading />
    </Content>
  );
};

export default Home;
