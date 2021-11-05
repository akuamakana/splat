import { Alert, AlertIcon } from '@chakra-ui/react';
import { addUserToProject, removeUserFromProject, useProject, useUsers } from '@lib/splat-api';

import Card from '@components/Card';
import Content from '@layout/Content';
import { Grid } from '@chakra-ui/layout';
import { IFieldError } from '@interfaces/IFieldError';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';
import UserItem from '@components/UserItem';
import UsersTable from '@components/UsersTable';
import { useClientRouter } from 'use-client-router';
import { useMutation } from 'react-query';
import { useState } from 'react';

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
