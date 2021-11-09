import { deleteNotifications, getNotifications } from '../controllers/notification';

import { Express } from 'express';

export const notificationRoute = (app: Express) => {
  app.get('/notifications', getNotifications);

  app.delete('/notifications', deleteNotifications);
};
