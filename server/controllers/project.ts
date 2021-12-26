import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../entities/Project';
import { User } from '../entities/User';
import logger from '../lib/logger';

export const createProject = async (request: Request, response: Response) => {
  try {
    const projectRepository = getRepository(Project);
    const project = new Project();
    const user = await getRepository(User).findOne(request.session.userId);

    if (user) {
      project.title = request.body.title;
      project.description = request.body.description;
      project.user = user;
      project.assigned_users = [user];
      await projectRepository.save(project);
      logger.info('Project created successfully: ' + project.id);
      response.status(201).send(project);
    } else {
      response.status(404).send({ field: 'alert', message: 'User not found' });
    }
  } catch (error) {
    logger.error(error);
    response.status(500).send({ field: 'alert', message: error.message });
  }
};

export const updateProject = async (request: Request, response: Response) => {
  try {
    if (response.locals.project) {
      const projectRepository = getRepository(Project);
      const updatedProject = await projectRepository.save({ id: response.locals.project.id, ...request.body });
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
    const projectRepository = getRepository(Project);
    await projectRepository.remove(response.locals.project);
    response.status(200).send({ field: 'alert', message: 'Project successfully deleted.' });
    response.status(401).send({ field: 'alert', message: 'Access denied' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const getProjects = async (request: Request, response: Response) => {
  try {
    const projectRepository = getRepository(Project);
    const projects = await projectRepository.find({ where: { user: request.session.userId }, relations: ['assigned_users'] });

    if (projects) {
      response.status(200).send(projects);
    }
  } catch (error) {
    // TODO: Change to error fn
    response.status(500).send({ error: error.message });
  }
};

export const getProject = async (request: Request, response: Response) => {
  try {
    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne(request.params.id, { relations: ['assigned_users', 'tickets', 'tickets.submitter', 'tickets.project'] });
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
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.params.uid);
    if (!user) {
      response.status(404).send({ field: 'alert', message: 'User not found' });
      return;
    }

    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne(request.params.id, { relations: ['assigned_users'] });
    if (!project) {
      response.status(404).send({ field: 'alert', message: 'Project not found' });
      return;
    }

    const _assignedUsers = project.assigned_users.filter((_user) => user.id === _user.id);
    if (_assignedUsers.length === 1) {
      response.status(400).send({ field: 'alert', message: 'User is already in project' });
      return;
    }
    project.assigned_users = [...project.assigned_users, user];
    await projectRepository?.save(project);

    logger.info(`User: ${user?.id} added to project: ${project.id}`);
    response.status(200).send({ field: 'alert', message: 'User added to project' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ field: 'alert', error: error.message });
  }
};

export const removeUserFromProject = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.params.uid);
    if (!user) {
      response.status(404).send({ field: 'alert', message: 'User not found' });
      return;
    }

    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne(request.params.id, { relations: ['assigned_users'] });
    if (!project) {
      response.status(404).send({ field: 'alert', message: 'Project not found' });
      return;
    }

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
    await projectRepository.save(project);
    logger.info(`User: ${user?.id} removed from project: ${project.id}`);
    response.status(200).send({ field: 'alert', message: 'User removed from project' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ field: 'alert', error: error.message });
  }
};
