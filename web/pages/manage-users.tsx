import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, chakra, useMediaQuery, HStack, Spacer } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useEffect, useMemo, useState } from 'react';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import { changeRole, useMe, useUsers } from '@lib/splat-api';

import Card from '@components/Card';
import Content from '@layout/Content';
import { GlobalFilter } from '@components/GlobalFilter';
import Loading from '@components/Loading';
import { NextPage } from 'next';
import SelectField from '@components/SelectField';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { IRoleInput } from '@interfaces/IRoleInput';

const ManageUsers: NextPage = () => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const router = useRouter();
  const me = useMe();
  const { data, refetch, isSuccess, isLoading } = useUsers();
  const [tableData, setTableData] = useState<any[]>([]);
  const updateRoleMutation = useMutation((values: IRoleInput) => changeRole(values));

  const handleOnSubmit = (values: IRoleInput, { setFieldError, resetForm }: FormikHelpers<IRoleInput>) => {
    updateRoleMutation.mutate(values, {
      onError: (error: any) => {
        setFieldError(error.response.data.field, error.response.data.message);
      },
      onSuccess: () => {
        refetch();
        resetForm();
      },
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      setTableData(data);
    }
  }, [data]);

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
        accessor: 'role',
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

  if (me.data?.role && me.data.role !== 'ADMIN') {
    router.push('/projects');
  }

  if (isLoading || !tableData) {
    return <Loading />;
  }

  return (
    <Content tabTitle="Manage Users">
      <Card heading="Manage user roles">
        {data && (
          <>
            <Formik initialValues={{ user: '', role: '' }} onSubmit={handleOnSubmit}>
              <Form>
                <Box>
                  <SelectField size="sm" name="user" label="Users">
                    <option>Select user...</option>
                    {data.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.email}
                      </option>
                    ))}
                  </SelectField>
                </Box>
                <Box mt={6}>
                  <SelectField size="sm" name="role" label="Select Role">
                    <option>Select role...</option>
                    <option value="SUBMITTER">Submitter</option>
                    <option value="DEV">Developer</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </SelectField>
                </Box>
                <HStack mt={6}>
                  <Spacer />
                  <Button type="submit" isLoading={updateRoleMutation.isLoading}>
                    Submit
                  </Button>
                </HStack>
              </Form>
            </Formik>
          </>
        )}
      </Card>
      {data && (
        <Card heading="Users">
          <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
          <Box>
            <Table {...getTableProps()} variant="simple" size={isLargerThan992 ? 'sm' : 'xs'}>
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
