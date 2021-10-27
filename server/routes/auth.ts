import { Express } from 'express';
import { login, register } from '../controllers/auth';
import validateRegister from '../middleware/validateRegister';

export const authRoute = (app: Express) => {
  app.post('/auth/register', [validateRegister], register);

  app.post('/auth/login', login);
};
