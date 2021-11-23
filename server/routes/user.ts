import { Express } from 'express';
import { me } from '../controllers/user';
import verifyLoggedIn from '../middleware/verifyLoggedIn';
import verifyRole from '../middleware/verifyRole';
import { changeRole, getUsers } from '../controllers/user';
import { Role } from '../entities/User';

export const userRoute = (app: Express) => {
  app.get('/user', [verifyLoggedIn, verifyRole([Role.MANAGER, Role.ADMIN])], getUsers);
  app.get('/user/me', [verifyLoggedIn], me);
  app.put('/user/:id', [verifyLoggedIn, verifyRole([Role.ADMIN])], changeRole);
};
