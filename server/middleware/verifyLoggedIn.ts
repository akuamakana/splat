import { NextFunction, Request, Response } from 'express';

const verifyLoggedIn = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.session.userId) {
    response.status(401).send();
    return;
  }
  
  next();
};

export default verifyLoggedIn;
