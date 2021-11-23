import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

const validateRegister = async (request: Request, response: Response, next: NextFunction) => {
  try {
    let userRepository: Repository<User> = getRepository(User);
    let user = await userRepository.findOne({ email: request.body.email });

    if (user) {
      response.status(400).send({ field: 'email', message: 'Email is already in use.' });
      return;
    }

    user = await userRepository.findOne({ username: request.body.username });
    if (user) {
      response.status(400).send({ field: 'username', message: 'Username is already taken.' });
      return;
    }

    next();
  } catch (error) {
    response.status(500).send({ field: 'alert', message: error.message });
    return;
  }
};

export default validateRegister;
