import { Express } from 'express';
import { hello } from '../controllers/hello';

export const helloRoute = (app: Express) => {
  app.get('/hello', hello);
};
