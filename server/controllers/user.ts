import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { Role } from '../entities/Role';
import { User } from '../entities/User';
import logger from '../lib/logger';

export const me = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.session.userId);
    if (!user) {
      response.status(401).send();
      return;
    }

    response.status(200).send(user);
  } catch (error) {
    logger.error(error);
    response.status(500);
  }
};

// TODO: Refactor for enum
export const changeRole = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.params.id);

    if (!user) {
      response.status(404).send({ field: 'user', message: 'User not found' });
      return;
    }

    if (user.id === request.session.userId) {
      response.status(400).send({ field: 'user', message: 'Cannot update self' });
      return;
    }

    if (!request.body.role) {
      response.status(400).send({ field: 'role', message: 'Invalid role value' });
      return;
    }

    userRepository.save(user);
    logger.info(`User: ${user.id} update to role ${user.role}`);
    response.status(200).send({ field: 'alert', message: 'User updated successfully' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};

export const getUsers = async (_: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    response.status(200).send(users);
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};
