import { Request, Response, NextFunction } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Project } from '../entity/Project';
import { User } from '../entity/User';
import logger from '../middleware/logger';

export const createProject = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const project = new Project();
    project.name = request.body.name;
    project.description = request.body.description;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.session.userId);
    project.user = user;

    await getConnection().manager.save(project);
    logger.info('Project created successfully: ' + project.id);
    response.status(201).send({ field: 'alert', message: 'Project successfully created.' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};
