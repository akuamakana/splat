import { EditIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import Card from '@components/Card';
import { Loading } from '@components/Loading';
import UserItem from '@components/UserItem';
import UsersTable from '@components/UsersTable';
import Content from '@layout/Content';
import { useProject } from '@lib/splat-api';
import { NextPage } from 'next';
import { useClientRouter } from 'use-client-router';

const Project: NextPage = () => {
  const router = useClientRouter();
  const id = router.query.id as string;
  const { data, isLoading, isSuccess } = useProject(id);

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
        <Card
          control={
            <IconButton
              aria-label="Create project"
              icon={<EditIcon />}
              size="sm"
              onClick={() => router.push({ pathname: '/project/edit/users/[id]', query: { id: data ? data.id : router.query.id } })}
            />
          }
          heading="Assigned Users"
        >
          {data?.assigned_users && (
            <UsersTable>
              {data.assigned_users.map((user) => (
                <UserItem user={user} key={user.id} />
              ))}
            </UsersTable>
          )}
        </Card>
      </Content>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return <div>Loading</div>;
};

export default Project;
