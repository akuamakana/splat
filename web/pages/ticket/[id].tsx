import { AddIcon, EditIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Grid, GridItem, HStack, Heading, Text } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import { IconButton, Table, Tbody, Td, Th, Thead, Tr, chakra, useMediaQuery } from '@chakra-ui/react';
import { addComment, useTicket } from '@lib/splat-api';
import { useEffect, useMemo, useState } from 'react';
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table';

import Card from '@components/Card';
import Content from '@layout/Content';
import { GlobalFilter } from '@components/GlobalFilter';
import Head from 'next/head';
import { IComment } from '@interfaces/IComment';
import { ICommentInput } from '@interfaces/ICommentInput';
import { ILog } from '@interfaces/ILog';
import InputField from '@components/InputField';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';
import { useClientRouter } from 'use-client-router';
import { useMutation } from 'react-query';

const Ticket: NextPage = () => {
  const router = useClientRouter();
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const { data, isSuccess, refetch } = useTicket(router.query.id as string);
  const addCommentMutation = useMutation((values: ICommentInput) => addComment(values));
  const [historyTableData, setHistoryTableData] = useState<ILog[]>([]);
  const [commentTableData, setCommentTableData] = useState<IComment[]>([]);
  const formatDate = (date: string) => new Date(date).toLocaleString();
  const editTicketButton = <IconButton aria-label="Edit Ticket" icon={<EditIcon />} size="sm" onClick={() => router.push({ pathname: '/ticket/edit/[id]', query: { id: data?.id } })} />;

  useEffect(() => {
    if (isSuccess && data) {
      setHistoryTableData(data.logs);
      setCommentTableData(data.comments);
    }
  }, [data]);

  const historyColumns = useMemo(
    () => [
      {
        Header: 'Property',
        accessor: 'type',
      },
      {
        Header: 'Old Value',
        accessor: 'old',
      },
      { Header: 'New Value', accessor: 'new' },
      {
        Header: 'Date Changed',
        accessor: (date: ILog) => {
          return formatDate(date.created_at);
        },
        sortMethod: (a: string, b: string) => {
          var a1 = new Date(a).getTime();
          var b1 = new Date(b).getTime();
          if (a1 < b1) return 1;
          else if (a1 > b1) return -1;
          else return 0;
        },
      },
    ],
    []
  );

  const commentColumns = useMemo(
    () => [
      {
        Header: 'Comment',
        accessor: 'text',
      },
      {
        Header: 'Submitter',
        accessor: 'submitter.username',
      },
      {
        Header: 'Time',
        accessor: (date: IComment) => {
          return formatDate(date.created_at);
        },
        sortMethod: (a: string, b: string) => {
          var a1 = new Date(a).getTime();
          var b1 = new Date(b).getTime();
          if (a1 < b1) return 1;
          else if (a1 > b1) return -1;
          else return 0;
        },
      },
    ],
    []
  );

  // @ts-expect-error
  const commentsTable = useTable({ columns: commentColumns, data: commentTableData }, useFilters, useGlobalFilter, useSortBy);
  // @ts-expect-error
  const historyTable = useTable({ columns: historyColumns, data: historyTableData }, useFilters, useGlobalFilter, useSortBy);

  if (isSuccess && data) {
    return (
      <Content tabTitle={`${data?.project?.title} - Ticket #${data.id}`}>
        <Grid templateColumns={{ lg: '1fr 1fr' }} templateRows={'475px'} gap={6}>
          <Card heading={`#${data.id} Ticket Detail`} control={editTicketButton}>
            <Grid templateColumns={'auto auto'} gap={6}>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Title
                  </Heading>
                  <Text>{data.title}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Description
                  </Heading>
                  <Text>{data.description}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Assignee
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.assigned_user ? data.assigned_user.username : 'N/A'}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Submitter
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.submitter.username}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Project
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data?.project?.title}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Priority
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.priority}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Status
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.status}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Type
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{data.type}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Created
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{formatDate(data.created_at)}</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Heading size="sm" style={{ textTransform: 'uppercase' }}>
                    Updated
                  </Heading>
                  <Text style={{ textTransform: 'capitalize' }}>{formatDate(data.updated_at)}</Text>
                </Box>
              </GridItem>
            </Grid>
          </Card>
          <Card heading="Comments">
            <Grid templateRows={'max-content 300px max-content'}>
              <GridItem>
                <GlobalFilter preGlobalFilteredRows={commentsTable.preGlobalFilteredRows} globalFilter={commentsTable.state.globalFilter} setGlobalFilter={commentsTable.setGlobalFilter} />
              </GridItem>
              <GridItem>
                <Box maxHeight={'300px'} overflow="auto">
                  <Table {...commentsTable.getTableProps()} variant="simple" size={isLargerThan992 ? 'sm' : 'xs'}>
                    <Thead>
                      {commentsTable.headerGroups.map((headerGroup) => (
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
                    <Tbody {...commentsTable.getTableBodyProps()}>
                      {commentsTable.rows.map((row) => {
                        commentsTable.prepareRow(row);
                        return (
                          <Tr {...row.getRowProps()}>
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
                </Box>
              </GridItem>
              <GridItem>
                <Formik
                  initialValues={{ text: '', ticket: router.query.id ? (router.query.id as string) : data.id }}
                  onSubmit={(values: ICommentInput, { resetForm, setFieldError }) => {
                    addCommentMutation.mutate(values, {
                      onSuccess: () => {
                        refetch();
                        resetForm();
                      },
                      onError: (error: any) => {
                        setFieldError(error.response.data.field, error.response.data.message);
                      },
                    });
                  }}
                >
                  <Form>
                    <HStack mt="4" alignItems="stretch">
                      <InputField size={'sm'} name="text" placeholder="Add comment..." />
                      <IconButton aria-label="Add comment" icon={<AddIcon />} type="submit" size="sm">
                        Add
                      </IconButton>
                    </HStack>
                  </Form>
                </Formik>
              </GridItem>
            </Grid>
          </Card>
          <GridItem colSpan={{ lg: 2 }}>
            <Card heading="Ticket History">
              {<GlobalFilter preGlobalFilteredRows={historyTable.preGlobalFilteredRows} globalFilter={historyTable.state.globalFilter} setGlobalFilter={historyTable.setGlobalFilter} />}
              <Box maxHeight={'320px'} overflow="auto">
                <Table {...historyTable.getTableProps()} variant="simple" size={isLargerThan992 ? 'sm' : 'xs'}>
                  <Thead>
                    {historyTable.headerGroups.map((headerGroup) => (
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
                  <Tbody {...historyTable.getTableBodyProps()}>
                    {historyTable.rows.map((row) => {
                      historyTable.prepareRow(row);
                      return (
                        <Tr {...row.getRowProps()}>
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
              </Box>
            </Card>
          </GridItem>
        </Grid>
      </Content>
    );
  }

  return <Loading />;
};

export default Ticket;
