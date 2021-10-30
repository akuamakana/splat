import type { NextPage } from 'next';
import Card from '../components/shared/Card';
import Content from '../layout/Content';
import ProjectsCard from '../components/Projects';

const Projects: NextPage = () => {
  return (
    <Content>
      <Card heading="Projects">
        <ProjectsCard />
      </Card>
    </Content>
  );
};

export default Projects;
