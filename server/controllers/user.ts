import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { Role } from '../entity/Role';
import { User } from '../entity/User';
import logger from '../middleware/logger';

export const me = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user: any = await userRepository.findOne(request.session.userId, { relations: ['role'] });
    if (!user) {
      response.status(401).send();
      return;
    }

    response.status(200).send({ user });
  } catch (error) {
    logger.error(error);
    response.status(500);
  }
};

export const changeRole = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.params.id);

    if (!user) {
      response.status(404).send({ field: 'alert', message: 'User not found' });
      return;
    }

    if (!request.body.role) {
      response.status(400).send({ field: 'role', message: 'Invalid role value' });
      return;
    }

    const roleRepository = getRepository(Role);
    const role = await roleRepository.findOneOrFail(request.body.role);

    if (!role) {
      response.status(404).send({ field: 'role', message: 'Role not found' });
      return;
    }
    user.role = role;

    userRepository.save(user);
    logger.info(`User: ${user.id} update to role ${role.name}`);
    response.status(200).send({ field: 'alert', message: 'User updated successfully' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};
