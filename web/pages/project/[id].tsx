import { AddIcon, EditIcon } from '@chakra-ui/icons';

import Card from '@components/Card';
import Content from '@layout/Content';
import { IconButton } from '@chakra-ui/react';
import { Loading } from '@components/Loading';
import { NextPage } from 'next';
import TicketItem from '@components/TicketItem';
import TicketTable from '@components/TicketTable';
import UserItem from '@components/UserItem';
import UsersTable from '@components/UsersTable';
import { useClientRouter } from 'use-client-router';
import { useProject } from '@lib/splat-api';

const Project: NextPage = () => {
  const router = useClientRouter();
  const id = router.query.id as string;
  const { data, isLoading, isSuccess } = useProject(id);

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
          {data && (
            <TicketTable>
              {data.tickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} handleOnClick={() => router.push({ pathname: '/ticket/[id]', query: { id: ticket.id } })} />
              ))}
            </TicketTable>
          )}
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
          {data?.assigned_users && (
            <UsersTable>
              {data.assigned_users.map((user) => (
                <UserItem user={user} key={user.id} />
              ))}
            </UsersTable>
          )}
        </Card>
      </Content>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return <div>Loading</div>;
};

export default Project;
