import { Express } from 'express';
import { getTicketReport } from '../controllers/report';

export const reportRoute = (app: Express) => {
  app.get('/report', getTicketReport);
};
