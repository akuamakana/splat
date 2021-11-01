import Card from '@components/Card';
import ProjectsTable from '@components/ProjectsTable';
import Content from '@layout/Content';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Content>
      <Card heading="Projects" control={<IconButton aria-label="Create project" icon={<AddIcon />} size="sm" onClick={() => router.push('/project/create')} />}>
        <ProjectsTable />
      </Card>
    </Content>
  );
};

export default Home;
