import { Request, Response, NextFunction, Express } from 'express';
import { login, register, me } from '../controllers/auth';
import validateRegister from '../middleware/validateRegister';

export const authRoute = (app: Express) => {
  app.use((request: Request, response: Response, next: NextFunction) => {
    next();
  });

  app.post('/auth/register', [validateRegister], register);

  app.post('/auth/login', login);

  app.get('/auth/me', me);
};
