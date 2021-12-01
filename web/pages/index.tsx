import Card from '@components/Card';
import Content from '@layout/Content';
import Loading from '@components/Loading';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <Content tabTitle="Index">
      <Card heading="index">
        <Loading />
      </Card>
    </Content>
  );
};

export default Index;
