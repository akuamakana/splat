import { Request, Response, NextFunction } from 'express';

const verifyRole = (num: number) => {
  return async (_: Request, response: Response, next: NextFunction) => {
    if (!response.locals.userRole || response.locals.userRole < num) {
      response.status(401).send({ message: 'insufficient rights' });
      return;
    }
    next();
  };
};

export default verifyRole;
