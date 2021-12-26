import { Request, Response, NextFunction } from 'express';

export default async (request: Request, response: Response, next: NextFunction) => {
  if (request.body.title?.length < 3) {
    response.status(400).send({ field: 'title', message: 'Too short' });
    return;
  }

  next();
};
