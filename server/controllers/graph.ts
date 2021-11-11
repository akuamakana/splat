import { Request, Response } from 'express';

import { Ticket } from '../entities/Ticket';
import { getRepository } from 'typeorm';

export const getTicketCountByStatus = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(Ticket);
    const user = await userRepository
      .createQueryBuilder('ticket')
      .select(`status, COUNT(status) AS sum`)
      .where(`"assignedUserId" = ${request.session.userId}`)
      .andWhere(`status < 'closed'`)
      .groupBy('status, priority')
      // .addGroupBy('priority')
      .getRawMany();

    response.status(200).send(user);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const getTicketCountByPriority = async (request: Request, response: Response) => {};
