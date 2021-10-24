import { Express } from 'express';
import { login, me, register } from '../controllers/auth';
import validateLoggedIn from '../middleware/validateLoggedIn';
import validateRegister from '../middleware/validateRegister';

export const authRoute = (app: Express) => {
  app.post('/auth/register', [validateRegister], register);

  app.post('/auth/login', login);

  app.get('/auth/me', [validateLoggedIn], me);
};
