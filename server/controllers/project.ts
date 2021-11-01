import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../entity/Project';
import { User } from '../entity/User';
import logger from '../middleware/logger';

export const createProject = async (request: Request, response: Response) => {
  try {
    if (request.body.title.length < 3) {
      response.status(400).send({ field: 'title', message: 'Too short' });
      return;
    }
    const projectRepository = getRepository(Project);
    const project = new Project();
    project.title = request.body.title;
    project.description = request.body.description;

    if (response.locals.user) {
      project.user = response.locals.user;
      project.assigned_users = [response.locals.user];
      await projectRepository.save(project);
      logger.info('Project created successfully: ' + project.id);
      response.status(201).send({ field: 'alert', message: 'Project successfully created.', ...project });
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
    if (request.body.title.length < 3) {
      response.status(400).send({ field: 'title', message: 'Too short' });
      return;
    }
    if (response.locals.projectRepository && response.locals.project) {
      const updatedProject = await response.locals.projectRepository.save({ id: response.locals.project.id, ...request.body });
      response.status(200).send({ field: 'alert', message: 'Project successfully updated.', ...updatedProject });
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
    const projects: Project[] = await projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.assigned_users', 'assigned_users')
      .where(`assigned_users.id = ${request.session.userId}`)
      .orderBy('project.updated_at', 'DESC')
      .getMany();

    response.status(200).send(projects);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const getProject = async (request: Request, response: Response) => {
  try {
    const project = await response.locals.projectRepository?.findOne(request.params.id, { relations: ['assigned_users', 'assigned_users.role'] });
    if (!project) {
      response.status(404).send({ message: 'Project not found' });
      return;
    }

    response.status(200).send(project);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const addUserToProject = async (request: Request, response: Response) => {
  try {
    if (!response.locals.project) {
      response.status(404).send({ message: 'Project not found' });
      return;
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.params.uid);

    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne(response.locals.project.id, { relations: ['assigned_users'] });

    if (user && project) {
      if (response.locals.project.assigned_users.indexOf(user) > -1) {
        response.status(403).send({ field: 'alert', message: 'User is already in project' });
        return;
      }
      project.assigned_users = [...project.assigned_users, user];
      await projectRepository?.save(project);

      logger.info(`User: ${user?.id} added to project: ${project.id}`);
      response.status(200).send({ field: 'alert', message: 'User added to project' });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};

export const removeUserFromProject = async (request: Request, response: Response) => {
  try {
    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne(request.params.id, { relations: ['assigned_users'] });

    if (!project) {
      response.status(404).send({ message: 'Project not found' });
      return;
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.params.uid);

    if (user) {
      if (user.id === request.session.userId) {
        response.status(400).send({ field: 'alert', message: 'Unable to remove self from project' });
        return;
      }
      const _assignedUsers = project.assigned_users.filter((_user) => user.id !== _user.id);
      if (_assignedUsers.length === 0) {
        response.status(403).send({ field: 'alert', message: 'User is not in project' });
        return;
      }
      project.assigned_users = _assignedUsers;
    }

    await projectRepository?.save(project);
    logger.info(`User: ${user?.id} removed from project: ${project.id}`);
    response.status(200).send({ field: 'alert', message: 'User removed from project' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ error: error.message });
  }
};
