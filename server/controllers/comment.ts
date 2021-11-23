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

    if (request.body.text.length <= 3) {
      response.status(400).send({ field: 'text', message: 'Not long enough' });
      return;
    }
    if (!ticket) {
      response.status(404).send({ field: 'ticket', message: 'No ticket found' });
      return;
    }

    comment.text = request.body.text;
    comment.submitter = request.session.userId as any;
    comment.ticket = ticket;

    await commentRepository.save(comment);
    logger.info(`Comment saved with id: ${comment.id}`);

    const notificationRepository = getRepository(Notification);
    const notifications = createNotification(`Comment added to ticket #${request.body.ticket}`, ticket, request.session.userId);

    console.log('notifications: ', notifications);

    await notificationRepository.save(notifications);

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
