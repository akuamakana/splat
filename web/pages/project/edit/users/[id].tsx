import { Grid } from '@chakra-ui/layout';
import Card from '@components/Card';
import { Loading } from '@components/Loading';
import UserItem from '@components/UserItem';
import UsersTable from '@components/UsersTable';
import Content from '@layout/Content';
import { addUserToProject, removeUserFromProject, useProject, useUsers } from '@lib/splat-api';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

const EditUsersProject: NextPage = () => {
  const router = useRouter();
  const currentProject = useProject(router.query.id as string);
  const allUsers = useUsers();
  const addUserMutation = useMutation((uid: string) => addUserToProject(router.query.id as string, uid), {
    onSuccess: () => {
      allUsers.refetch();
      currentProject.refetch();
    },
  });

  const deleteUserMutation = useMutation((uid: string) => removeUserFromProject(router.query.id as string, uid), {
    onSuccess: () => {
      allUsers.refetch();
      currentProject.refetch();
    },
  });

  if (currentProject.data && allUsers.data) {
    return (
      <Content>
        {/* Add alert for errors */}
        <Grid templateColumns={'auto auto'} gap={6}>
          <Card heading="remove">
            <UsersTable>
              {currentProject.data.assigned_users.map((user) => (
                <UserItem
                  user={user}
                  key={user.id}
                  handleOnClick={() => {
                    deleteUserMutation.mutate(user.id.toString());
                    currentProject.refetch();
                    allUsers.refetch();
                  }}
                />
              ))}
            </UsersTable>
          </Card>
          <Card heading="add">
            <UsersTable>
              {allUsers.data.map((user) => (
                <UserItem
                  user={user}
                  key={user.id}
                  handleOnClick={() => {
                    addUserMutation.mutate(user.id.toString());
                    currentProject.refetch();
                    allUsers.refetch();
                  }}
                />
              ))}
            </UsersTable>
          </Card>
        </Grid>
      </Content>
    );
  }

  return <Loading />;
};

export default EditUsersProject;
