import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Role, User } from '../entities/User';

const verifyRole = (roles: Role[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.session.userId);
    if (user && !roles.includes(user.role)) {
      response.status(403).send({ message: 'Forbidden' });
      return;
    }
    next();
  };
};

export default verifyRole;
