import { Request, Response, NextFunction } from 'express';

export const hello = (request: Request, response: Response, next: NextFunction) => {
  response.status(200).send('Hello world');
};