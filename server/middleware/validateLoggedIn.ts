import { Request, Response, NextFunction } from 'express';

const validateLoggedIn = (request: Request, response: Response, next: NextFunction) => {
  if (!request.session.userId) {
    response.status(401).send();
    return;
  }

  next();
};

export default validateLoggedIn;
