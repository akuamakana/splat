import { AddIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { IconButton, Table, Tbody, Td, Th, Thead, Tr, chakra, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useSortBy, useTable } from 'react-table';

import Card from '@components/Card';
import Content from '@layout/Content';
import type { NextPage } from 'next';
import { useProjects } from '@lib/splat-api';
import { useRouter } from 'next/router';

const Projects: NextPage = () => {
  const router = useRouter();
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');

  const { data, isSuccess, isLoading } = useProjects();

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
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: tableData }, useSortBy);

  if (isLoading || !tableData) {
    return <div>Loading...</div>;
  }

  return (
    <Content>
      <Card heading="Projects" control={<IconButton aria-label="Create project" icon={<AddIcon />} size="sm" onClick={() => router.push('/project/create')} />}>
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
                <Tr
                  {...row.getRowProps()}
                  style={{ cursor: 'pointer' }}
                  _hover={{
                    background: 'gray.100',
                  }}
                  onClick={() =>
                    router.push({
                      pathname: '/project/[id]',
                      query: {
                        // @ts-expect-error
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
};

export default Projects;
