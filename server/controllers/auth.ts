import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';
import logger from '../middleware/logger';

export const register = async (request: Request, response: Response) => {
  try {
    const user = new User();
    user.username = request.body.username;
    user.password = await argon2.hash(request.body.password);
    user.email = request.body.email;

    await getConnection().manager.save(user);
    logger.info('Saved a new user with id: ' + user.id);
    response.status(201).send({ message: 'User successfully created.' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const login = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ username: request.body.username });

    if (!user) {
      response.status(401).send({ field: 'username', message: 'User not found' });
    }

    const validPassword = await argon2.verify(user.password, request.body.password);
    if (!validPassword) {
      response.status(401).send({ field: 'password', message: 'Invalid password' });
    }

    request.session.userId = user.id;

    response.cookie('userId', user.id, { maxAge: 24 * 60 * 60 * 60 * 60, httpOnly: true, sameSite: 'lax' });

    response.status(200).send({ message: 'Log in successful' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const me = async (request: Request, response: Response) => {
  console.log(request.session.userId);

  if (!request.session.userId) {
    response.status(401).send();
  }

  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.session.userId);

    response.status(200).send({ username: user.username });
  } catch (error) {
    logger.error(error);
    response.status(500);
  }
};
