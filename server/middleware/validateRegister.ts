import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

const validateRegister = async (request: Request, response: Response, next: NextFunction) => {
  // simple verification of email
  if (!request.body.email.includes('@')) {
    response.status(400).send({
      field: 'email',
      message: 'Invalid email',
    });
  }

  // username contains @
  if (request.body.username.includes('@')) {
    response.status(400).send({
      field: 'username',
      message: 'Invalid username',
    });
  }

  // username length
  if (request.body.username.length <= 3) {
    response.status(400).send({
      field: 'username',
      message: 'Too short, minimum length is 4 characters',
    });
  }

  // password length
  if (request.body.password.length <= 3) {
    response.status(400).send({
      field: 'password',
      message: 'Too short, minimum length is 4 characters',
    });
  }

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
