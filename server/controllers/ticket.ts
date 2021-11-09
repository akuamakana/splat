import { Request, Response } from 'express';

import { Notification } from '../entities/Notification';
import { Ticket } from '../entities/Ticket';
import { TicketHistory } from '../entities/TicketHistory';
import { User } from '../entities/User';
import _ from 'lodash';
import { getRepository } from 'typeorm';
import logger from '../lib/logger';

export const createTicket = async (request: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const ticket = new Ticket();

    // TODO: remove this query
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

    if (!ticket) {
      response.status(404).send({ field: 'alert', message: 'Ticket not found' });
    }

    if (ticket) {
      const sortedComments = _.orderBy(ticket.comments, (comment) => comment.id, 'desc');
      const sortedLogs = _.orderBy(ticket.logs, (log) => log.id, 'desc');
      response.status(200).send({ ...ticket, logs: sortedLogs, comments: sortedComments });
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

    if (tickets) {
      response.status(200).send(tickets);
    }
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
    const _ticket = await ticketRepository.save({ ...ticket, ...request.body });

    // Ticket history logging
    const ticketHistoryRepository = getRepository(TicketHistory);
    let logs: TicketHistory[] = [];
    for (const [key, value] of Object.entries(ticket)) {
      if (value !== _ticket[key] && key !== 'updated_at') {
        const log = new TicketHistory();
        log.type = `update ${key}`;
        log.field = key;
        log.old = value;
        log.new = _ticket[key];
        log.ticket = ticket;
        logs.push(log);
      }
    }
    await ticketHistoryRepository.save(logs);

    // Notifications
    // TODO: if req.session.userId === assigned_user | submitter then no notification
    const notificationRepository = getRepository(Notification);
    const notification = new Notification();

    notification.message = `Update on ticket #${ticket.id}`;
    notification.ticket = ticket.id;
    notification.user = ticket.submitter;

    if (ticket.assigned_user) {
      let _notification = notification;
      _notification.user = ticket.assigned_user;
      await notificationRepository.save(_notification);
    }

    await notificationRepository.save(notification);
    response.status(200).send();
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const deleteTicket = async (request: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const ticket = await ticketRepository.delete(request.params.id);

    if (ticket.affected === 0) {
      response.status(404).send({ field: 'alert', message: 'no ticket found' });
      return;
    }

    response.status(200).send({ field: 'alert', message: 'ticket removed' });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};
