import { Box, Button, Input, Table, Tbody, Td, Th, Thead, Tr, chakra, useMediaQuery } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useAsyncDebounce, useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import { useEffect, useMemo, useState } from 'react';
import { useMe, useUsers } from '@lib/splat-api';

import Card from '@components/Card';
import Content from '@layout/Content';
import { Loading } from '@components/Loading';
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
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const router = useRouter();
  const me = useMe();
  const { data, refetch, isSuccess, isLoading } = useUsers();
  const [tableData, setTableData] = useState<any[]>([]);
  const updateRoleMutation = useMutation((values: IRoleInput) => {
    return axios.put(`${constants.API_URL}/user/${values.user ? values.user : '0'}`, values, { withCredentials: true });
  });

  useEffect(() => {
    if (isSuccess) {
      setTableData(data);
    }
  }, [data]);

  const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);

    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
      console.log(value);
    }, 200);

    return (
      <Input
        size="sm"
        autoFocus
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  };

  const defaultColumn = useMemo(
    () => ({
      Filter: GlobalFilter,
    }),
    []
  );

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, preGlobalFilteredRows, setGlobalFilter } = useTable(
    { columns, data: tableData, defaultColumn },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  if (me.data?.role && me.data.role?.id < 3) {
    router.push('/projects');
  }

  if (isLoading || !tableData) {
    return <Loading />;
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
          <Box mb={4}>
            <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
          </Box>
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
