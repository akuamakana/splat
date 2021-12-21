import { validateUser, validatePassword, checkDuplicateEmail, checkDuplicateUsername } from './../middleware/validateUser';
import { forgotPassword, changePassword } from './../controllers/auth';
import { login, logout, register } from '../controllers/auth';

import { Express } from 'express';

export const authRoute = (app: Express) => {
  app.post('/auth/register', [validateUser, validatePassword, checkDuplicateEmail, checkDuplicateUsername], register);

  app.post('/auth/login', login);

  app.delete('/auth/logout', logout);

  app.post('/auth/forgot-password', forgotPassword);

  app.patch('/auth/change-password/:token', changePassword);
};
