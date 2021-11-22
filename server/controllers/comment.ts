import { Request, Response } from 'express';

import { Comment } from '../entities/Comment';
import { getRepository } from 'typeorm';
import logger from '../lib/logger';
import { Notification } from '../entities/Notification';
import { Ticket } from '../entities/Ticket';

export const createComment = async (request: Request, response: Response) => {
  try {
    const commentRepository = getRepository(Comment);
    const comment = new Comment();

    const ticket = await getRepository(Ticket).findOne(request.body.ticket, { relations: ['assigned_user', 'submitter'] });

    // TODO: Notification on new comment
    if (request.body.text.length <= 3) {
      response.status(400).send({ field: 'text', message: 'Not long enough' });
      return;
    }

    comment.text = request.body.text;
    comment.submitter = request.session.userId as any;
    comment.ticket = request.body.ticket;

    await commentRepository.save(comment);

    const notificationRepository = getRepository(Notification);
    const notification = new Notification();

    notification.message = `Comment added to ticket #${request.body.ticket}`;
    notification.ticket = request.body.ticket;
    notification.user = ticket?.assigned_user;

    await notificationRepository.save(notification);

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
