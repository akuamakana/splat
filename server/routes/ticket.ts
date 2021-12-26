import { createTicket, deleteTicket, getAllTickets, getTicket, getTickets, updateTicket } from '../controllers/ticket';

import { Express } from 'express';
import validateTicket from '../middleware/validateTicket';
import verifyLoggedIn from '../middleware/verifyLoggedIn';

export const ticketRoute = (app: Express) => {
  app.post('/ticket', [verifyLoggedIn, validateTicket], createTicket);

  app.patch('/ticket/:id', [verifyLoggedIn, validateTicket], updateTicket);

  app.delete('/ticket/:id', [verifyLoggedIn], deleteTicket);

  app.get('/tickets/:id', [verifyLoggedIn], getTickets);

  app.get('/ticket/:id', [verifyLoggedIn], getTicket);

  app.get('/tickets', [verifyLoggedIn], getAllTickets);
};
