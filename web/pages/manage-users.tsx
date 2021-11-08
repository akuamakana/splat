import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useMe, useUsers } from '@lib/splat-api';

import Card from '@components/Card';
import Content from '@layout/Content';
import { NextPage } from 'next';
import SelectField from '@components/SelectField';
import UserItem from '@components/UserItem';
import UsersTable from '@components/UsersTable';
import axios from 'axios';
import constants from '@lib/constants';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

interface IRoleInput {
  user: string;
  role: string;
}

const ManageUsers: NextPage = () => {
  const router = useRouter();
  const me = useMe();
  const { data, refetch } = useUsers();
  const updateRoleMutation = useMutation((values: IRoleInput) => {
    return axios.put(`${constants.API_URL}/user/${values.user ? values.user : '0'}`, values, { withCredentials: true });
  });

  if (me.data?.role && me.data.role?.id < 3) {
    router.push('/projects');
  }

  return (
    <Content>
      <Card heading="Manage user roles">
        {data && (
          <>
            <Formik
              initialValues={{ user: '', role: '' }}
              onSubmit={(values, { setFieldError, resetForm }) => {
                updateRoleMutation.mutate(values, {
                  onError: (error: any) => {
                    setFieldError(error.response.data.field, error.response.data.message);
                  },
                  onSuccess: () => {
                    refetch();
                    resetForm();
                  },
                });
              }}
            >
              <Form>
                <Box>
                  <SelectField name="user" label="Users">
                    <option>Select user...</option>
                    {data.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.email}
                      </option>
                    ))}
                  </SelectField>
                </Box>
                <Box mt={6}>
                  <SelectField name="role" label="Select Role">
                    <option>Select role...</option>
                    <option value="1">Submitter</option>
                    <option value="2">Developer</option>
                    <option value="3">Manager</option>
                    <option value="4">Admin</option>
                  </SelectField>
                </Box>
                <Button type="submit" isLoading={updateRoleMutation.isLoading} mt={6} colorScheme={'blue'}>
                  Submit
                </Button>
              </Form>
            </Formik>
          </>
        )}
      </Card>
      {data && (
        <Card heading="Users">
          <Box>
            <UsersTable>
              {data.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </UsersTable>
          </Box>
        </Card>
      )}
    </Content>
  );
};

export default ManageUsers;
