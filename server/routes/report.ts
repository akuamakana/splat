import { Express } from 'express';
import { getTicketCountByStatus } from '../controllers/report';

export const reportRoute = (app: Express) => {
  app.get('/report', getTicketCountByStatus);
};
