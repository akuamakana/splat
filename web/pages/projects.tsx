import type { NextPage } from 'next';
import Card from '../components/shared/Card';
import Content from '../layout/Content';
import ProjectsCard from '../components/Projects';
import { IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const Projects: NextPage = () => {
  const router = useRouter();
  return (
    <Content>
      <Card heading="Projects" control={<IconButton aria-label="Create project" icon={<AddIcon />} size="sm" onClick={() => router.push('/project/create')} />}>
        <ProjectsCard />
      </Card>
    </Content>
  );
};

export default Projects;

