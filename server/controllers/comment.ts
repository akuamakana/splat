import { Request, Response } from 'express';

import { Comment } from '../entities/Comment';
import { getRepository } from 'typeorm';
import logger from '../lib/logger';

export const createComment = async (request: Request, response: Response) => {
  try {
    const commentRepository = getRepository(Comment);
    const comment = new Comment();

    // const ticketRepository = getRepository(Ticket);

    // const ticket = await ticketRepository.findOne(request.body.ticket);

    // TODO: Notification on new comment
    if (request.body.text.length <= 3) {
      response.status(400).send({ field: 'text', message: 'Not long enough' });
      return;
    }

    comment.text = request.body.text;
    comment.submitter = request.session.userId as any;
    comment.ticket = request.body.ticket;

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
