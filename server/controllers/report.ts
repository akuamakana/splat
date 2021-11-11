import { Request, Response } from 'express';

import { Ticket } from '../entities/Ticket';
import { getRepository } from 'typeorm';

export const getTicketCountByStatus = async (request: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const counts = await ticketRepository
      .createQueryBuilder('ticket')
      .select(
        `
        COUNT(*) AS total,
        SUM(case when status = 'open' then 1 else 0 end) AS open,
        SUM(case when status = 'in progress' then 1 else 0 end) AS "in progress",
        SUM(case when priority = 'low' then 1 else 0 end) AS low,
        SUM(case when priority = 'medium' then 1 else 0 end) AS medium,
        SUM(case when priority = 'high' then 1 else 0 end) AS high,
        SUM(case when type = 'bugs/errors' then 1 else 0 end) AS bug,
        SUM(case when type = 'feature requests' then 1 else 0 end) AS feature,
        SUM(case when type = 'other' then 1 else 0 end) AS other,
        SUM(case when type = 'training' then 1 else 0 end) AS training`
      )
      .where(`"assignedUserId" = ${request.session.userId}`)
      .andWhere(`status < 'closed'`)
      .getRawOne();

    response.status(200).send(counts);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};
