import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
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
