import { NextFunction, Request, Response } from 'express';

const validateTicket = async (request: Request, response: Response, next: NextFunction) => {
  if (request.body.title.length <= 3) {
    response.status(400).send({ field: 'title', message: 'Title is not long enough' });
    return;
  }
  if (!request.body.project) {
    response.status(404).send({ field: 'project', message: 'Project not found' });
    return;
  }
  next();
};

export default validateTicket;
