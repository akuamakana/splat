import { Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Card from '@components/shared/Card';
import { Loading } from '@components/shared/Loading';
import Users from '@components/Users';
import Content from '@layout/Content';
import { useProject } from '@lib/splat-api';

const Project: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, isLoading, isSuccess } = useProject(id);

  // TODO:
  // add settings menu to update
  // option to delete
  // add role title to separate user column

  if (isSuccess) {
    return (
      <Content>
        <Card heading={data?.title} description={data?.description} control={<Button onClick={() => router.push({ pathname: '/project/edit/[id]', query: { id } })}>Edit</Button>}></Card>
        <Card heading="Assigned Users">{data?.assigned_users && <Users users={data.assigned_users} />}</Card>
      </Content>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return <div>Loading</div>;
};

export default Project;
