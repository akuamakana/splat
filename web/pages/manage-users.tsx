import { Box, Button } from '@chakra-ui/react';
import Card from '@components/shared/Card';
import SelectField from '@components/shared/SelectField';
import UsersTable from '@components/shared/UsersTable';
import { IFieldError } from '@interfaces/IFieldError';
import Content from '@layout/Content';
import constants from '@lib/constants';
import { useUsers } from '@lib/splat-api';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useState } from 'react';
import { useMutation } from 'react-query';

interface IRoleInput {
  user: string;
  role: string;
}

const ManageUsers: NextPage = () => {
  const { data, refetch } = useUsers();
  const [fieldError, setFieldError] = useState<IFieldError>({ field: '', message: '' });
  const updateRoleMutation = useMutation(
    (values: IRoleInput) => {
      return axios.put(`${constants.API_URL}/user/${values.user ? values.user : '0'}`, values, { withCredentials: true });
    },
    {
      onSuccess: () => {
        setFieldError({ field: '', message: '' });
        refetch();
      },
      onError: (_error: any) => {
        setFieldError(_error.response.data);
      },
    }
  );
  return (
    <Content>
      <Card heading="Manage user roles">
        {data && (
          <>
            <Formik
              initialValues={{ user: '', role: '' }}
              onSubmit={(values, { setFieldError, resetForm }) => {
                updateRoleMutation.mutate(values);
                if (fieldError) {
                  setFieldError(fieldError.field, fieldError.message);
                  return;
                }
                resetForm();
              }}
            >
              <Form>
                <Box mt={6}>
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
          <Box mt="6">
            <UsersTable users={data} />
          </Box>
        </Card>
      )}
    </Content>
  );
};

export default ManageUsers;
