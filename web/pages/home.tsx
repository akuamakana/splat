import type { NextPage } from 'next';
import Card from '../components/shared/Card';
import Content from '../layout/Content';
import Projects from '../components/Projects';

const Home: NextPage = () => {
  return (
    <Content>
      <Card heading="Projects">
        <Projects />
      </Card>
    </Content>
  );
};

export default Home;
