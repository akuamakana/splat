import { Request, Response } from 'express';

import { Comment } from '../entities/Comment';
import { getRepository } from 'typeorm';
import logger from '../lib/logger';
import { Notification } from '../entities/Notification';
import { Ticket } from '../entities/Ticket';
import createNotification from '../lib/createNotification';

export const createComment = async (request: Request, response: Response) => {
  try {
    const commentRepository = getRepository(Comment);
    const comment = new Comment();
    const ticket = await getRepository(Ticket).findOne(request.body.ticket, { relations: ['assigned_user', 'submitter'] });

    if (ticket && request.session.userId) {
      comment.text = request.body.text;
      comment.submitter = request.session.userId as any;
      comment.ticket = ticket;

      await commentRepository.save(comment);
      logger.info(`Comment saved with id: ${comment.id}`);

      const notificationRepository = getRepository(Notification);
      const notifications = createNotification(`Comment added to ticket #${request.body.ticket}`, ticket, request.session.userId);

      await notificationRepository.save(notifications);

      response.status(200).send(true);
    } else {
      response.status(404).send({ field: 'ticket', message: 'No ticket found' });
      return;
    }
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};

export const deleteComment = async (request: Request, response: Response) => {
  try {
    const commentRepository = getRepository(Comment);
    await commentRepository.delete(request.params.id);

    response.status(200).send(true);
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};
