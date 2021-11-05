import { Request, Response } from 'express';

import { Ticket } from '../entities/Ticket';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
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
    const ticket = await ticketRepository.findOne(request.params.id, { relations: ['project', 'submitter', 'assigned_user'] });

    if (!ticket) {
      response.status(404).send({ field: 'alert', message: 'Ticket not found' });
    }

    if (ticket) {
      response.status(200).send(ticket);
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const getTickets = async (_: Request, response: Response) => {
  try {
    const ticketRepository = getRepository(Ticket);
    const tickets = await ticketRepository.find({ relations: ['project', 'submitter', 'assigned_user'] });

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
    const ticket = await ticketRepository.update(request.params.id, request.body);

    if (ticket.affected && ticket.affected < 1) {
      response.status(404).send({ field: 'alert', message: 'No ticket found' });
      return;
    }
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

    console.log(ticket);
    response.status(200).send({ field: 'alert', message: 'ticket removed' });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};
