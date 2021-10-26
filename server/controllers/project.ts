import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../entity/Project';
import { User } from '../entity/User';
import logger from '../middleware/logger';

export const createProject = async (request: Request, response: Response) => {
  try {
    const projectRepository = getRepository(Project);
    const project = new Project();
    project.title = request.body.title;
    project.description = request.body.description;

    if (response.locals.user) {
      project.user = response.locals.user;
      project.assigned_users = [response.locals.user];
      await projectRepository.save(project);
      logger.info('Project created successfully: ' + project.id);
      response.status(201).send({ field: 'alert', message: 'Project successfully created.', project: project });
    } else {
      response.status(401).send({ message: 'Access denied' });
      return;
    }
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const updateProject = async (request: Request, response: Response) => {
  try {
    if (response.locals.projectRepository && response.locals.project) {
      const updatedProject = await response.locals.projectRepository.save({ id: response.locals.project.id, ...request.body });
      response.status(200).send({ field: 'alert', message: 'Project successfully updated.', project: updatedProject });
    } else {
      response.status(401).send({ field: 'alert', message: 'Access denied' });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const deleteProject = async (_: Request, response: Response) => {
  try {
    if (response.locals.projectRepository && response.locals.project) {
      await response.locals.projectRepository.remove(response.locals.project);
      response.status(200).send({ field: 'alert', message: 'Project successfully deleted.' });
    } else {
      response.status(401).send({ field: 'alert', message: 'Access denied' });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const getProjects = async (request: Request, response: Response) => {
  try {
    const projectRepository = getRepository(Project);
    const projects: Project[] = await projectRepository.createQueryBuilder('project').leftJoinAndSelect('project.assigned_users', 'user').where(`user.id = ${request.session.userId}`).getMany();

    response.status(200).send({ projects });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const getProject = async (request: Request, response: Response) => {
  try {
    const project = await response.locals.projectRepository?.findOne(request.params.id, { relations: ['assigned_users'] });
    if (!project) {
      response.status(404).send({ message: 'Project not found' });
      return;
    }

    response.status(200).send({ project });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

// TODO

export const addUserToProject = async (request: Request, response: Response) => {
  try {
    if (!response.locals.project) {
      response.status(404).send({ message: 'Project not found' });
      return;
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.params.uid);

    if (user && response.locals.project) {
      // TODO: Check if user in project
      response.locals.project.assigned_users = [...response.locals.project.assigned_users, user];
    }

    await response.locals.projectRepository?.save(response.locals.project);
    logger.info(`User: ${user?.id} added to project: ${response.locals.project.id}`);
    response.status(200).send({ field: 'alert', message: 'User added to project' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};

export const removeUserFromProject = async (request: Request, response: Response) => {
  try {
    if (!response.locals.project) {
      response.status(404).send({ message: 'Project not found' });
      return;
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.params.uid);

    if (user && response.locals.project) {
      // TODO: Check if user not in project
      const userIndex = response.locals.project.assigned_users.indexOf(user);
      response.locals.project.assigned_users = response.locals.project.assigned_users.splice(userIndex, 1);
    }

    await response.locals.projectRepository?.save(response.locals.project);
    logger.info(`User: ${user?.id} removed from project: ${response.locals.project.id}`);
    response.status(200).send({ field: 'alert', message: 'User removed from project' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};
