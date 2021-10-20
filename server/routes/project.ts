import { createProject } from './../controllers/project';
import { Request, Response, NextFunction, Express } from 'express';
import validateLoggedIn from '../middleware/validateLoggedIn';

export const projectRoute = (app: Express) => {
  app.use((request: Request, response: Response, next: NextFunction) => {
    next();
  });

  app.post('/project', [validateLoggedIn], createProject);
};
