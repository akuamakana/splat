import { EditIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import Card from '@components/shared/Card';
import { Loading } from '@components/shared/Loading';
import UsersTable from '@components/shared/UsersTable';
import Content from '@layout/Content';
import { useProject } from '@lib/splat-api';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

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
        <Card
          heading={data ? data?.title : ''}
          description={data?.description}
          control={
            <IconButton aria-label="Create project" icon={<EditIcon />} size="sm" onClick={() => router.push({ pathname: '/project/edit/[id]', query: { id: data ? data.id : router.query.id } })} />
          }
        ></Card>
        <Card heading="Assigned Users">{data?.assigned_users && <UsersTable users={data.assigned_users} />}</Card>
      </Content>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return <div>Loading</div>;
};

export default Project;
