import { Request, Response } from 'express';

import { Notification } from '../entities/Notification';
import { getRepository } from 'typeorm';

export const getNotifications = async (request: Request, response: Response) => {
  try {
    const notificationRepository = getRepository(Notification);
    const notifications = await notificationRepository.find({ where: { user: request.session.userId, seen: false } });

    response.status(200).send(notifications);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

// TODO: Delete notification
