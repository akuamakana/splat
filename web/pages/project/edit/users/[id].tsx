import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Grid } from '@chakra-ui/layout';
import { chakra, Table, Tbody, Td, Th, Thead, Tr, useMediaQuery, useToast } from '@chakra-ui/react';
import Card from '@components/Card';
import { GlobalFilter } from '@components/GlobalFilter';
import { Loading } from '@components/Loading';
import { IUser } from '@interfaces/IUser';
import Content from '@layout/Content';
import { addUserToProject, removeUserFromProject, useProject, useUsers } from '@lib/splat-api';
import { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import { useClientRouter } from 'use-client-router';

const EditUsersProject: NextPage = () => {
  const router = useClientRouter();
  const [currentUsers, setCurrentUsers] = useState<IUser[]>([]);
  const toast = useToast();
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const currentProject = useProject(router.query.id as string);
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const _allUsers = useUsers();
  const addUserMutation = useMutation((uid: string) => addUserToProject(router.query.id as string, uid), {
    onSuccess: (response) => {
      _allUsers.refetch();
      currentProject.refetch();
      toast({
        variant: 'subtle',
        title: 'Success',
        description: response.message,
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'subtle',
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    },
  });

  const deleteUserMutation = useMutation((uid: string) => removeUserFromProject(router.query.id as string, uid), {
    onSuccess: (response) => {
      _allUsers.refetch();
      currentProject.refetch();
      toast({
        variant: 'subtle',
        title: 'Success',
        description: response.message,
        status: 'success',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'subtle',
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
        position: 'top',
      });
    },
  });

  useEffect(() => {
    if (currentProject.isSuccess) {
      setCurrentUsers(currentProject.data.assigned_users);
    }
  }, [_allUsers.data, currentProject.data]);

  useEffect(() => {
    if (_allUsers.isSuccess && currentProject.isSuccess) {
      const allIds = _allUsers.data.map((user) => user.id);
      const currentIds = currentProject.data.assigned_users.map((user) => user.id);
      const missingIds = allIds.filter((id) => !currentIds.includes(id));
      const remainingUsers = _allUsers.data.filter((user) => missingIds.includes(user.id));
      setAllUsers(remainingUsers);
    }
  }, [_allUsers.data, currentProject.data]);

  const userColumns = useMemo(
    () => [
      {
        Header: 'id',
        accessor: 'id',
        isNumeric: true,
      },
      {
        Header: 'Name',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
    ],
    []
  );

  const initialState = useMemo(
    () => ({
      sortBy: [
        {
          id: 'id',
          desc: false,
        },
      ],
    }),
    []
  );

  // @ts-expect-error
  const currentUsersTable = useTable({ columns: userColumns, data: currentUsers, initialState }, useFilters, useGlobalFilter, useSortBy);
  // @ts-expect-error
  const allUsersTable = useTable({ columns: userColumns, data: allUsers, initialState }, useFilters, useGlobalFilter, useSortBy);

  if (currentProject.data && _allUsers.data) {
    return (
      <Content>
        <Grid templateColumns={{ lg: 'auto auto' }} gap={6}>
          <Card heading="remove">
            <GlobalFilter globalFilter={currentUsersTable.state.globalFilter} preGlobalFilteredRows={currentUsersTable.preGlobalFilteredRows} setGlobalFilter={currentUsersTable.setGlobalFilter} />
            <Table {...currentUsersTable.getTableProps()} variant="simple" size={isLargerThan992 ? 'sm' : 'xs'}>
              <Thead>
                {currentUsersTable.headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ textAlign: 'start', cursor: 'pointer' }}>
                        {column.render('Header')}
                        <chakra.span pl={4}>
                          {column.isSorted ? column.isSortedDesc ? <TriangleDownIcon aria-label="sorted descending" /> : <TriangleUpIcon aria-label="sorted ascending" /> : null}
                        </chakra.span>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...currentUsersTable.getTableBodyProps()}>
                {currentUsersTable.rows.map((row) => {
                  currentUsersTable.prepareRow(row);
                  return (
                    <Tr
                      {...row.getRowProps()}
                      style={{ cursor: 'pointer' }}
                      _hover={{
                        background: 'gray.100',
                      }}
                      onClick={() => deleteUserMutation.mutate(row.original.id.toString())}
                    >
                      {row.cells.map((cell) => (
                        <Td style={{ textAlign: 'start' }} {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Card>
          <Card heading="add">
            <GlobalFilter globalFilter={allUsersTable.state.globalFilter} preGlobalFilteredRows={allUsersTable.preGlobalFilteredRows} setGlobalFilter={allUsersTable.setGlobalFilter} />
            <Table {...allUsersTable.getTableProps()} variant="simple" size={isLargerThan992 ? 'sm' : 'xs'}>
              <Thead>
                {allUsersTable.headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ textAlign: 'start', cursor: 'pointer' }}>
                        {column.render('Header')}
                        <chakra.span pl={4}>
                          {column.isSorted ? column.isSortedDesc ? <TriangleDownIcon aria-label="sorted descending" /> : <TriangleUpIcon aria-label="sorted ascending" /> : null}
                        </chakra.span>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...allUsersTable.getTableBodyProps()}>
                {allUsersTable.rows.map((row) => {
                  allUsersTable.prepareRow(row);
                  return (
                    <Tr
                      {...row.getRowProps()}
                      style={{ cursor: 'pointer' }}
                      _hover={{
                        background: 'gray.100',
                      }}
                      onClick={() => addUserMutation.mutate(row.original.id.toString())}
                    >
                      {row.cells.map((cell) => (
                        <Td style={{ textAlign: 'start' }} {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Card>
        </Grid>
      </Content>
    );
  }

  return <Loading />;
};

export default EditUsersProject;
