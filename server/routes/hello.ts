import { Request, Response, NextFunction } from 'express';
import { hello } from '../controllers/hello';

export const helloRoute = (app) => {
  app.use((request: Request, response: Response, next: NextFunction) => {
    next();
  });

  app.get('/hello', hello);
};
