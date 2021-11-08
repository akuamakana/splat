import { Express } from 'express';
import { getNotifications } from '../controllers/notification';

export const notificationRoute = (app: Express) => {
  app.get('/notifications', getNotifications);
};
