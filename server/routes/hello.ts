import { Request, Response, NextFunction, Express } from 'express';
import { hello } from '../controllers/hello';

export const helloRoute = (app: Express) => {
  app.use((request: Request, response: Response, next: NextFunction) => {
    next();
  });

  app.get('/hello', hello);
};
