import { forgotPassword, changePassword } from './../controllers/auth';
import { login, logout, register } from '../controllers/auth';

import { Express } from 'express';
import validateRegister from '../middleware/validateRegister';

export const authRoute = (app: Express) => {
  app.post('/auth/register', [validateRegister], register);

  app.post('/auth/login', login);

  app.post('/auth/logout', logout);

  app.post('/auth/forgot-password', forgotPassword);

  app.post('/auth/change-password/:token', changePassword);
};
