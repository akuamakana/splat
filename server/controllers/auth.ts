import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { User } from '../entities/User';
import logger from '../lib/logger';
import redisClient from '../lib/redisClient';
import sendEmail from '../lib/sendEmail';

export const register = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = new User();

    user.username = request.body.username;
    user.password = await argon2.hash(request.body.password);
    user.email = request.body.email;
    user.firstName = request.body.firstName;
    user.lastName = request.body.lastName;

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
    const user = await userRepository.createQueryBuilder('User').select(['User.username', 'User.id']).addSelect('User.password').where({ username: request.body.username }).getOne();

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

export const forgotPassword = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.createQueryBuilder('User').select(['User.username', 'User.id']).addSelect('User.email').where({ email: request.body.email }).getOne();

    if (!user) {
      response.status(200).send({ message: 'Reset password link sent to email address. Link expires in 24 hours.' });
      return;
    }

    const token = v4();
    redisClient.set(token, user.id.toString(), 'ex', 60 * 60 * 24);

    sendEmail(request.body.email, `http://localhost:3000/change-password/${token}`);

    response.status(200).send({ message: 'Reset password link sent to email address. Link expires in 24 hours.' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const changePassword = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const userId = await redisClient.get(request.params.token);

    if (!userId) {
      response.status(404).send({ message: 'Token has expired' });
      return;
    }

    const user = await userRepository.findOne(userId);

    if (!user) {
      response.status(404).send({ message: 'Token has expired' });
      return;
    }

    user.password = await argon2.hash(request.body.password);
    await userRepository.save(user);
    await redisClient.del(request.params.token);
    response.status(200).send({ message: 'Password successfully changed.' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};
