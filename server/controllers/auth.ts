import * as argon2 from 'argon2';

import { Request, Response } from 'express';

import { Role } from '../entities/Role';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';
import logger from '../lib/logger';

export const register = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = new User();
    const roleRepository = getRepository(Role);
    const role = await roleRepository.findOne(request.body.role);

    if (!role) {
      throw new Error('Role not found');
    }

    user.username = request.body.username;
    user.password = await argon2.hash(request.body.password);
    user.email = request.body.email;
    user.role = role;

    await userRepository.save(user);
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
    const user = await userRepository.createQueryBuilder('User').select(['User.username', 'User.id']).addSelect('User.password').where({ username: request.body.password }).getOne();

    if (!user) {
      response.status(404).send({ field: 'username', message: 'User not found' });
      return;
    }

    const validPassword = await argon2.verify(user.password, request.body.password);
    if (!validPassword) {
      response.status(401).send({ field: 'password', message: 'Invalid password' });
      return;
    }

    request.session.userId = user.id;

    response.cookie('userId', user.id, { maxAge: 24 * 60 * 60 * 60 * 60, httpOnly: true, sameSite: 'lax' });

    response.status(200).send({ message: 'Log in successful' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const logout = async (request: Request, response: Response) => {
  request.session.destroy(() => {
    response.clearCookie('zid');
    response.clearCookie('userId').send(true);
  });
};
