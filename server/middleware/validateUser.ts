import { NextFunction, Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export const validateUser = (request: Request, response: Response, next: NextFunction) => {
  // Email
  if (!request.body.email) {
    response.status(400).send({ field: 'email', message: 'Email is required' });
    return;
  }
  if (request.body.email.length <= 3) {
    response.status(400).send({ field: 'email', message: 'Email must be more than 3 characters' });
  }
  if (!request.body.email.includes('@')) {
    response.status(400).send({ field: 'email', message: 'Invalid email' });
  }

  // Username
  if (!request.body.username) {
    response.status(400).send({ field: 'username', message: 'Username is required' });
    return;
  }
  if (request.body.username.includes('@')) {
    response.status(400).send({ field: 'username', message: '"@"cannot be in username' });
    return;
  }
  if (request.body.username.length <= 3) {
    response.status(400).send({ field: 'username', message: 'Username must be more than 3 characters' });
  }

  // Name
  if (!request.body.firstName) {
    response.status(400).send({ field: 'firstName', message: 'First name is required' });
    return;
  }
  if (!request.body.lastName) {
    response.status(400).send({ field: 'lastName', message: 'Last name is required' });
    return;
  }
  next();
};

export const validatePassword = (request: Request, response: Response, next: NextFunction) => {
  // Password
  if (!request.body.password) {
    response.status(400).send({ field: 'password', message: 'Password is required' });
    return;
  }
  if (request.body.password.length <= 3) {
    response.status(400).send({ field: 'password', message: 'Password must be more than 3 characters' });
    return;
  }
  next();
};

export const checkDuplicateEmail = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email: request.body.email });

    if (user) {
      response.status(400).send({ field: 'email', message: 'Email is already in use.' });
      return;
    }

    next();
  } catch (error) {
    response.status(500).send({ field: 'alert', message: error.message });
    return;
  }
};

export const checkDuplicateUsername = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ username: request.body.username });

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
