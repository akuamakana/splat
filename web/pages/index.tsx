import Card from '@components/Card';
import Content from '@layout/Content';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <Content>
      <Card>
        <Loading />
      </Card>
    </Content>
  );
};

export default Index;
