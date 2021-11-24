import { AddIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { chakra, IconButton, Table, Tbody, Td, Th, Thead, Tr, useMediaQuery } from '@chakra-ui/react';
import Card from '@components/Card';
import { GlobalFilter } from '@components/GlobalFilter';
import { Loading } from '@components/Loading';
import { ITicket } from '@interfaces/ITicket';
import Content from '@layout/Content';
import { useAllTickets } from '@lib/splat-api';
import { NextPage } from 'next';
import router from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';

const Tickets: NextPage = () => {
  const allTickets = useAllTickets();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');

  const createTicketButton = <IconButton aria-label="Add ticket" onClick={() => router.push({ pathname: '/ticket/create' })} icon={<AddIcon />} size="sm" />;

  useEffect(() => {
    if (allTickets.isSuccess) {
      setTickets(allTickets.data);
    }
  }, [allTickets.data]);
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, state, setGlobalFilter } = useTable(
    // @ts-expect-error
    { columns: ticketColumns, data: tickets },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  if (allTickets.isSuccess) {
    return (
      <Content tabTitle="Tickets">
        <Card heading="Tickets" control={createTicketButton}>
          <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
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
                  <Tr
                    {...row.getRowProps()}
                    style={{ cursor: 'pointer' }}
                    _hover={{
                      background: 'gray.100',
                    }}
                    onClick={() =>
                      router.push({
                        pathname: '/ticket/[id]',
                        query: {
                          id: row.original.id,
                        },
                      })
                    }
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
      </Content>
    );
  }

  return (
    <Content tabTitle="Tickets">
      <Loading />
    </Content>
  );
};

export default Tickets;
