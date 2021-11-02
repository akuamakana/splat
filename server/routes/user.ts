import { Express } from 'express';
import { me } from '../controllers/user';
import verifyLoggedIn from '../middleware/verifyLoggedIn';
import verifyRole from '../middleware/verifyRole';
import { changeRole, getUsers } from '../controllers/user';

export const userRoute = (app: Express) => {
  app.get('/user', [verifyLoggedIn, verifyRole(3)], getUsers);
  app.get('/user/me', [verifyLoggedIn], me);
  app.put('/user/:id', [verifyLoggedIn, verifyRole(4)], changeRole);
};
