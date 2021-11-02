import { createTicket, deleteTicket, getTicket, getTickets, updateTicket } from '../controllers/ticket';
import verifyLoggedIn from '../middleware/verifyLoggedIn';
import { Express } from 'express';

export const ticketRoute = (app: Express) => {
  app.post('/ticket', [verifyLoggedIn], createTicket);

  app.put('/ticket/:id', [verifyLoggedIn], updateTicket);

  app.delete('/ticket/:id', [verifyLoggedIn], deleteTicket);

  app.get('/ticket', [verifyLoggedIn], getTickets);

  app.get('/ticket/:id', [verifyLoggedIn], getTicket);
};
