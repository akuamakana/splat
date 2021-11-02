import { Grid } from '@chakra-ui/layout';
import Card from '@components/Card';
import { Loading } from '@components/Loading';
import UserItem from '@components/UserItem';
import UsersTable from '@components/UsersTable';
import { IFieldError } from '@interfaces/IFieldError';
import Content from '@layout/Content';
import { addUserToProject, removeUserFromProject, useProject, useUsers } from '@lib/splat-api';
import { NextPage } from 'next';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useClientRouter } from 'use-client-router';

const EditUsersProject: NextPage = () => {
  const router = useClientRouter();
  const [error, setError] = useState<IFieldError | null>(null);
  const [success, setSuccess] = useState<IFieldError | null>(null);
  const currentProject = useProject(router.query.id as string);
  const allUsers = useUsers();
  const addUserMutation = useMutation((uid: string) => addUserToProject(router.query.id as string, uid), {
    onSuccess: (response) => {
      allUsers.refetch();
      currentProject.refetch();
      setSuccess(response);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    },
    onError: (_error: any) => {
      setError(_error.response.data);
      setTimeout(() => {
        setError(null);
      }, 3000);
    },
  });

  const deleteUserMutation = useMutation((uid: string) => removeUserFromProject(router.query.id as string, uid), {
    onSuccess: (response) => {
      allUsers.refetch();
      currentProject.refetch();
      setSuccess(response);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    },
    onError: (_error: any) => {
      setError(_error.response.data);
      setTimeout(() => {
        setError(null);
      }, 3000);
    },
  });

  if (currentProject.data && allUsers.data) {
    return (
      <Content>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error.message}
          </Alert>
        )}
        {success && (
          <Alert status="success">
            <AlertIcon />
            {success.message}
          </Alert>
        )}
        <Grid templateColumns={{ lg: 'auto auto' }} gap={6}>
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
