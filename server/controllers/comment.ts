import { Request, Response } from 'express';

import { Comment } from '../entities/Comment';
import { Ticket } from '../entities/Ticket';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import logger from '../lib/logger';

export const createComment = async (request: Request, response: Response) => {
  try {
    const commentRepository = getRepository(Comment);
    const comment = new Comment();

    const userRepository = getRepository(User);
    const ticketRepository = getRepository(Ticket);

    const submitter = await userRepository.findOne(request.session.userId);
    const ticket = await ticketRepository.findOne(request.body.ticket);
    comment.text = request.body.text;

    if (submitter && ticket) {
      comment.submitter = submitter;
      comment.ticket = ticket;
    }

    await commentRepository.save(comment);
    logger.info(`Comment saved with id: ${comment.id}`);
    response.status(200).send(comment);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const deleteComment = async (request: Request, response: Response) => {
  try {
    const commentRepository = getRepository(Comment);
    await commentRepository.delete(request.params.id);

    response.status(200).send(true);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};
