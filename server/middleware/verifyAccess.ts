import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../entity/Project';
import logger from './logger';

const verifyAccess = async (request: Request, response: Response, next: NextFunction) => {
  console.log('request params: ', request.params);
  try {
    const projectRepository = getRepository(Project);
    const project: Project | undefined = await projectRepository
      .createQueryBuilder('project')
      .where(`project.id = ${request.params.id}`)
      .leftJoinAndSelect('project.assigned_users', 'user')
      .andWhere(`user.id = ${request.session.userId}`)
      .getOne();

    if (!project) {
      response.status(404).send({ field: 'alert', message: 'Project not found' });
      return;
    }

    response.locals.projectRepository = projectRepository;
    response.locals.project = project;

    next();
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export default verifyAccess;
