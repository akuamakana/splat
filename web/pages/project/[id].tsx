import { AddIcon, EditIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { IconButton, Table, Tbody, Td, Th, Thead, Tr, chakra, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';
import { useProject, useTickets } from '@lib/splat-api';

import Card from '@components/Card';
import Content from '@layout/Content';
import { GlobalFilter } from '@components/GlobalFilter';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';
import { useClientRouter } from 'use-client-router';

const Project: NextPage = () => {
  const router = useClientRouter();
  const id = router.query.id as string;
  const { data, isSuccess } = useProject(id);
  const tickets = useTickets(router.query.id as string);
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const [userTableData, setUserTableData] = useState<any[]>([]);
  const [ticketTableData, setTicketTableData] = useState<any[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setUserTableData(data.assigned_users);
    }
  }, [data]);

  useEffect(() => {
    if (tickets.isSuccess) {
      setTicketTableData(tickets.data);
    }
  }, [tickets.data]);

  const userColumns = useMemo(
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
  const ticketColumns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        isNumeric: true,
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Priority',
        accessor: 'priority',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Submitter',
        accessor: 'submitter.username',
      },
      {
        Header: 'Project',
        accessor: 'project.title',
      },
    ],
    []
  );
  const ticketTable = useTable({ columns: ticketColumns, data: ticketTableData }, useFilters, useGlobalFilter, useSortBy);
  const assignedUserTable = useTable({ columns: userColumns, data: userTableData }, useFilters, useGlobalFilter, useSortBy);

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
        <Card heading="Tickets" control={<IconButton aria-label="Add ticket" onClick={() => router.push({ pathname: '/ticket/create', query: { id: data?.id } })} icon={<AddIcon />} size="sm" />}>
          <GlobalFilter preGlobalFilteredRows={ticketTable.preGlobalFilteredRows} globalFilter={ticketTable.state.globalFilter} setGlobalFilter={ticketTable.setGlobalFilter} />
          <Table {...ticketTable.getTableProps()} variant="simple" size={isLargerThan992 ? 'sm' : 'xs'}>
            <Thead>
              {ticketTable.headerGroups.map((headerGroup) => (
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
            <Tbody {...ticketTable.getTableBodyProps()}>
              {ticketTable.rows.map((row) => {
                ticketTable.prepareRow(row);
                return (
                  <Tr
                    {...row.getRowProps()}
                    style={{ cursor: 'pointer' }}
                    _hover={{
                      background: 'gray.100',
                    }}
                    onClick={() => router.push({ pathname: '/ticket/[id]', query: { id: row.original.id } })}
                  >
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
        </Card>
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
          <GlobalFilter preGlobalFilteredRows={assignedUserTable.preGlobalFilteredRows} globalFilter={assignedUserTable.state.globalFilter} setGlobalFilter={assignedUserTable.setGlobalFilter} />
          <Table {...assignedUserTable.getTableProps()} variant="simple" size={isLargerThan992 ? 'sm' : 'xs'}>
            <Thead>
              {assignedUserTable.headerGroups.map((headerGroup) => (
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
            <Tbody {...assignedUserTable.getTableBodyProps()}>
              {assignedUserTable.rows.map((row) => {
                assignedUserTable.prepareRow(row);
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
        </Card>
      </Content>
    );
  }

  return <Loading />;
};

export default Project;
