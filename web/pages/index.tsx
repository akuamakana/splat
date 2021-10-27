import type { NextPage } from 'next';
import Card from '../components/Card';
import Content from '../components/Content';
import Projects from '../components/Projects';

const Home: NextPage = () => {
  // http://localhost:3001/user/me
  return (
    <Content>
      <Card heading="Projects">
        <Projects />
      </Card>
    </Content>
  );
};

export default Home;
