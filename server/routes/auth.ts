import { Express } from 'express';
import { login, me, register } from '../controllers/auth';
import verifyLoggedIn from '../middleware/verifyLoggedIn';
import validateRegister from '../middleware/validateRegister';

export const authRoute = (app: Express) => {
  app.post('/auth/register', [validateRegister], register);

  app.post('/auth/login', login);

  app.get('/auth/me', [verifyLoggedIn], me);
};
