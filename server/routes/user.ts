import { changeRole } from './../controllers/user';
import { Express } from 'express';
import { me } from '../controllers/user';
import verifyLoggedIn from '../middleware/verifyLoggedIn';
import verifyRole from '../middleware/verifyRole';

export const userRoute = (app: Express) => {
  app.get('/user/me', [verifyLoggedIn], me);
  app.put('/user/:id', [verifyLoggedIn, verifyRole(4)], changeRole);
};
