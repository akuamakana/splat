import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, chakra, useMediaQuery } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useEffect, useMemo, useState } from 'react';
import { useMe, useUsers } from '@lib/splat-api';
import { useSortBy, useTable } from 'react-table';

import Card from '@components/Card';
import Content from '@layout/Content';
import { NextPage } from 'next';
import SelectField from '@components/SelectField';
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
  const { data, refetch, isSuccess, isLoading } = useUsers();
  const updateRoleMutation = useMutation((values: IRoleInput) => {
    return axios.put(`${constants.API_URL}/user/${values.user ? values.user : '0'}`, values, { withCredentials: true });
  });

  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');

  useEffect(() => {
    if (isSuccess) {
      setTableData(data);
    }
  }, [data]);

  const [tableData, setTableData] = useState<any[]>([]);
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        isNumeric: true,
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Role',
        accessor: 'role.name',
      },
    ],
    []
  );

  // TODO: Global filter
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: tableData }, useSortBy);

  if (isLoading || !tableData) {
    return <div>Loading...</div>;
  }

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
            <Table {...getTableProps()} variant="simple" size={isLargerThan992 ? 'md' : 'xs'}>
              <Thead>
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th {...column.getHeaderProps(column.getSortByToggleProps())} isNumeric={column.isNumeric} style={{ textAlign: 'start', cursor: 'pointer' }}>
                        {column.render('Header')}
                        <chakra.span pl={4}>
                          {column.isSorted ? column.isSortedDesc ? <TriangleDownIcon aria-label="sorted descending" /> : <TriangleUpIcon aria-label="sorted ascending" /> : null}
                        </chakra.span>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <Td style={{ textAlign: 'start' }} {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                          {cell.render('Cell')}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Card>
      )}
    </Content>
  );
};

export default ManageUsers;
