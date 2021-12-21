import { Request, Response } from 'express';
import _ from 'lodash';
import { getRepository } from 'typeorm';
import { Ticket } from '../entities/Ticket';
import { User } from '../entities/User';
import createNotification from '../lib/createNotification';
import createTicketLog from '../lib/createTicketLog';
import logger from '../lib/logger';

export const createTicket = async (request: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const ticket = new Ticket();
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.session.userId);

    if (user) {
      ticket.title = request.body.title;
      ticket.description = request.body.description;
      ticket.submitter = user;
      ticket.project = request.body.project;

      await ticketRepository.save(ticket);
      logger.info('Ticket created successfully: ' + ticket.id);
      response.status(200).send(ticket);
    }
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};

export const getTicket = async (request: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const ticket = await ticketRepository.findOne(request.params.id, {
      relations: ['project', 'submitter', 'assigned_user', 'comments', 'comments.submitter', 'logs'],
    });

    if (ticket) {
      const sortedComments = _.orderBy(ticket.comments, (comment) => comment.id, 'desc');
      const sortedLogs = _.orderBy(ticket.logs, (log) => log.id, 'desc');
      response.status(200).send({ ...ticket, logs: sortedLogs, comments: sortedComments });
    } else {
      response.status(404).send({ field: 'alert', message: 'Ticket not found' });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const getTickets = async (request: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const tickets = await ticketRepository.find({
      relations: ['project', 'submitter', 'assigned_user'],
      where: [{ project: request.params.id, status: 'open' }, { status: 'in progress' }],
      order: { status: 'DESC', created_at: 'ASC' },
    });

    response.status(200).send(tickets);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const updateTicket = async (request: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const ticket = await ticketRepository.findOne(request.params.id, { relations: ['submitter', 'assigned_user'] });

    if (!ticket) {
      response.status(404).send({ field: 'alert', message: 'No ticket found' });
      return;
    }
    if (!request.body.assigned_user) {
      response.status(400).send({ field: 'assigned_user', message: 'Assign a user' });
      return;
    }
    const updatedTicket = await ticketRepository.save({ ...ticket, ...request.body });

    // Ticket history logging
    await createTicketLog(ticket, updatedTicket);

    // Notifications
    createNotification(`Update on ticket #${ticket.id}`, ticket, ticket.submitter.id);

    response.status(200).send();
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const deleteTicket = async (request: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const ticket = await ticketRepository.delete(request.params.id);

    if (!ticket.affected) {
      response.status(404).send({ field: 'alert', message: 'no ticket found' });
      return;
    }

    response.status(200).send({ field: 'alert', message: 'ticket removed' });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const getAllTickets = async (request: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const tickets = await ticketRepository.find({
      where: [{ assigned_user: request.session.userId, status: 'open' }, { status: 'in progress' }],
      relations: ['project', 'submitter'],
    });

    response.status(200).send(tickets);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};
