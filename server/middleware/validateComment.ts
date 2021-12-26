import { NextFunction, Request, Response } from 'express';
export default async (request: Request, response: Response, next: NextFunction) => {
  if (!request.body.text || request.body.text?.length <= 3) {
    response.status(400).send({ field: 'text', message: 'Not long enough' });
    return;
  }

  next();
};
