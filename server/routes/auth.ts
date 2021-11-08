import { login, logout, register } from '../controllers/auth';

import { Express } from 'express';
import validateRegister from '../middleware/validateRegister';

export const authRoute = (app: Express) => {
  app.post('/auth/register', [validateRegister], register);

  app.post('/auth/login', login);

  app.post('/auth/logout', logout);
};
