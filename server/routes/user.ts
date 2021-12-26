import { Express } from 'express';
import verifyLoggedIn from '../middleware/verifyLoggedIn';
import verifyRole from '../middleware/verifyRole';
import { me, changeRole, getUsers } from '../controllers/user';
import { Role } from '../entities/User';

export const userRoute = (app: Express) => {
  app.get('/user/me', [verifyLoggedIn], me);

  app.get('/user', [verifyLoggedIn, verifyRole([Role.MANAGER, Role.ADMIN])], getUsers);

  app.patch('/user/:id', [verifyLoggedIn, verifyRole([Role.ADMIN])], changeRole);
};
