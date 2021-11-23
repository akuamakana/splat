import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

const verifyLoggedIn = async (request: Request, response: Response, next: NextFunction) => {
  if (!request.session.userId) {
    response.status(401).send();
    return;
  }
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(request.session.userId);
  if (!user) {
    response.status(401).send();
    return;
  }
  response.locals.user = user;
  next();
};

export default verifyLoggedIn;
