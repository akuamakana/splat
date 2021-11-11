import { Express } from 'express';
import { getTicketCountByStatus } from './../controllers/graph';

export const graphRoute = (app: Express) => {
  app.get('/graph', getTicketCountByStatus);
};
